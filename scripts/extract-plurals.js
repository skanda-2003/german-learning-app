#!/usr/bin/env node
/**
 * scripts/extract-plurals.js
 *
 * Downloads the german-nouns CSV, looks up the nominativ plural for every noun
 * in our vocabulary files, and writes `plural: 'die ...'` directly into the
 * .ts files.
 *
 * Usage:
 *   node scripts/extract-plurals.js
 *
 * The CSV is cached at scripts/nouns.csv (~30–40 MB) after the first run.
 * Delete that file to force a fresh download.
 *
 * To add A2/B1/B2 later: uncomment the extra paths in VOCAB_FILES below.
 */

'use strict';

const https    = require('https');
const fs       = require('fs');
const path     = require('path');
const readline = require('readline');

// ─── Config ───────────────────────────────────────────────────────────────────

const CSV_URL   = 'https://raw.githubusercontent.com/gambolputty/german-nouns/refs/heads/main/german_nouns/nouns.csv';
const CSV_CACHE = path.join(__dirname, 'nouns.csv');

// Vocabulary files to process — add A2/B1/B2 here when those files exist.
const VOCAB_FILES = [
  path.join(__dirname, '..', 'src', 'data', 'vocabulary', 'a1.ts'),
  // path.join(__dirname, '..', 'src', 'data', 'vocabulary', 'a2.ts'),
  // path.join(__dirname, '..', 'src', 'data', 'vocabulary', 'b1.ts'),
  // path.join(__dirname, '..', 'src', 'data', 'vocabulary', 'b2.ts'),
];

// ─── Step 1: Download CSV (or use cached copy) ────────────────────────────────

function downloadCSV() {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(CSV_CACHE)) {
      console.log(`  Using cached CSV: ${CSV_CACHE}`);
      return resolve(CSV_CACHE);
    }

    console.log('  Downloading german-nouns CSV (~30 MB) — this takes a moment …');
    const file = fs.createWriteStream(CSV_CACHE);

    https.get(CSV_URL, (res) => {
      // Follow a redirect if the URL has moved
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(CSV_CACHE);
        https.get(res.headers.location, (res2) => {
          res2.pipe(file);
          file.on('finish', () => { file.close(); resolve(CSV_CACHE); });
        }).on('error', reject);
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); console.log('  Download complete.'); resolve(CSV_CACHE); });
    }).on('error', (err) => {
      fs.unlink(CSV_CACHE, () => {});
      reject(err);
    });
  });
}

// ─── Step 2: Parse a vocabulary .ts file to find all noun entries ─────────────
//
// Each entry is one line:
//   { id: 'a1_004', german: 'die Abfahrt', ..., partOfSpeech: 'noun', ... },
//
// Returns: Array of { id, baseWord, lineIndex }
//   baseWord = german word with article stripped:  "die Abfahrt" → "Abfahrt"

function parseNounsFromFile(filePath) {
  const lines = fs.readFileSync(filePath, 'utf8').split('\n');
  const nouns = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Only process noun entries
    if (!line.includes("partOfSpeech: 'noun'")) continue;

    // Skip entries that already have a plural field (safe to re-run the script)
    if (line.includes("plural:")) continue;

    const idMatch     = line.match(/id:\s*'([^']+)'/);
    const germanMatch = line.match(/german:\s*'([^']+)'/);
    if (!idMatch || !germanMatch) continue;

    // Strip article to get the base form for CSV lookup
    const baseWord = germanMatch[1].replace(/^(der|die|das)\s+/i, '').trim();

    nouns.push({ id: idMatch[1], baseWord, lineIndex: i });
  }

  return nouns;
}

// ─── Step 3: Stream the CSV and build a lookup map ────────────────────────────
//
// Streams the CSV line-by-line (efficient for large files).
// We only keep entries whose lemma is in targetWords.
//
// Column priority for plural:
//   1. "nominativ plural"   — primary form
//   2. "nominativ plural*"  — alternate/archaic form
//   3. "nominativ plural 1" — first variant
//
// German nouns always use "die" in the plural regardless of singular gender.

