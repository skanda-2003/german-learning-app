// userId.ts — Returns the authenticated Supabase user's ID (Phase 15)
//
// Phase 34 update: reads user ID synchronously from useAuthStore when available,
// avoiding a Supabase round-trip on every write (3 calls per grammar session end).
// Falls back to a live supabase.auth.getUser() call only if the store is empty
// (shouldn't happen since all screens are behind the auth gate in _layout.tsx).

import { supabase } from './supabase';
import useAuthStore from '../store/useAuthStore';

// Returns the current user's Supabase auth ID.
// Reads from the in-memory auth store first (no network call).
// Falls back to supabase.auth.getUser() if store has no ID yet.
export async function getUserId(): Promise<string> {
  const cached = useAuthStore.getState().userId;
  if (cached) return cached;

  // Fallback — should only happen in edge cases before the session has loaded
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id ?? 'fallback-user';
}