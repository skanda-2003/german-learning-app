// activityService.ts — Reads and writes daily activity to Supabase.
//
// Table: activity_log
//   id        BIGSERIAL — auto-incrementing primary key
//   user_id   TEXT      — device UUID
//   log_date  DATE      — the date the user completed the daily challenge
//   UNIQUE (user_id, log_date) — prevents duplicate entries for the same day

import { supabase } from './supabase';
import { getUserId } from './userId';

// ─── Helpers ───────────────────────────────────────────────────────────────────

function getTodayDateString(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm   = String(d.getMonth() + 1).padStart(2, '0');
  const dd   = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// ─── Log today's activity ──────────────────────────────────────────────────────

// Call this when the user completes the daily challenge.
// The UNIQUE constraint makes this idempotent — running it twice on the same day
// just updates the existing row rather than inserting a duplicate.
export async function logActivity(): Promise<void> {
  try {
    const userId  = await getUserId();
    const logDate = getTodayDateString();

    const { error } = await supabase
      .from('activity_log')
      .upsert(
        { user_id: userId, log_date: logDate },
        { onConflict: 'user_id,log_date' }
      );

    if (error) console.error('Failed to log activity:', error.message);
  } catch (err) {
    console.error('Failed to log activity:', err);
  }
}

// ─── Load activity dates ───────────────────────────────────────────────────────

// Returns an array of YYYY-MM-DD strings for every day the user completed
// the daily challenge. Used by the Insights activity calendar.
export async function loadActivityDates(): Promise<string[]> {
  try {
    const userId = await getUserId();

    const { data, error } = await supabase
      .from('activity_log')
      .select('log_date')
      .eq('user_id', userId)
      .order('log_date', { ascending: false });

    if (error) {
      console.error('Failed to load activity dates:', error.message);
      return [];
    }

    return (data ?? []).map((row) => row.log_date as string);
  } catch (err) {
    console.error('Failed to load activity dates:', err);
    return [];
  }
}