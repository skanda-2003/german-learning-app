// lessonProgressService.ts — Saves/loads lesson viewed state to Supabase.
//
// Replaces AsyncStorage (used in Phase 31a). lesson.tsx calls saveLessonViewed()
// on mount; lessons.tsx calls loadViewedMap() on focus.
// Using Supabase means the "last studied" timestamp and green dot survive
// a device change or fresh login.
//
// ─── Supabase setup (run once in your Supabase dashboard SQL editor) ───────────
//
//   CREATE TABLE lesson_progress (
//     user_id   TEXT        NOT NULL,
//     level     TEXT        NOT NULL,
//     topic     TEXT        NOT NULL,
//     viewed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
//     PRIMARY KEY (user_id, level, topic)
//   );
//
//   ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
//
//   CREATE POLICY "Users can manage own lesson progress"
//     ON lesson_progress FOR ALL
//     USING  (user_id = auth.uid()::text)
//     WITH CHECK (user_id = auth.uid()::text);
//
// ─────────────────────────────────────────────────────────────────────────────────

import { supabase } from './supabase';
import { getUserId } from './userId';
import type { Level } from '../store/useLevelStore';

// Save (or update) that a lesson was viewed right now.
// Called from lesson.tsx on mount so the timestamp stays current on every revisit.
export async function saveLessonViewed(level: Level, topic: string): Promise<void> {
  try {
    const userId = await getUserId();
    await supabase
      .from('lesson_progress')
      .upsert(
        { user_id: userId, level, topic, viewed_at: new Date().toISOString() },
        { onConflict: 'user_id,level,topic' }
      );
  } catch (e) {
    // Non-critical — the green dot and timestamp are a UX nicety, not core data.
    console.warn('saveLessonViewed failed:', e);
  }
}

// Load all viewed lessons for a given level.
// Returns Record<topic, ISO timestamp string> — same shape as the old AsyncStorage map.
export async function loadViewedMap(level: Level): Promise<Record<string, string>> {
  try {
    const userId = await getUserId();
    const { data } = await supabase
      .from('lesson_progress')
      .select('topic, viewed_at')
      .eq('user_id', userId)
      .eq('level', level);

    if (!data) return {};

    const map: Record<string, string> = {};
    for (const row of data) {
      map[row.topic] = row.viewed_at;
    }
    return map;
  } catch (e) {
    console.warn('loadViewedMap failed:', e);
    return {};
  }
}
