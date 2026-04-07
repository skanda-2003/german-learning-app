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

// ─── Load recent activity count ───────────────────────────────────────────────

// Returns how many unique days the user studied in the last `days` days
// (inclusive of today). Used by the Progress page "X / 7 this week" stat.
// Uses setDate() to avoid DST edge cases.
export async function loadActivity(days: number): Promise<number> {
  try {
    const userId = await getUserId();

    // Build the start date: today minus (days - 1) to include today in the window
    const start = new Date();
    start.setDate(start.getDate() - (days - 1));
    const yyyy = start.getFullYear();
    const mm   = String(start.getMonth() + 1).padStart(2, '0');
    const dd   = String(start.getDate()).padStart(2, '0');
    const startStr = `${yyyy}-${mm}-${dd}`;

    const { data, error } = await supabase
      .from('activity_log')
      .select('log_date')
      .eq('user_id', userId)
      .gte('log_date', startStr);

    if (error) {
      console.error('Failed to load activity count:', error.message);
      return 0;
    }

    // Count unique dates (UNIQUE constraint handles this, but Set is safe)
    const uniqueDates = new Set((data ?? []).map((row) => row.log_date as string));
    return uniqueDates.size;
  } catch (err) {
    console.error('Failed to load activity count:', err);
    return 0;
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