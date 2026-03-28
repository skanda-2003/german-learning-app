// masteryService.ts — Reads and writes vocabulary mastery to Supabase.
//
// All database calls for the vocabulary_mastery table live here.
// The flashcards screen imports from this file — nothing else talks to Supabase directly.
//
// Table schema:
//   vocabulary_mastery (id, user_id, word_id, known, updated_at)
//   unique constraint on (user_id, word_id)

import { supabase } from './supabase';
import { getUserId } from './userId';

// ─── Types ─────────────────────────────────────────────────────────────────────

// A Set of word IDs that the user has marked as known
export type MasteryMap = Set<string>;

// ─── Load mastery ──────────────────────────────────────────────────────────────

// Fetches all word IDs that this user has marked as known from Supabase.
// Returns a Set so we can do fast lookups: masteryMap.has('a1_001')
export async function loadMastery(): Promise<MasteryMap> {
  try {
    const userId = await getUserId();

    const { data, error } = await supabase
      .from('vocabulary_mastery')
      .select('word_id')
      .eq('user_id', userId)
      .eq('known', true);

    if (error) {
      console.error('Failed to load mastery:', error.message);
      return new Set();
    }

    // Convert the array of rows into a Set of word IDs
    return new Set(data.map((row) => row.word_id));
  } catch (error) {
    console.error('Failed to load mastery:', error);
    return new Set();
  }
}

// ─── Save a single word's mastery status ───────────────────────────────────────

// Saves whether a word is known or unknown for this user.
// Uses "upsert" — if a row for this user+word already exists, it updates it.
// If it doesn't exist yet, it inserts a new row.
export async function saveMastery(wordId: string, known: boolean): Promise<void> {
  try {
    const userId = await getUserId();

    const { error } = await supabase
      .from('vocabulary_mastery')
      .upsert(
        {
          user_id: userId,
          word_id: wordId,
          known,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'user_id,word_id', // if this user+word combo exists, update it
        }
      );

    if (error) {
      console.error('Failed to save mastery:', error.message);
    }
  } catch (error) {
    console.error('Failed to save mastery:', error);
  }
}
