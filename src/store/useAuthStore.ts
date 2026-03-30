// useAuthStore.ts — Global auth state (Phase 15)
//
// Holds the current Supabase session and user object.
// The _layout.tsx subscribes to Supabase auth state changes and updates this
// store so every component in the app can react to login/logout instantly.

import { create } from 'zustand';
import type { Session, User } from '@supabase/supabase-js';

type AuthStore = {
  session: Session | null; // null = not logged in
  user: User | null;       // convenience — same as session?.user
  setSession: (session: Session | null) => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  session: null,
  user: null,

  // Called by _layout.tsx whenever Supabase fires onAuthStateChange
  setSession: (session) => set({
    session,
    user: session?.user ?? null,
  }),
}));

export default useAuthStore;