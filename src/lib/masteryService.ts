// masteryService.ts — Reads and writes vocabulary mastery to Supabase.
//
// Phase 15 addition: next_review_date spaced repetition dates
//   Known  → review in 7 days
//   Shaky  → review in 2 days
//   Unknown → review in 1 day
//
// SQL to add the column (run once in Supabase dashboard):
//   ALTER TABLE vocabulary_mastery ADD COLUMN IF NOT EXISTS next_review_date date;
//
// Supabase table: vocabulary_mastery
//   Columns: id, user_id, word_id, known (legacy bool), mastery (text),
//            next_review_date (date), updated_at

import { supabase } from './supabase';
import { getUserId } from './userId';

// ─── Types ─────────────────────────────────────────────────────────────────────

// The three possible mastery states for a word
export type MasteryState = 'known' | 'shaky' | 'unknown';

// Data stored per word — state + when to review it next
export type MasteryData = {
  state: MasteryState;
  nextReviewDate: string | null; // 'YYYY-MM-DD' or null if never set
};

// A Map from word ID to mastery data
// e.g. { 'a1_001' => { state: 'known', nextReviewDate: '2026-04-06' } }
export type MasteryMap = Map<string, MasteryData>;

// ─── Helper ────────────────────────────────────────────────────────────────────

// Calculate the next review date based on mastery state.
// Known → 7 days, Shaky → 2 days, Unknown → 1 day
function getNextReviewDate(state: MasteryState): string {
  const daysToAdd = state === 'known' ? 7 : state === 'shaky' ? 2 : 1;
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
}

// ─── Load mastery ──────────────────────────────────────────────────────────────

// Fetches mastery state + review date for all studied words from Supabase.
// Words not in the Map have never been studied (treat as unknown, always due).
export async function loadMastery(): Promise<MasteryMap> {
  try {
    const userId = await getUserId();

    const { data, error } = await supabase
      .from('vocabulary_mastery')
      .select('word_id, mastery, next_review_date')
      .eq('user_id', userId);

    if (error) {
      console.error('Failed to load mastery:', error.message);
      return new Map();
    }

    const map: MasteryMap = new Map();
    for (const row of data) {
      const state: MasteryState = (row.mastery as MasteryState) ?? 'unknown';
      map.set(row.word_id, {
        state,
        nextReviewDate: row.next_review_date ?? null,
      });
    }

    return map;
  } catch (error) {
    console.error('Failed to load mastery:', error);
    return new Map();
  }
}

// ─── Save a single word's mastery state ────────────────────────────────────────

// Saves the mastery state and calculates the next review date.
// Uses upsert — inserts or updates the row for this user + word.
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
          known: state === 'known', // legacy boolean column
          next_review_date: getNextReviewDate(state),
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,word_id' }
      );

    if (error) {
      console.error('Failed to save mastery:', error.message);
    }
  } catch (error) {
    console.error('Failed to save mastery:', error);
  }
}