function buildPluralLookup(csvPath, targetWords) {
  return new Promise((resolve) => {
    const lookup = {}; // lemma → 'die PluralForm'

    const rl = readline.createInterface({
      input:     fs.createReadStream(csvPath, { encoding: 'utf8' }),
      crlfDelay: Infinity,
    });

    // Column indices — filled when we parse the header row
    let headers       = null;
    let lemmaIdx      = -1;
    let nomPlurIdx    = -1;
    let nomPlurAltIdx = -1;
    let nomPlur1Idx   = -1;

    rl.on('line', (line) => {
      // First line is the header
      if (!headers) {
        headers = parseCSVLine(line);
        lemmaIdx      = headers.indexOf('lemma');
        nomPlurIdx    = headers.indexOf('nominativ plural');
        nomPlurAltIdx = headers.indexOf('nominativ plural*');
        nomPlur1Idx   = headers.indexOf('nominativ plural 1');
        return;
      }

      const cols  = parseCSVLine(line);
      const lemma = cols[lemmaIdx];

      // Only process nouns that are in our target word list
      if (!lemma || !targetWords.has(lemma)) return;

      // Pick the first non-empty plural form
      const plural =
        (cols[nomPlurIdx]    && cols[nomPlurIdx].trim())    ||
        (cols[nomPlurAltIdx] && cols[nomPlurAltIdx].trim()) ||
        (cols[nomPlur1Idx]   && cols[nomPlur1Idx].trim())   ||
        '';

      // Store only the first match (CSV may have multiple rows per lemma)
      if (plural && !lookup[lemma]) {
        lookup[lemma] = 'die ' + plural;
      }
    });

    rl.on('close', () => resolve(lookup));
  });
}

// ─── Minimal CSV line parser (handles quoted fields with commas inside) ───────

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

// ─── Step 4: Write plural fields into the vocabulary .ts file ─────────────────
//
// For each noun that has a lookup match, inserts   plural: 'die Xyz',
// just before the closing  }  of that line.
//
// Before:  { ..., exampleEn: 'The departure is at 2 p.m.' },
// After:   { ..., exampleEn: 'The departure is at 2 p.m.', plural: 'die Abfahrten' },

function applyPluralsToFile(filePath, nouns, lookup) {
  const lines   = fs.readFileSync(filePath, 'utf8').split('\n');
  let   applied = 0;
  const missing = [];

  for (const noun of nouns) {
    const plural = lookup[noun.baseWord];

    if (!plural) {
      missing.push(noun);
      continue;
    }

    const line = lines[noun.lineIndex];

    // Find the last ' }' in the line and insert the plural field before the '}'
    // This handles both  ' },'  and  ' }'  endings
    const insertAt = line.lastIndexOf(' }');
    if (insertAt === -1) {
      // Unexpected format — skip and flag
      missing.push({ ...noun, reason: 'unexpected line format' });
      continue;
    }

    lines[noun.lineIndex] =
      line.slice(0, insertAt) +
      `, plural: '${plural}'` +
      line.slice(insertAt);

    applied++;
  }

  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  return { applied, missing };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n=== German Nouns Plural Extractor ===\n');

  // 1. Download / use cached CSV
  const csvPath = await downloadCSV();

  for (const vocabFile of VOCAB_FILES) {
    if (!fs.existsSync(vocabFile)) {
      console.log(`Skipping ${vocabFile} (file not found)\n`);
      continue;
    }

    const shortName = path.basename(vocabFile);
    console.log(`\nProcessing ${shortName} …`);

    // 2. Find all noun entries that still need a plural
    const nouns = parseNounsFromFile(vocabFile);
    console.log(`  Nouns without plural: ${nouns.length}`);

    if (nouns.length === 0) {
      console.log('  Nothing to do — all nouns already have plurals.');
      continue;
    }

    // 3. Stream CSV and build lookup map for just these words
    const targetWords = new Set(nouns.map(n => n.baseWord));
    console.log(`  Looking up ${targetWords.size} unique words in CSV …`);
    const lookup = await buildPluralLookup(csvPath, targetWords);
    console.log(`  Found in CSV: ${Object.keys(lookup).length} / ${targetWords.size}`);

    // 4. Write plural fields into the file
    const { applied, missing } = applyPluralsToFile(vocabFile, nouns, lookup);
    console.log(`  Written to file: ${applied}`);

    if (missing.length > 0) {
      console.log(`\n  ⚠  Not found in CSV (${missing.length}) — add manually to ${shortName}:`);
      for (const m of missing) {
        console.log(`     ${m.id}  "${m.baseWord}"`);
      }
    }
  }

  console.log('\n✓ Done.\n');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});