#!/usr/bin/env node
/**
 * scripts/extract-conjugations.js
 *
 * Reads scripts/verbs.csv (already downloaded), derives all 6 present tense
 * conjugation forms, and writes conjugations: { ... } directly into the
 * vocabulary .ts files.
 *
 * ich / du / er  — taken directly from the CSV
 * wir / sie      — derived: if ich form ends in -e, wir = ich + 'n'
 *                  otherwise wir = infinitive (handles modals: kann → können)
 * ihr            — derived: infinitive stem + t/et (handles vowel-change verbs
 *                  like fährt/fahrt correctly — ihr always uses the plain stem)
 *
 * Separable verbs: prefix is detected from a space in the ich form
 *   e.g. ich = "fahre ab" → prefix "ab", ihr = "fahrt ab"
 *
 * Special case: sein → { bin, bist, ist, sind, seid, sind }
 *
 * Usage:
 *   node scripts/extract-conjugations.js
 */

'use strict';

const fs       = require('fs');
const path     = require('path');
const readline = require('readline');

// ─── Config ───────────────────────────────────────────────────────────────────

const CSV_PATH = path.join(__dirname, 'verbs.csv');

const VOCAB_FILES = [
  path.join(__dirname, '..', 'src', 'data', 'vocabulary', 'a1.ts'),
  // path.join(__dirname, '..', 'src', 'data', 'vocabulary', 'a2.ts'),
  // path.join(__dirname, '..', 'src', 'data', 'vocabulary', 'b1.ts'),
  // path.join(__dirname, '..', 'src', 'data', 'vocabulary', 'b2.ts'),
];

// ─── Special cases that can't be derived by formula ───────────────────────────

// Verbs where wir/ihr/sie cannot be correctly derived from ich + infinitive.
// Add more here if the script flags them as wrong.
const OVERRIDES = {
  sein:   { ich: 'bin',    du: 'bist',    er: 'ist',    wir: 'sind',    ihr: 'seid',    sie: 'sind'    },
  tun:    { ich: 'tue',    du: 'tust',    er: 'tut',    wir: 'tun',     ihr: 'tut',     sie: 'tun'     },
};

// ─── Step 1: Parse a vocabulary .ts file to find all verb entries ─────────────

function parseVerbsFromFile(filePath) {
  const lines = fs.readFileSync(filePath, 'utf8').split('\n');
  const verbs = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.includes("partOfSpeech: 'verb'")) continue;
    if (line.includes('conjugations:')) continue; // already done

    const idMatch     = line.match(/id:\s*'([^']+)'/);
    const germanMatch = line.match(/german:\s*'([^']+)'/);
    if (!idMatch || !germanMatch) continue;

    verbs.push({ id: idMatch[1], infinitive: germanMatch[1], lineIndex: i });
  }

  return verbs;
}

// ─── Step 2: Parse verbs.csv into a lookup map ────────────────────────────────
//
// Returns: Map<infinitive, { ich, du, er }>
// (wir/ihr/sie are derived separately)

function buildConjugationLookup(csvPath, targetVerbs) {
  return new Promise((resolve) => {
    const lookup = {};
    const rl = readline.createInterface({
      input:     fs.createReadStream(csvPath, { encoding: 'utf8' }),
      crlfDelay: Infinity,
    });

    let headers    = null;
    let infIdx     = -1;
    let ichIdx     = -1;
    let duIdx      = -1;
    let erIdx      = -1;

    rl.on('line', (line) => {
      if (!headers) {
        headers = parseCSVLine(line);
        infIdx = headers.indexOf('Infinitive');
        ichIdx = headers.indexOf('Präsens_ich');
        duIdx  = headers.indexOf('Präsens_du');
        // The er/sie/es column name contains a comma so it was quoted in the CSV
        erIdx  = headers.findIndex(h => h.startsWith('Präsens_er'));
        return;
      }

      const cols     = parseCSVLine(line);
      const infinitive = cols[infIdx];
      if (!infinitive || !targetVerbs.has(infinitive)) return;

      if (!lookup[infinitive]) {
        lookup[infinitive] = {
          ich: cols[ichIdx] || '',
          du:  cols[duIdx]  || '',
          er:  cols[erIdx]  || '',
        };
      }
    });

    rl.on('close', () => resolve(lookup));
  });
}

// ─── Step 3: Derive wir / ihr / sie forms ────────────────────────────────────

// Compute the plain verb stem from a (non-separable) infinitive.
// Works for: -en, -ern, -eln, -n verbs.
function getStem(infinitive) {
  if (infinitive.endsWith('eln')) return infinitive.slice(0, -1); // lächeln → lächel
  if (infinitive.endsWith('ern')) return infinitive.slice(0, -1); // ändern  → änder
  if (infinitive.endsWith('en'))  return infinitive.slice(0, -2); // lernen  → lern
  if (infinitive.endsWith('n'))   return infinitive.slice(0, -1); // rudern  → ruder
  return infinitive;
}

