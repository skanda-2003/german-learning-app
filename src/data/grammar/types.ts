// types.ts — Shared type definitions for grammar exercises across all levels.

// The two exercise formats we support
export type ExerciseType = 'fill-blank' | 'multiple-choice';

// The shape of a single grammar exercise
export type GrammarExercise = {
  id: string;           // unique identifier, e.g. "a1_gr_001"
  topic: string;        // the grammar topic, e.g. "Verb conjugation: sein"
  type: ExerciseType;
  question: string;     // for fill-blank: sentence with ___ | for multiple-choice: the question
  options?: string[];   // only for multiple-choice — the 4 answer choices
  answer: string;       // the correct answer
  explanation: string;  // brief explanation of the grammar rule behind this exercise
};
