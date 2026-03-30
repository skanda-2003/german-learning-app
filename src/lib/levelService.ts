// levelService.ts — Persists the selected CEFR level to Supabase (Phase 15)
//
// The level is still managed in Zustand (useLevelStore) for instant UI updates,
// but every time it changes we also save it here so it survives sign-out/sign-in.
//
// Reads from / writes to the `level` column in the `user_progress` table.
// SQL to add the column (run once in Supabase dashboard):
//   ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS level text DEFAULT 'A1';

import { supabase } from './supabase';
import { getUserId } from './userId';
import type { Level } from '../store/useLevelStore';

// ─── Load ───────────────────────────────────────────────────────────────────────

// Returns the level saved in Supabase for this user, or null if never saved.
// Called by _layout.tsx after the user signs in.
export async function loadLevel(): Promise<Level | null> {
  try {
    const userId = await getUserId();

    const { data, error } = await supabase
      .from('user_progress')
      .select('level')
      .eq('user_id', userId)
      .maybeSingle(); // returns null (not error) if no row exists yet

    if (error) {
      console.error('Failed to load level:', error.message);
      return null;
    }

    return (data?.level as Level) ?? null;
  } catch (error) {
    console.error('Failed to load level:', error);
    return null;
  }
}

// ─── Save ───────────────────────────────────────────────────────────────────────

// Saves the selected level to Supabase. Fire-and-forget — called inside useLevelStore.
export async function saveLevel(level: Level): Promise<void> {
  try {
    const userId = await getUserId();

    const { error } = await supabase
      .from('user_progress')
      .upsert(
        { user_id: userId, level },
        { onConflict: 'user_id' }
      );

    if (error) {
      console.error('Failed to save level:', error.message);
    }
  } catch (error) {
    console.error('Failed to save level:', error);
  }
}