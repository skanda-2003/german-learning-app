// index.ts — Central export for all grammar exercise data.
// Any screen that needs grammar exercises imports from here.

import { Level } from '../../store/useLevelStore';
import { GrammarExercise } from './types';
import { A1_GRAMMAR } from './a1';

// A lookup table: given a level, return the correct exercise list.
export const GRAMMAR: Record<Level, GrammarExercise[]> = {
  A1: A1_GRAMMAR,
  A2: [], // TODO: add in Phase 2
  B1: [], // TODO: add in Phase 2
  B2: [], // TODO: add in Phase 2
};

export type { GrammarExercise } from './types';