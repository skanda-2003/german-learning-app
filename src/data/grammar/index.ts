// index.ts — Central export for all grammar exercise data.
// Any screen that needs grammar exercises imports from here.

import { Level } from '../../store/useLevelStore';
import { GrammarExercise } from './types';
import { A1_GRAMMAR } from './a1';
import { A2_GRAMMAR } from './a2';

// A lookup table: given a level, return the correct exercise list.
// B1 and B2 are empty — grammar.tsx shows a "coming soon" message when the array is empty.
export const GRAMMAR: Record<Level, GrammarExercise[]> = {
  A1: A1_GRAMMAR,
  A2: A2_GRAMMAR,
  B1: [], // Coming soon
  B2: [], // Coming soon
};

export type { GrammarExercise } from './types';