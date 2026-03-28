// index.ts — Central export for all vocabulary data.
// Any screen that needs vocabulary imports from here, not directly from a1.ts etc.
// As we add A2, B1, B2 word lists, we just add them here.

import { Level } from '../../store/useLevelStore';
import { Word } from './types';
import { A1_WORDS } from './a1';

// A lookup table: given a level, return the correct word list.
// A2 / B1 / B2 are empty for now — we'll fill them in Phase 2 as we go.
export const VOCABULARY: Record<Level, Word[]> = {
  A1: A1_WORDS,
  A2: [], // TODO: add in Phase 2
  B1: [], // TODO: add in Phase 2
  B2: [], // TODO: add in Phase 2
};

// Re-export the Word type so other files can import it from here
export type { Word } from './types';
