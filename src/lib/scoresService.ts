// scoresService.ts — Reads and writes section scores to Supabase.
//
// Table: section_scores (one row per user per section)
//   user_id            TEXT  — device UUID
//   section            TEXT  — e.g. 'grammar', 'exam_reading', 'game_gender_battle'
//   best_score         INT   — numerator of the best score achieved (e.g. 8 out of 10)
//   best_total         INT   — denominator (e.g. 10)
//   sessions_completed INT   — how many times the user has finished this section
//   updated_at         TEXT  — ISO date string of last update
//
// Two types of section:
//   Scored    — grammar, exam_reading, exam_listening, games
//               → call saveScore(section, score, total)
//   Completion — exam_writing, exam_speaking (AI feedback, no numeric score)
//               → call saveCompletion(section)

import { supabase } from './supabase';
import { getUserId } from './userId';

// ─── Types ─────────────────────────────────────────────────────────────────────

export type SectionScore = {
  bestScore: number;
  bestTotal: number;
  sessionsCompleted: number;
};

// All section keys used across the app
export type SectionKey =
  | 'grammar'
  | 'exam_reading'
  | 'exam_listening'
  | 'exam_writing'
  | 'exam_speaking'
  | 'game_gender_battle'
  | 'game_listening_quiz'
  | 'game_word_match'
  | 'game_sentence_builder';

// Default value for a section that has never been attempted
const DEFAULT_SCORE: SectionScore = {
  bestScore: 0,
  bestTotal: 0,
  sessionsCompleted: 0,
};

// ─── Save a scored section ─────────────────────────────────────────────────────

// Call this when the user finishes a section that has a numeric score.
// Keeps the best score (highest percentage). Always increments sessions_completed.
export async function saveScore(
  section: SectionKey,
  score: number,
  total: number
): Promise<void> {
  try {
    const userId = await getUserId();

    // Load the current best so we can compare
    const { data } = await supabase
      .from('section_scores')
      .select('best_score, best_total, sessions_completed')
      .eq('user_id', userId)
      .eq('section', section)
      .maybeSingle(); // returns null (not an error) when no row exists yet

    const currentBestPct = data && data.best_total > 0
      ? data.best_score / data.best_total
      : -1;
    const newPct = total > 0 ? score / total : 0;

    // Only update score if the new attempt is better (or first time)
    const updatedScore = newPct >= currentBestPct ? score : (data?.best_score ?? 0);
    const updatedTotal = newPct >= currentBestPct ? total : (data?.best_total ?? 0);
    const updatedSessions = (data?.sessions_completed ?? 0) + 1;

    const { error } = await supabase
      .from('section_scores')
      .upsert(
        {
          user_id: userId,
          section,
          best_score: updatedScore,
          best_total: updatedTotal,
          sessions_completed: updatedSessions,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,section' }
      );

    if (error) console.error('Failed to save score:', error.message);
  } catch (error) {
    console.error('Failed to save score:', error);
  }
}

// ─── Save a completion-only section ───────────────────────────────────────────

// Call this for Writing and Speaking where there is no numeric score.
// Only increments sessions_completed.
export async function saveCompletion(section: SectionKey): Promise<void> {
  try {
    const userId = await getUserId();

    const { data } = await supabase
      .from('section_scores')
      .select('sessions_completed')
      .eq('user_id', userId)
      .eq('section', section)
      .maybeSingle(); // returns null (not an error) when no row exists yet

    const updatedSessions = (data?.sessions_completed ?? 0) + 1;

    const { error } = await supabase
      .from('section_scores')
      .upsert(
        {
          user_id: userId,
          section,
          best_score: 0,
          best_total: 0,
          sessions_completed: updatedSessions,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,section' }
      );

    if (error) console.error('Failed to save completion:', error.message);
  } catch (error) {
    console.error('Failed to save completion:', error);
  }
}

// ─── Load all scores ───────────────────────────────────────────────────────────

// Fetches all section scores for the current user.
// Returns a Record so the progress screen can look up any section by key.
// Missing sections default to { bestScore: 0, bestTotal: 0, sessionsCompleted: 0 }.
export async function loadAllScores(): Promise<Record<SectionKey, SectionScore>> {
  // Start with defaults for every section
  const result: Record<SectionKey, SectionScore> = {
    grammar:             { ...DEFAULT_SCORE },
    exam_reading:        { ...DEFAULT_SCORE },
    exam_listening:      { ...DEFAULT_SCORE },
    exam_writing:        { ...DEFAULT_SCORE },
    exam_speaking:       { ...DEFAULT_SCORE },
    game_gender_battle:    { ...DEFAULT_SCORE },
    game_listening_quiz:   { ...DEFAULT_SCORE },
    game_word_match:       { ...DEFAULT_SCORE },
    game_sentence_builder: { ...DEFAULT_SCORE },
  };

  try {
    const userId = await getUserId();

    const { data, error } = await supabase
      .from('section_scores')
      .select('section, best_score, best_total, sessions_completed')
      .eq('user_id', userId);

    if (error) {
      console.error('Failed to load scores:', error.message);
      return result;
    }

    // Overwrite defaults with whatever is stored in Supabase
    for (const row of data ?? []) {
      if (row.section in result) {
        result[row.section as SectionKey] = {
          bestScore: row.best_score,
          bestTotal: row.best_total,
          sessionsCompleted: row.sessions_completed,
        };
      }
    }
  } catch (error) {
    console.error('Failed to load scores:', error);
  }

  return result;
}