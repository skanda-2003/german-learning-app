#!/usr/bin/env node
/**
 * scripts/apply-comparatives.js
 *
 * Applies comparative forms to all adjectives in vocabulary files.
 * All values are hardcoded — comparatives follow these rules:
 *
 *   Regular:        + -er          (schnell → schneller)
 *   Umlaut:         umlaut + -er   (alt → älter, groß → größer)
 *   Irregular:      gut → besser, hoch → höher, viel → mehr
 *   Absolute state: no comparative (tot, verboten, geboren, ledig …)
 *
 * Usage:
 *   node scripts/apply-comparatives.js
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ─── Comparative map: adjective → comparative form ────────────────────────────
//
// Adjectives deliberately OMITTED (no meaningful comparative):
//   andere, arbeitslos, besser (already IS a comparative), geboren, gestorben,
//   geöffnet, geschlossen, ledig, lieb-, letzt-, männlich, möglich, nächst-,
//   tot, verboten, verheiratet, weiblich, willkommen

const COMPARATIVES = {
  // ── Regular (-er) ──────────────────────────────────────────────────────────
  automatisch:    'automatischer',
  bekannt:        'bekannter',
  besetzt:        'besetzter',
  billig:         'billiger',
  bitter:         'bitterer',
  böse:           'böser',
  breit:          'breiter',
  eilig:          'eiliger',
  einfach:        'einfacher',
  falsch:         'falscher',
  fertig:         'fertiger',
  frei:           'freier',
  fremd:          'fremder',
  glücklich:      'glücklicher',
  gültig:         'gültiger',
  günstig:        'günstiger',
  hell:           'heller',
  herzlich:       'herzlicher',
  international:  'internationaler',
  kaputt:         'kaputter',
  klar:           'klarer',
  klein:          'kleiner',
  kulturell:      'kultureller',
  langsam:        'langsamer',
  laut:           'lauter',
  leicht:         'leichter',
  leise:          'leiser',
  lustig:         'lustiger',
  müde:           'müder',
  neu:            'neuer',
  normal:         'normaler',
  pünktlich:      'pünktlicher',
  richtig:        'richtiger',
  ruhig:          'ruhiger',
  schlecht:       'schlechter',
  schnell:        'schneller',
  schön:          'schöner',
  schwer:         'schwerer',
  selbstständig:  'selbstständiger',
  spät:           'später',
  weit:           'weiter',
  wichtig:        'wichtiger',
  wunderbar:      'wunderbarer',
  zufrieden:      'zufriedener',

  // ── Umlaut + -er ───────────────────────────────────────────────────────────
  alt:            'älter',
  groß:           'größer',
  jung:           'jünger',
  krank:          'kränker',
  kurz:           'kürzer',
  lang:           'länger',

  // ── Irregular ──────────────────────────────────────────────────────────────
  gut:            'besser',       // gut → besser → am besten
  hoch:           'höher',        // drops the 'c': hoch → höher

  // ── Special: drops the middle -e- before adding -er ───────────────────────
  teuer:          'teurer',       // teuer → teurer (not teuerer)
};

// ─── Vocabulary files to process ─────────────────────────────────────────────

const VOCAB_FILES = [
  path.join(__dirname, '..', 'src', 'data', 'vocabulary', 'a1.ts'),
  // path.join(__dirname, '..', 'src', 'data', 'vocabulary', 'a2.ts'),
  // path.join(__dirname, '..', 'src', 'data', 'vocabulary', 'b1.ts'),
  // path.join(__dirname, '..', 'src', 'data', 'vocabulary', 'b2.ts'),
];

// ─── Apply comparatives ───────────────────────────────────────────────────────

function applyComparativesToFile(filePath) {
  const lines   = fs.readFileSync(filePath, 'utf8').split('\n');
  let   applied = 0;
  const skipped = []; // adjectives with no comparative defined

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.includes("partOfSpeech: 'adjective'")) continue;
    if (line.includes('comparative:')) continue; // already done

    const germanMatch = line.match(/german:\s*'([^']+)'/);
    if (!germanMatch) continue;

    const german     = germanMatch[1];
    const comparative = COMPARATIVES[german];

    if (!comparative) {
      skipped.push(german);
      continue;
    }

    // Insert before the last ' }' on the line
    const insertAt = line.lastIndexOf(' }');
    if (insertAt === -1) continue;

    lines[i] =
      line.slice(0, insertAt) +
      `, comparative: '${comparative}'` +
      line.slice(insertAt);

    applied++;
  }

  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  return { applied, skipped };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  console.log('\n=== Adjective Comparative Applicator ===\n');

  for (const vocabFile of VOCAB_FILES) {
    if (!fs.existsSync(vocabFile)) {
      console.log(`Skipping ${vocabFile} (not found)`);
      continue;
    }

    const shortName = path.basename(vocabFile);
    console.log(`Processing ${shortName} …`);

    const { applied, skipped } = applyComparativesToFile(vocabFile);
    console.log(`  Applied: ${applied}`);

    if (skipped.length > 0) {
      console.log(`  Skipped (no comparative): ${skipped.join(', ')}`);
    }
  }

  console.log('\n✓ Done.\n');
}

main();