// index.ts — Level lookup for static cheat sheets (Phase 37)

import { Level } from '../../store/useLevelStore';
import type { CheatSheetSection } from './types';
import { A1_CHEAT_SHEET } from './a1';
import { A2_CHEAT_SHEET } from './a2';
import { B1_CHEAT_SHEET } from './b1';
import { B2_CHEAT_SHEET } from './b2';

export type { CheatSheetSection, CheatSheetBlock } from './types';

export const CHEATSHEETS: Record<Level, CheatSheetSection[]> = {
  A1: A1_CHEAT_SHEET,
  A2: A2_CHEAT_SHEET,
  B1: B1_CHEAT_SHEET,
  B2: B2_CHEAT_SHEET,
};
