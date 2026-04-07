// types.ts — Shared type definitions for vocabulary across all levels.
// Every word in every level (A1, A2, B1, B2) uses this same structure.

// Part of speech — what kind of word it is
export type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'pronoun' | 'phrase';

// Gender only applies to nouns in German (der = masculine, die = feminine, das = neuter)
// null means the word is not a noun
export type Gender = 'der' | 'die' | 'das' | null;

// Verb conjugation table — present tense forms for the 6 German pronouns
export type Conjugations = {
  ich: string;   // first person singular
  du: string;    // second person singular
  er: string;    // third person singular (er/sie/es share same form)
  wir: string;   // first person plural
  ihr: string;   // second person plural
  sie: string;   // third person plural / formal Sie
};

// Sub-category types — used in flashcards.tsx for the second pill row
export type VerbSubCategory = 'Regular' | 'Irregular' | 'Modal' | 'Separable' | 'Reflexive';
export type NounSubCategory = 'der' | 'die' | 'das';
export type PrepositionSubCategory = 'Accusative' | 'Dative' | 'Two-way' | 'Genitive';
export type OtherSubCategory = 'Adverbs' | 'Conjunctions' | 'Pronouns' | 'Phrases';

// The shape of a single vocabulary word
export type Word = {
  id: string;           // unique identifier, e.g. "a1_001" — used to track mastery in Supabase
  german: string;       // the German word
  english: string;      // English translation
  gender: Gender;       // der / die / das for nouns, null for everything else
  partOfSpeech: PartOfSpeech;
  exampleDe: string;    // example sentence in German
  exampleEn: string;    // English translation of the example sentence

  // Optional extra info shown on card back — not all words have these yet
  plural?: string;            // plural form for nouns, e.g. "die Bücher"
  conjugations?: Conjugations; // present tense conjugation table for verbs
  comparative?: string;        // comparative form for adjectives, e.g. "älter"
};
