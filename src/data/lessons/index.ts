// index.ts — Lessons registry

import type { Level } from '../../store/useLevelStore';
import type { Lesson } from './types';
import { A1_LESSONS } from './a1';
import { A2_LESSONS } from './a2';
import { B1_LESSONS } from './b1';
import { B2_LESSONS } from './b2';

export const LESSONS: Record<Level, Lesson[]> = {
  A1: A1_LESSONS,
  A2: A2_LESSONS,
  B1: B1_LESSONS,
  B2: B2_LESSONS,
};
