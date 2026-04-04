// index.ts — Central export for all vocabulary data.
// Any screen that needs vocabulary imports from here, not directly from a1.ts etc.
// As we add A2, B1, B2 word lists, we just add them here.

import { Level } from '../../store/useLevelStore';
import { Word } from './types';
import { A1_WORDS } from './a1';
import { A2_WORDS } from './a2';
import { B1_WORDS } from './b1';

// A lookup table: given a level, return the correct word list.
// B2 is empty — word list not yet written.
export const VOCABULARY: Record<Level, Word[]> = {
  A1: A1_WORDS,   // 661 words
  A2: A2_WORDS,   // 585 words
  B1: B1_WORDS,   // 319 words
  B2: [],         // TODO: add B2 vocabulary
};

// Re-export the Word type so other files can import it from here
export type { Word } from './types';
