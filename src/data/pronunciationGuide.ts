// pronunciationGuide.ts — Static pronunciation reference data
//
// 28 entries covering the sounds that trip up English speakers learning German.
// Grouped into: Vowels, Umlauts, Diphthongs, Consonants.
//
// Each entry:
//   letters   — the letter or combo being explained (shown big on screen)
//   rule      — plain English description of how to pronounce it
//   example   — a German word that uses this sound (spoken aloud via TTS)
//   exampleEn — English translation of the example word

// ─── Types ────────────────────────────────────────────────────────────────────

export type PronunciationEntry = {
  id: string;
  letters: string;   // e.g. "ä" or "ei" or "ch"
  rule: string;      // plain English rule
  example: string;   // German word for the ▶ play button
  exampleEn: string; // English translation shown below the example
};

export type PronunciationGroup = {
  groupLabel: string;
  entries: PronunciationEntry[];
};

// ─── Data ─────────────────────────────────────────────────────────────────────

export const PRONUNCIATION_GUIDE: PronunciationGroup[] = [
  {
    groupLabel: 'Vowels',
    entries: [
      {
        id: 'v_a',
        letters: 'a',
        rule: 'Like "ah" in "father" — open and clear, never the flat English "a"',
        example: 'Name',
        exampleEn: 'name',
      },
      {
        id: 'v_e',
        letters: 'e',
        rule: 'Like "eh" in "bed". At the end of a word it is short and unstressed',
        example: 'sehen',
        exampleEn: 'to see',
      },
      {
        id: 'v_i',
        letters: 'i',
        rule: 'Like "ee" in "see" — always long and pure, never the English short "i"',
        example: 'Tiger',
        exampleEn: 'tiger',
      },
      {
        id: 'v_o',
        letters: 'o',
        rule: 'Like "oh" in "note", but keep your lips still — no glide at the end',
        example: 'oben',
        exampleEn: 'above',
      },
      {
        id: 'v_u',
        letters: 'u',
        rule: 'Like "oo" in "boot" — round lips fully, keep it pure',
        example: 'Schule',
        exampleEn: 'school',
      },
    ],
  },
  {
    groupLabel: 'Umlauts',
    entries: [
      {
        id: 'u_ae',
        letters: 'ä',
        rule: 'Like "e" in "bed" — same as a short e sound',
        example: 'Mädchen',
        exampleEn: 'girl',
      },
      {
        id: 'u_oe',
        letters: 'ö',
        rule: 'Round your lips as if to say "o", then try to say "e" — the sound is in between',
        example: 'schön',
        exampleEn: 'beautiful',
      },
      {
        id: 'u_ue',
        letters: 'ü',
        rule: 'Round your lips as if to say "oo", then try to say "ee" — lips stay rounded',
        example: 'über',
        exampleEn: 'over / above',
      },
    ],
  },
  {
    groupLabel: 'Diphthongs',
    entries: [
      {
        id: 'd_ei',
        letters: 'ei',
        rule: 'Like "eye" in English — e followed by a glide to i',
        example: 'Eis',
        exampleEn: 'ice cream',
      },
      {
        id: 'd_ie',
        letters: 'ie',
        rule: 'Like "ee" in "see" — the opposite of ei, always a long e sound',
        example: 'Brief',
        exampleEn: 'letter',
      },
      {
        id: 'd_eu',
        letters: 'eu',
        rule: 'Like "oy" in "toy" — e followed by a glide to oo',
        example: 'Euro',
        exampleEn: 'euro',
      },
      {
        id: 'd_aeu',
        letters: 'äu',
        rule: 'Exactly the same sound as eu — like "oy" in "toy"',
        example: 'Häuser',
        exampleEn: 'houses',
      },
      {
        id: 'd_au',
        letters: 'au',
        rule: 'Like "ow" in "cow" — a followed by a glide to oo',
        example: 'Haus',
        exampleEn: 'house',
      },
    ],
  },
  {
    groupLabel: 'Consonants',
    entries: [
      {
        id: 'c_ch_hard',
        letters: 'ch (hard)',
        rule: 'After a, o, u — a harsh scraping sound like in Scottish "loch"',
        example: 'Buch',
        exampleEn: 'book',
      },
      {
        id: 'c_ch_soft',
        letters: 'ch (soft)',
        rule: 'After e, i, or at the start — a soft hiss, like the "h" in "huge"',
        example: 'ich',
        exampleEn: 'I',
      },
      {
        id: 'c_sch',
        letters: 'sch',
        rule: 'Like "sh" in "shoe" — always this sound, never s+c+h separately',
        example: 'Schule',
        exampleEn: 'school',
      },
      {
        id: 'c_st',
        letters: 'st',
        rule: 'At the start of a word or syllable it sounds like "sht" not "st"',
        example: 'Stadt',
        exampleEn: 'city',
      },
      {
        id: 'c_sp',
        letters: 'sp',
        rule: 'At the start of a word or syllable it sounds like "shp" not "sp"',
        example: 'Spaß',
        exampleEn: 'fun',
      },
      {
        id: 'c_tz',
        letters: 'tz',
        rule: 'Like "ts" in "cats" — a sharp double consonant, never like "tz" in English',
        example: 'Katze',
        exampleEn: 'cat',
      },
      {
        id: 'c_z',
        letters: 'z',
        rule: 'Always like "ts" in "cats" — never the English buzzing "z" sound',
        example: 'Zeit',
        exampleEn: 'time',
      },
      {
        id: 'c_w',
        letters: 'w',
        rule: 'Like an English "v" — Wasser sounds like "Vasser"',
        example: 'Wasser',
        exampleEn: 'water',
      },
      {
        id: 'c_v',
        letters: 'v',
        rule: 'Usually like an English "f" — Vater sounds like "Fater"',
        example: 'Vater',
        exampleEn: 'father',
      },
      {
        id: 'c_j',
        letters: 'j',
        rule: 'Like English "y" — Jahr sounds like "Yahr", never like English "j"',
        example: 'Jahr',
        exampleEn: 'year',
      },
      {
        id: 'c_r',
        letters: 'r',
        rule: 'Produced at the back of the throat — a soft guttural sound, not a rolled r',
        example: 'Brot',
        exampleEn: 'bread',
      },
      {
        id: 'c_ng',
        letters: 'ng',
        rule: 'Like "ng" in "singer" — the g is never pronounced separately',
        example: 'lang',
        exampleEn: 'long',
      },
      {
        id: 'c_ig',
        letters: '-ig',
        rule: 'At the end of a word sounds like a soft ch — "richtig" sounds like "richtich"',
        example: 'richtig',
        exampleEn: 'correct',
      },
      {
        id: 'c_ss',
        letters: 'ß',
        rule: 'A sharp double "ss" sound — used after long vowels and diphthongs',
        example: 'Straße',
        exampleEn: 'street',
      },
      {
        id: 'c_qu',
        letters: 'qu',
        rule: 'Like "kv" — Quelle sounds like "Kvelle", not like English "kw"',
        example: 'Quelle',
        exampleEn: 'source / spring',
      },
    ],
  },
];