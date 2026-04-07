// index.ts — Central export for all grammar exercise data.
// Any screen that needs grammar exercises imports from here.

import { Level } from '../../store/useLevelStore';
import { GrammarExercise } from './types';
import { A1_GRAMMAR } from './a1';
import { A2_GRAMMAR } from './a2';
import { B1_GRAMMAR } from './b1';
import { B2_GRAMMAR } from './b2';

// A lookup table: given a level, return the correct exercise list.
export const GRAMMAR: Record<Level, GrammarExercise[]> = {
  A1: A1_GRAMMAR,
  A2: A2_GRAMMAR,
  B1: B1_GRAMMAR,
  B2: B2_GRAMMAR,
};

export type { GrammarExercise } from './types';