// Compute ihr form from plain stem + prefix (if separable).
// Adds -et if the stem ends in t/d or in a consonant cluster before m/n.
function getIhrVerb(stem) {
  // Stems ending in t or d → add -et (arbeiten → arbeitet, reden → redet)
  if (/[td]$/.test(stem)) return stem + 'et';
  // Stems ending in a consonant before m or n → add -et (öffnen → öffnet, atmen → atmet)
  if (/[^aeiouyäöü][mn]$/.test(stem)) return stem + 'et';
  // All other stems → add -t
  return stem + 't';
}

function deriveAllForms(infinitive, ichForm) {
  // Hard overrides for verbs that can't be derived
  if (OVERRIDES[infinitive]) return OVERRIDES[infinitive];

  // Detect separable prefix: ich form contains a space  e.g. "fahre ab"
  const parts  = ichForm.split(' ');
  const prefix = parts.length > 1 ? parts[parts.length - 1] : ''; // "ab", "an", "auf" …

  // Main infinitive without prefix: "abfahren" → "fahren"
  const mainInf = prefix ? infinitive.slice(prefix.length) : infinitive;

  // ── wir and sie: always the same as the full infinitive (with prefix re-attached)
  // Exception: if ich form does NOT end in 'e', use infinitive directly (modals)
  let wir;
  if (parts[0].endsWith('e')) {
    // Regular / irregular but standard first-person: wir = ich + 'n'
    // e.g. "fahre ab" → "fahren ab",  "lerne" → "lernen"
    wir = parts[0] + 'n' + (prefix ? ' ' + prefix : '');
  } else {
    // Modals etc: ich = "kann" → wir = "können" (the infinitive)
    wir = infinitive;
  }
  const sie = wir; // sie (plural) always matches wir

  // ── ihr: plain stem + t/et, then re-attach prefix
  const mainStem = getStem(mainInf);
  const ihr = getIhrVerb(mainStem) + (prefix ? ' ' + prefix : '');

  return {
    ich: ichForm,
    du:  '', // filled from CSV
    er:  '', // filled from CSV
    wir,
    ihr,
    sie,
  };
}

// ─── Step 4: Apply conjugations to vocabulary .ts file ───────────────────────

function applyConjugationsToFile(filePath, verbs, lookup) {
  const lines   = fs.readFileSync(filePath, 'utf8').split('\n');
  let   applied = 0;
  const missing = [];

  for (const verb of verbs) {
    const csvData = lookup[verb.infinitive];

    if (!csvData) {
      missing.push(verb);
      continue;
    }

    const derived = deriveAllForms(verb.infinitive, csvData.ich);

    const conj = {
      ich: derived.ich,
      du:  csvData.du,
      er:  csvData.er,
      wir: derived.wir,
      ihr: derived.ihr,
      sie: derived.sie,
    };

    // Format as inline TypeScript object
    const conjStr =
      `conjugations: { ich: '${conj.ich}', du: '${conj.du}', er: '${conj.er}', ` +
      `wir: '${conj.wir}', ihr: '${conj.ihr}', sie: '${conj.sie}' }`;

    // Insert before the last ' }' on the line (same strategy as the plurals script)
    const line      = lines[verb.lineIndex];
    const insertAt  = line.lastIndexOf(' }');
    if (insertAt === -1) {
      missing.push({ ...verb, reason: 'unexpected line format' });
      continue;
    }

    lines[verb.lineIndex] =
      line.slice(0, insertAt) +
      `, ${conjStr}` +
      line.slice(insertAt);

    applied++;
  }

  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  return { applied, missing };
}

// ─── Minimal CSV parser (handles quoted fields) ───────────────────────────────

function parseCSVLine(line) {
  const result = [];
  let current  = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n=== German Verb Conjugation Extractor ===\n');

  if (!fs.existsSync(CSV_PATH)) {
    console.error(`verbs.csv not found at ${CSV_PATH}`);
    process.exit(1);
  }

  for (const vocabFile of VOCAB_FILES) {
    if (!fs.existsSync(vocabFile)) {
      console.log(`Skipping ${vocabFile} (file not found)\n`);
      continue;
    }

    const shortName = path.basename(vocabFile);
    console.log(`Processing ${shortName} …`);

    // 1. Find all verbs that still need conjugations
    const verbs = parseVerbsFromFile(vocabFile);
    console.log(`  Verbs without conjugations: ${verbs.length}`);

    if (verbs.length === 0) {
      console.log('  Nothing to do — all verbs already have conjugations.');
      continue;
    }

    // 2. Build lookup from CSV
    const targetVerbs = new Set(verbs.map(v => v.infinitive));
    console.log(`  Looking up ${targetVerbs.size} verbs in CSV …`);
    const lookup = await buildConjugationLookup(CSV_PATH, targetVerbs);
    console.log(`  Found in CSV: ${Object.keys(lookup).length} / ${targetVerbs.size}`);

    // 3. Apply to file
    const { applied, missing } = applyConjugationsToFile(vocabFile, verbs, lookup);
    console.log(`  Written to file: ${applied}`);

    if (missing.length > 0) {
      console.log(`\n  ⚠  Not found in CSV (${missing.length}) — add manually to ${shortName}:`);
      for (const m of missing) {
        console.log(`     ${m.id}  "${m.infinitive}"`);
      }
    }
  }

  console.log('\n✓ Done.\n');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});