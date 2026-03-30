// useLevelStore.ts — Global state for the selected CEFR level
//
// Phase 15 addition: setLevel and nextLevel now also save the level to Supabase
// (via levelService) so it persists across sign-out/sign-in.
// The in-memory Zustand state still updates instantly for the UI.

import { create } from 'zustand';
import { saveLevel } from '../lib/levelService';

// The 4 possible levels
export type Level = 'A1' | 'A2' | 'B1' | 'B2';

// The order of levels — used to cycle through them
const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2'];

// Shape of our store — what data it holds and what actions it exposes
type LevelStore = {
  level: Level;                        // currently selected level
  setLevel: (level: Level) => void;    // set a specific level + persist to Supabase
  nextLevel: () => void;               // advance to next level (cycles A1→A2→B1→B2→A1)
};

const useLevelStore = create<LevelStore>((set, get) => ({
  level: 'A1', // default — overwritten by loadLevel() in _layout.tsx after login

  setLevel: (level) => {
    set({ level });
    saveLevel(level); // fire-and-forget — persist to Supabase
  },

  nextLevel: () => {
    const current = get().level;
    const next = LEVELS[(LEVELS.indexOf(current) + 1) % LEVELS.length];
    set({ level: next });
    saveLevel(next); // fire-and-forget — persist to Supabase
  },
}));

export default useLevelStore;