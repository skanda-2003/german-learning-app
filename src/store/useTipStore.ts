// useTipStore.ts — Global state for the contextual "Focus Tip".
//
// When the user finishes a grammar or daily challenge session, the app
// analyses their recent mistakes and sets a targeted tip here.
// TipsBar reads from this store and shows the contextual tip first.

import { create } from 'zustand';

type TipStore = {
  // The targeted tip text, or null if no focus tip is active
  contextualTip: string | null;

  // Set a new focus tip (called after session completion)
  setContextualTip: (tip: string) => void;

  // Dismiss the focus tip (called when user navigates past it in TipsBar)
  clearContextualTip: () => void;
};

const useTipStore = create<TipStore>((set) => ({
  contextualTip: null,

  setContextualTip: (tip) => set({ contextualTip: tip }),

  clearContextualTip: () => set({ contextualTip: null }),
}));

export default useTipStore;