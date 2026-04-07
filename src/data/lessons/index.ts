// index.ts — Lessons registry
//
// A2, B1, B2 arrays are populated in Phases 31b, 31c, 31d.
// B2 will remain [] until B2 grammar exercises exist (Phase 38).

import type { Level } from '../../store/useLevelStore';
import type { Lesson } from './types';
import { A1_LESSONS } from './a1';
import { A2_LESSONS } from './a2';

export const LESSONS: Record<Level, Lesson[]> = {
  A1: A1_LESSONS,
  A2: A2_LESSONS,
  B1: [],
  B2: [],
};
