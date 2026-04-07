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

// ─── Topic Score History ───────────────────────────────────────────────────────

// Map from topic → array of last-10 percentage values (oldest → newest)
export type TopicHistoryMap = Map<string, number[]>;

// Map from topic → trend direction (comparing this week vs last week avg)
export type TopicTrendMap = Map<string, 'up' | 'down' | 'neutral'>;

// Inserts one session result into grammar_topic_history.
// Called alongside saveTopicScore() when a specific topic session ends.
export async function saveTopicScoreHistory(
  topic: string,
  level: string,
  score: number,
  total: number
): Promise<void> {
  try {
    const userId = await getUserId();
    const { error } = await supabase
      .from('grammar_topic_history')
      .insert({ user_id: userId, level, topic, score, total });
    if (error) console.error('Failed to save topic history:', error.message);
  } catch (err) {
    console.error('Failed to save topic history:', err);
  }
}

// Loads all session history for a level in one query and returns:
//   history — last 10 percentage values per topic (oldest → newest)
//   trends  — 'up' / 'down' / 'neutral' by comparing this week's avg vs last week's avg
//             A change of >5 percentage points counts as a trend.
export async function loadTopicScoreHistory(
  level: string
): Promise<{ history: TopicHistoryMap; trends: TopicTrendMap }> {
  const empty = { history: new Map(), trends: new Map() };
  try {
    const userId = await getUserId();

    const { data, error } = await supabase
      .from('grammar_topic_history')
      .select('topic, score, total, created_at')
      .eq('user_id', userId)
      .eq('level', level)
      .order('created_at', { ascending: true });

    if (error || !data) {
      console.error('Failed to load topic history:', error?.message);
      return empty;
    }

    // ── Build raw list per topic ──
    // Each entry stores the percentage and the date string for trend computation.
    const rawByTopic = new Map<string, { pct: number; dateStr: string }[]>();
    for (const row of data) {
      const pct = row.total > 0 ? Math.round((row.score / row.total) * 100) : 0;
      const dateStr = (row.created_at as string).slice(0, 10); // YYYY-MM-DD
      const entries = rawByTopic.get(row.topic) ?? [];
      entries.push({ pct, dateStr });
      rawByTopic.set(row.topic, entries);
    }

    // ── History map: keep last 10 percentage values per topic ──
    const history: TopicHistoryMap = new Map();
    for (const [topic, entries] of rawByTopic.entries()) {
      history.set(topic, entries.slice(-10).map((e) => e.pct));
    }

    // ── Trend map: compare this-week avg vs last-week avg ──
    // "this week"  = last 7 days (created_at.date >= sevenDaysAgoStr)
    // "last week"  = 8–14 days ago
    const now = new Date();
    const sevenDaysAgo  = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(now.getDate() - 14);
    const thisWeekCutoff = toIsoDate(sevenDaysAgo);
    const lastWeekCutoff = toIsoDate(fourteenDaysAgo);

    const trends: TopicTrendMap = new Map();
    for (const [topic, entries] of rawByTopic.entries()) {
      const thisWeekPcts = entries
        .filter((e) => e.dateStr >= thisWeekCutoff)
        .map((e) => e.pct);
      const lastWeekPcts = entries
        .filter((e) => e.dateStr >= lastWeekCutoff && e.dateStr < thisWeekCutoff)
        .map((e) => e.pct);

      // Need data in both windows to compute a meaningful trend
      if (thisWeekPcts.length === 0 || lastWeekPcts.length === 0) {
        trends.set(topic, 'neutral');
        continue;
      }

      const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
      const diff = avg(thisWeekPcts) - avg(lastWeekPcts);

      if (diff > 5)       trends.set(topic, 'up');
      else if (diff < -5) trends.set(topic, 'down');
      else                trends.set(topic, 'neutral');
    }

    return { history, trends };
  } catch (err) {
    console.error('Failed to load topic history:', err);
    return empty;
  }
}

// Local helper — Date → YYYY-MM-DD in local time
function toIsoDate(d: Date): string {
  const yyyy = d.getFullYear();
  const mm   = String(d.getMonth() + 1).padStart(2, '0');
  const dd   = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
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