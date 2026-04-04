// mistakeService.ts — Reads and writes grammar mistakes to Supabase.
//
// Table: mistake_log
//   id             BIGSERIAL  — auto-incrementing primary key
//   user_id        TEXT       — device UUID
//   section        TEXT       — e.g. 'grammar:Verb Conjugation' (section:topic)
//   question       TEXT       — the exercise question text
//   user_answer    TEXT       — what the user typed / selected
//   correct_answer TEXT       — the right answer
//   created_at     TIMESTAMPTZ — auto-set by Supabase

import { supabase } from './supabase';
import { getUserId } from './userId';

// ─── Types ─────────────────────────────────────────────────────────────────────

export type MistakeEntry = {
  id: number;
  section: string;        // e.g. 'grammar:Verb Conjugation'
  question: string;
  userAnswer: string;
  correctAnswer: string;
  createdAt: string;      // ISO timestamp string
};

// ─── Save a mistake ────────────────────────────────────────────────────────────

// Call this when the user answers incorrectly.
// Fire-and-forget — don't await at the call site unless you need confirmation.
export async function saveMistake(
  section: string,
  question: string,
  userAnswer: string,
  correctAnswer: string
): Promise<void> {
  try {
    const userId = await getUserId();

    const { error } = await supabase
      .from('mistake_log')
      .insert({
        user_id: userId,
        section,
        question,
        user_answer: userAnswer,
        correct_answer: correctAnswer,
      });

    if (error) console.error('Failed to save mistake:', error.message);
  } catch (err) {
    console.error('Failed to save mistake:', err);
  }
}

// ─── Load mistakes ─────────────────────────────────────────────────────────────

// Returns all mistakes for the current user, newest first.
export async function loadMistakes(): Promise<MistakeEntry[]> {
  try {
    const userId = await getUserId();

    const { data, error } = await supabase
      .from('mistake_log')
      .select('id, section, question, user_answer, correct_answer, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(100); // Insights shows 10, contextual tip needs 20 — 100 is more than enough

    if (error) {
      console.error('Failed to load mistakes:', error.message);
      return [];
    }

    return (data ?? []).map((row) => ({
      id: row.id,
      section: row.section,
      question: row.question,
      userAnswer: row.user_answer,
      correctAnswer: row.correct_answer,
      createdAt: row.created_at,
    }));
  } catch (err) {
    console.error('Failed to load mistakes:', err);
    return [];
  }
}