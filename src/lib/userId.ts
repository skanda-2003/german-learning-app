// userId.ts — Returns the authenticated Supabase user's ID (Phase 15)
//
// Before Phase 15 this generated a random device UUID.
// Now we use the real Supabase auth user ID so all data is tied to the account.
//
// Every service (scoresService, masteryService, etc.) calls getUserId() and
// nothing else needs to change — they all just get the auth ID now instead of
// the device UUID.

import { supabase } from './supabase';

// Returns the current user's Supabase auth ID.
// Falls back to 'fallback-user' if called before login (should not happen
// since all screens are behind the auth gate in _layout.tsx).
export async function getUserId(): Promise<string> {
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id ?? 'fallback-user';
}