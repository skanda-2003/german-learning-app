// useLevelStore.ts — Global state for the selected CEFR level
// Uses Zustand to store the current level so all screens can read it.
// When the level changes here, every screen that uses this store updates automatically.

import { create } from 'zustand';

// The 4 possible levels
export type Level = 'A1' | 'A2' | 'B1' | 'B2';

// The order of levels — used to cycle through them
const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2'];

// Shape of our store — what data it holds and what actions it exposes
type LevelStore = {
  level: Level;           // the currently selected level
  setLevel: (level: Level) => void;  // set a specific level
  nextLevel: () => void;  // advance to the next level (cycles A1→A2→B1→B2→A1)
};

// create() builds the store
const useLevelStore = create<LevelStore>((set, get) => ({
  level: 'A1', // default level when app first opens

  setLevel: (level) => set({ level }),

  nextLevel: () => {
    const current = get().level;
    const currentIndex = LEVELS.indexOf(current);
    const nextIndex = (currentIndex + 1) % LEVELS.length; // % wraps back to 0 after B2
    set({ level: LEVELS[nextIndex] });
  },
}));

export default useLevelStore;
