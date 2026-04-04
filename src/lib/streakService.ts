// streakService.ts — Reads and writes streak and daily challenge data to Supabase.
//
// Table: user_progress (one row per device user_id)
//   user_id                        TEXT  — device UUID from getUserId()
//   streak_count                   INT   — current consecutive day streak
//   last_active_date               TEXT  — YYYY-MM-DD of the last completed challenge
//   daily_challenge_completed_date TEXT  — YYYY-MM-DD of the most recent completion
//                                          used to check if today's challenge is already done

import { supabase } from './supabase';
import { getUserId } from './userId';

// ─── Types ─────────────────────────────────────────────────────────────────────

export type UserProgress = {
  streakCount: number;
  lastActiveDate: string;              // YYYY-MM-DD, empty string if never played
  dailyChallengeCompletedDate: string; // YYYY-MM-DD, empty string if never completed
  graceUsed?: boolean;                 // true if the grace period was applied this completion
};

// ─── Helpers ───────────────────────────────────────────────────────────────────

// Returns today's date as a YYYY-MM-DD string in local time
export function getTodayString(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm   = String(d.getMonth() + 1).padStart(2, '0');
  const dd   = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// Returns yesterday's date as a YYYY-MM-DD string
function getYesterdayString(): string {
  const d = new Date(Date.now() - 86_400_000); // 24 hours ago
  const yyyy = d.getFullYear();
  const mm   = String(d.getMonth() + 1).padStart(2, '0');
  const dd   = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// Returns the date two days ago as a YYYY-MM-DD string (used for grace period check)
function getTwoDaysAgoString(): string {
  const d = new Date(Date.now() - 2 * 86_400_000);
  const yyyy = d.getFullYear();
  const mm   = String(d.getMonth() + 1).padStart(2, '0');
  const dd   = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// ─── Load progress ─────────────────────────────────────────────────────────────

// Fetches the user's streak and daily challenge status from Supabase.
// Returns safe defaults if the row doesn't exist yet (first time user).
export async function loadProgress(): Promise<UserProgress> {
  try {
    const userId = await getUserId();

    const { data, error } = await supabase
      .from('user_progress')
      .select('streak_count, last_active_date, daily_challenge_completed_date')
      .eq('user_id', userId)
      .maybeSingle(); // returns null (not an error) when no row exists yet

    if (error || !data) {
      // No row yet — this is the first time. Return zeroed defaults.
      return { streakCount: 0, lastActiveDate: '', dailyChallengeCompletedDate: '' };
    }

    return {
      streakCount: data.streak_count,
      lastActiveDate: data.last_active_date,
      dailyChallengeCompletedDate: data.daily_challenge_completed_date,
    };
  } catch (error) {
    console.error('Failed to load progress:', error);
    return { streakCount: 0, lastActiveDate: '', dailyChallengeCompletedDate: '' };
  }
}

// ─── Complete today's challenge ────────────────────────────────────────────────

// Called when the user finishes the daily challenge.
// Calculates the new streak and saves everything to Supabase.
// Returns the updated UserProgress so the UI can show the new streak immediately.
export async function completeChallenge(): Promise<UserProgress> {
  try {
    const userId     = await getUserId();
    const today      = getTodayString();
    const yesterday  = getYesterdayString();
    const twoDaysAgo = getTwoDaysAgoString();

    // Load current state first so we can calculate the new streak
    const current = await loadProgress();

    // Streak rules:
    //   - Last active yesterday  → extend the streak by 1
    //   - Last active today      → already completed, no change (guard; shouldn't happen)
    //   - Last active 2 days ago → grace period: missed exactly one day, continue the streak
    //   - Anything older         → streak resets to 1
    let newStreak: number;
    let graceUsed = false;
    if (current.lastActiveDate === yesterday) {
      newStreak = current.streakCount + 1;
    } else if (current.lastActiveDate === today) {
      newStreak = current.streakCount;
    } else if (current.lastActiveDate === twoDaysAgo) {
      // Grace period: missed exactly one day — continue the streak instead of resetting
      newStreak = current.streakCount + 1;
      graceUsed = true;
    } else {
      newStreak = 1; // broken streak or first time
    }

    const updated: UserProgress = {
      streakCount: newStreak,
      lastActiveDate: today,
      dailyChallengeCompletedDate: today,
      graceUsed,
    };

    // Upsert — insert on first completion, update on subsequent days
    const { error } = await supabase
      .from('user_progress')
      .upsert(
        {
          user_id: userId,
          streak_count: newStreak,
          last_active_date: today,
          daily_challenge_completed_date: today,
        },
        { onConflict: 'user_id' }
      );

    if (error) {
      console.error('Failed to save progress:', error.message);
    }

    return updated;
  } catch (error) {
    console.error('Failed to complete challenge:', error);
    return { streakCount: 0, lastActiveDate: '', dailyChallengeCompletedDate: '' };
  }
}