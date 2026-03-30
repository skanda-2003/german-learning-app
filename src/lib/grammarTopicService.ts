// grammarTopicService.ts — Per-topic grammar score tracking (Phase 22)
//
// Saves and loads best scores per grammar topic per level.
// Used by grammar.tsx (to save) and progress.tsx / insights.tsx (to display).
//
// Supabase table: grammar_topic_scores
//   Columns: id, user_id, level, topic, best_score, best_total,
//            sessions_completed, updated_at
//   Unique constraint on (user_id, level, topic)

import { supabase } from './supabase';
import { getUserId } from './userId';

// ─── Types ─────────────────────────────────────────────────────────────────────

export type TopicScore = {
  bestScore: number;
  bestTotal: number;
  sessionsCompleted: number;
};

// Map from topic name → score data
// e.g. { 'Definite Articles' => { bestScore: 8, bestTotal: 10, sessionsCompleted: 2 } }
export type TopicScoreMap = Map<string, TopicScore>;

// ─── Save ──────────────────────────────────────────────────────────────────────

// Called at the end of a grammar session when a specific topic was selected.
// Keeps track of the best score percentage seen, and increments session count.
export async function saveTopicScore(
  topic: string,
  level: string,
  score: number,
  total: number
): Promise<void> {
  try {
    const userId = await getUserId();

    // Fetch the existing row first so we can compare and keep the best score
    const { data: existing } = await supabase
      .from('grammar_topic_scores')
      .select('best_score, best_total, sessions_completed')
      .eq('user_id', userId)
      .eq('level', level)
      .eq('topic', topic)
      .maybeSingle();

    // Calculate percentages to determine which score is better
    const existingPct = existing && existing.best_total > 0
      ? existing.best_score / existing.best_total
      : 0;
    const newPct = total > 0 ? score / total : 0;

    // Keep whichever score percentage is higher
    const bestScore = newPct >= existingPct ? score : (existing?.best_score ?? score);
    const bestTotal = newPct >= existingPct ? total : (existing?.best_total ?? total);
    const sessions  = (existing?.sessions_completed ?? 0) + 1;

    const { error } = await supabase
      .from('grammar_topic_scores')
      .upsert(
        {
          user_id:             userId,
          level,
          topic,
          best_score:          bestScore,
          best_total:          bestTotal,
          sessions_completed:  sessions,
          updated_at:          new Date().toISOString(),
        },
        { onConflict: 'user_id,level,topic' }
      );

    if (error) console.error('Failed to save topic score:', error.message);
  } catch (error) {
    console.error('Failed to save topic score:', error);
  }
}

// ─── Load ──────────────────────────────────────────────────────────────────────

// Returns a Map of all topic scores for a given level.
// Topics that have never been attempted are not in the Map.
export async function loadTopicScores(level: string): Promise<TopicScoreMap> {
  try {
    const userId = await getUserId();

    const { data, error } = await supabase
      .from('grammar_topic_scores')
      .select('topic, best_score, best_total, sessions_completed')
      .eq('user_id', userId)
      .eq('level', level);

    if (error) {
      console.error('Failed to load topic scores:', error.message);
      return new Map();
    }

    const map: TopicScoreMap = new Map();
    for (const row of data) {
      map.set(row.topic, {
        bestScore:         row.best_score,
        bestTotal:         row.best_total,
        sessionsCompleted: row.sessions_completed,
      });
    }
    return map;
  } catch (error) {
    console.error('Failed to load topic scores:', error);
    return new Map();
  }
}