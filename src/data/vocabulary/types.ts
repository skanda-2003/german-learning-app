// types.ts — Shared type definitions for vocabulary across all levels.
// Every word in every level (A1, A2, B1, B2) uses this same structure.

// Part of speech — what kind of word it is
export type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'pronoun' | 'phrase';

// Gender only applies to nouns in German (der = masculine, die = feminine, das = neuter)
// null means the word is not a noun
export type Gender = 'der' | 'die' | 'das' | null;

// The shape of a single vocabulary word
export type Word = {
  id: string;           // unique identifier, e.g. "a1_001" — used to track mastery in Supabase
  german: string;       // the German word
  english: string;      // English translation
  gender: Gender;       // der / die / das for nouns, null for everything else
  partOfSpeech: PartOfSpeech;
  exampleDe: string;    // example sentence in German
  exampleEn: string;    // English translation of the example sentence
};
