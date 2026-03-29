// masteryService.ts — Reads and writes vocabulary mastery to Supabase.
//
// Each word can be in one of three states:
//   'known'   — confident, shown rarely in spaced repetition
//   'shaky'   — know it but want to revisit, shown occasionally
//   'unknown' — don't know it yet, shown frequently
//
// Supabase table: vocabulary_mastery
//   Columns: id, user_id, word_id, known (legacy bool), mastery (text), updated_at
//   Unique constraint on (user_id, word_id)
//
// NOTE: Requires a `mastery` text column in vocabulary_mastery.
// Run this SQL in the Supabase dashboard once:
//   ALTER TABLE vocabulary_mastery ADD COLUMN IF NOT EXISTS mastery text DEFAULT 'unknown';
//   UPDATE vocabulary_mastery SET mastery = CASE WHEN known = true THEN 'known' ELSE 'unknown' END;

import { supabase } from './supabase';
import { getUserId } from './userId';

// ─── Types ─────────────────────────────────────────────────────────────────────

// The three possible mastery states for a word
export type MasteryState = 'known' | 'shaky' | 'unknown';

// A Map from word ID to mastery state
// e.g. { 'a1_001' => 'known', 'a1_002' => 'shaky' }
export type MasteryMap = Map<string, MasteryState>;

// ─── Load mastery ──────────────────────────────────────────────────────────────

// Fetches the mastery state for all studied words from Supabase.
// Returns a Map so we can do fast lookups: masteryMap.get('a1_001') → 'known'
// Words not in the Map have never been studied (treat as 'unknown').
export async function loadMastery(): Promise<MasteryMap> {
  try {
    const userId = await getUserId();

    const { data, error } = await supabase
      .from('vocabulary_mastery')
      .select('word_id, mastery')
      .eq('user_id', userId);

    if (error) {
      console.error('Failed to load mastery:', error.message);
      return new Map();
    }

    // Build a Map from the rows
    const map: MasteryMap = new Map();
    for (const row of data) {
      // mastery column may be null for old rows — treat null as 'unknown'
      const state: MasteryState = (row.mastery as MasteryState) ?? 'unknown';
      map.set(row.word_id, state);
    }

    return map;
  } catch (error) {
    console.error('Failed to load mastery:', error);
    return new Map();
  }
}

// ─── Save a single word's mastery state ────────────────────────────────────────

// Saves the mastery state for a word.
// Uses "upsert" — inserts a new row or updates the existing one for this user+word.
export async function saveMastery(wordId: string, state: MasteryState): Promise<void> {
  try {
    const userId = await getUserId();

    const { error } = await supabase
      .from('vocabulary_mastery')
      .upsert(
        {
          user_id: userId,
          word_id: wordId,
          mastery: state,
          // Also update the legacy 'known' boolean column for backward compat
          known: state === 'known',
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'user_id,word_id',
        }
      );

    if (error) {
      console.error('Failed to save mastery:', error.message);
    }
  } catch (error) {
    console.error('Failed to save mastery:', error);
  }
}
