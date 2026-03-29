// daily.tsx — Daily Challenge screen
//
// Flow:
//   1. Load the user's progress from Supabase (streak + completion date)
//   2a. If today's challenge is already done → show the "come back tomorrow" screen
//   2b. If not done → show 5 grammar exercises (selected by today's date as a seed)
//   3. User completes all 5 → completion saved to Supabase, streak updated, done screen shown
//
// Exercises are seeded by today's date so the same 5 exercises appear all day,
// but a different set appears tomorrow.

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import useLevelStore from '../src/store/useLevelStore';
import { GRAMMAR, GrammarExercise } from '../src/data/grammar';
import ExerciseCard from '../src/components/ExerciseCard';
import {
  loadProgress,
  completeChallenge,
  getTodayString,
  UserProgress,
} from '../src/lib/streakService';

// ─── Constants ─────────────────────────────────────────────────────────────────

const CHALLENGE_SIZE = 5; // exercises per daily challenge

// ─── Helpers ───────────────────────────────────────────────────────────────────

// Pick CHALLENGE_SIZE exercises seeded by today's date.
// The same 5 exercises appear all day; different ones tomorrow.
function getDailyExercises(allExercises: GrammarExercise[]): GrammarExercise[] {
  if (allExercises.length === 0) return [];

  // Turn today's date (e.g. "20260329") into a number to use as a start index
  const seed = parseInt(getTodayString().replace(/-/g, ''), 10);
  const startIndex = seed % allExercises.length;

  const result: GrammarExercise[] = [];
  for (let i = 0; i < CHALLENGE_SIZE; i++) {
    result.push(allExercises[(startIndex + i) % allExercises.length]);
  }
  return result;
}

// Returns tomorrow's date as a YYYY-MM-DD string
function getTomorrowString(): string {
  const d = new Date(Date.now() + 86_400_000);
  const yyyy = d.getFullYear();
  const mm   = String(d.getMonth() + 1).padStart(2, '0');
  const dd   = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// Format a YYYY-MM-DD date string for display (e.g. "29 March 2026")
function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const [yyyy, mm, dd] = dateStr.split('-').map(Number);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${dd} ${months[mm - 1]} ${yyyy}`;
}

// ─── Screen types ──────────────────────────────────────────────────────────────

type Screen = 'loading' | 'intro' | 'challenge' | 'done' | 'already-done';

// ─── Component ────────────────────────────────────────────────────────────────

export default function DailyScreen() {
  const level = useLevelStore(state => state.level);
  const allExercises = GRAMMAR[level];

  const [screen, setScreen] = useState<Screen>('loading');
  const [progress, setProgress] = useState<UserProgress>({
    streakCount: 0,
    lastActiveDate: '',
    dailyChallengeCompletedDate: '',
  });

  // The 5 exercises for today
  const [exercises] = useState<GrammarExercise[]>(() => getDailyExercises(allExercises));

  // Which exercise the user is currently on
  const [currentIndex, setCurrentIndex] = useState(0);

  // How many the user got correct
  const [correctCount, setCorrectCount] = useState(0);

  // ── Load progress every time the screen comes into focus ──
  // useFocusEffect runs on every tab visit, not just the first mount.
  // This ensures "already-done" shows correctly after completing the challenge
  // and navigating away and back.
  useFocusEffect(
    useCallback(() => {
      setScreen('loading');
      loadProgress().then((p) => {
        setProgress(p);
        const today = getTodayString();
        if (p.dailyChallengeCompletedDate === today) {
          setScreen('already-done');
        } else {
          setScreen('intro');
        }
      });
    }, [])
  );

  // ── Called by ExerciseCard on each Next tap ──
  async function handleNext(wasCorrect: boolean) {
    if (wasCorrect) setCorrectCount(prev => prev + 1);

    const nextIndex = currentIndex + 1;
    if (nextIndex >= CHALLENGE_SIZE) {
      // All exercises done — save to Supabase and show done screen
      const updated = await completeChallenge();
      setProgress(updated);
      setScreen('done');
    } else {
      setCurrentIndex(nextIndex);
    }
  }

  // ─── Loading screen ───────────────────────────────────────────────────────
  if (screen === 'loading') {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#4fc3f7" />
        <Text style={styles.loadingText}>Loading challenge...</Text>
      </View>
    );
  }

  // ─── No content for this level ────────────────────────────────────────────
  if (allExercises.length === 0) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.emptyEmoji}>🚧</Text>
        <Text style={styles.emptyTitle}>{level} Challenge Coming Soon</Text>
        <Text style={styles.emptySubtitle}>
          Switch to A1 using the level toggle at the top.
        </Text>
      </View>
    );
  }

  // ─── Already completed today ──────────────────────────────────────────────
  if (screen === 'already-done') {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.doneEmoji}>✅</Text>
        <Text style={styles.doneTitle}>Challenge Complete!</Text>
        <Text style={styles.doneSubtitle}>
          You've already done today's challenge.{'\n'}Come back tomorrow!
        </Text>
        <View style={styles.streakBox}>
          <Text style={styles.streakFlame}>🔥</Text>
          <Text style={styles.streakCount}>{progress.streakCount}</Text>
          <Text style={styles.streakLabel}>day streak</Text>
        </View>
        <Text style={styles.nextChallengeDate}>
          Next challenge: {formatDate(getTomorrowString())}
        </Text>
      </View>
    );
  }

  // ─── Intro screen ─────────────────────────────────────────────────────────
  if (screen === 'intro') {
    const today = getTodayString();
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.introEmoji}>📅</Text>
        <Text style={styles.introTitle}>Daily Challenge</Text>
        <Text style={styles.introDate}>{formatDate(today)}</Text>

        <Text style={styles.introDescription}>
          5 grammar exercises. Complete them all to keep your streak alive.
        </Text>

        {/* Streak display */}
        <View style={styles.streakBox}>
          <Text style={styles.streakFlame}>🔥</Text>
          <Text style={styles.streakCount}>{progress.streakCount}</Text>
          <Text style={styles.streakLabel}>
            {progress.streakCount === 1 ? 'day streak' : 'day streak'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => setScreen('challenge')}
        >
          <Text style={styles.startButtonText}>Start Challenge →</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ─── Done screen ──────────────────────────────────────────────────────────
  if (screen === 'done') {
    const percentage = Math.round((correctCount / CHALLENGE_SIZE) * 100);

    const emoji =
      percentage === 100 ? '🏆' :
      percentage >= 60   ? '🎉' : '📚';

    const title =
      percentage === 100 ? 'Perfect score!' :
      percentage >= 60   ? 'Challenge Complete!' : 'Challenge Done';

    const subtitle =
      percentage === 100 ? 'Flawless! All 5 correct.' :
      percentage >= 60   ? `${correctCount} / ${CHALLENGE_SIZE} correct — well done!` :
      correctCount === 0 ? `${correctCount} / ${CHALLENGE_SIZE} correct — don't give up, try again tomorrow!` :
                           `${correctCount} / ${CHALLENGE_SIZE} correct — keep practising!`;

    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.doneEmoji}>{emoji}</Text>
        <Text style={styles.doneTitle}>{title}</Text>
        <Text style={styles.doneSubtitle}>{subtitle}</Text>

        {/* New streak */}
        <View style={styles.streakBox}>
          <Text style={styles.streakFlame}>🔥</Text>
          <Text style={styles.streakCount}>{progress.streakCount}</Text>
          <Text style={styles.streakLabel}>day streak</Text>
        </View>

        {progress.streakCount > 1 && (
          <Text style={styles.streakMessage}>
            {progress.streakCount} days in a row — keep it up!
          </Text>
        )}
      </View>
    );
  }

  // ─── Challenge screen ─────────────────────────────────────────────────────
  const currentExercise = exercises[currentIndex];
  const challengeProgress = currentIndex / CHALLENGE_SIZE;

  return (
    <ScrollView contentContainerStyle={styles.challengeContainer}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📅 Daily Challenge</Text>
        <Text style={styles.headerDate}>{formatDate(getTodayString())}</Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressRow}>
          <Text style={styles.progressText}>{currentIndex + 1} / {CHALLENGE_SIZE}</Text>
          <Text style={styles.correctText}>✓ {correctCount} correct</Text>
        </View>
        <View style={styles.progressBarBackground}>
          <View
            style={[styles.progressBarFill, { width: `${challengeProgress * 100}%` as any }]}
          />
        </View>
      </View>

      {/* Exercise card */}
      <View style={styles.cardWrapper}>
        {currentExercise && (
          <ExerciseCard
            key={currentExercise.id + currentIndex} // ensure remount on each exercise
            exercise={currentExercise}
            onNext={handleNext}
          />
        )}
      </View>

    </ScrollView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({

  // ── Shared ──
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#888',
  },

  // ── Empty state ──
  emptyEmoji: { fontSize: 48, marginBottom: 16 },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
  },

  // ── Streak box (shared across intro / done / already-done) ──
  streakBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fff3e0',
    borderWidth: 1.5,
    borderColor: '#ffcc80',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 28,
    marginBottom: 24,
  },
  streakFlame: { fontSize: 28 },
  streakCount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#e65100',
  },
  streakLabel: {
    fontSize: 14,
    color: '#bf360c',
    fontWeight: '600',
  },

  // ── Intro screen ──
  introEmoji: { fontSize: 52, marginBottom: 12 },
  introTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  introDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  introDescription: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
    maxWidth: 300,
  },
  startButton: {
    backgroundColor: '#1a1a2e',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 14,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },

  // ── Done / already-done screens ──
  doneEmoji: { fontSize: 56, marginBottom: 12 },
  doneTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 6,
  },
  doneSubtitle: {
    fontSize: 15,
    color: '#888',
    marginBottom: 28,
    textAlign: 'center',
    lineHeight: 22,
  },
  streakMessage: {
    fontSize: 14,
    color: '#bf360c',
    fontWeight: '600',
  },
  nextChallengeDate: {
    fontSize: 13,
    color: '#aaa',
  },

  // ── Challenge screen ──
  challengeContainer: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  headerDate: {
    fontSize: 13,
    color: '#888',
  },
  progressContainer: {
    width: '100%',
    maxWidth: 480,
    marginBottom: 24,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressText: {
    fontSize: 13,
    color: '#888',
  },
  correctText: {
    fontSize: 13,
    color: '#4caf50',
    fontWeight: '600',
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#ff9800',  // orange to distinguish from other progress bars
    borderRadius: 2,
  },
  cardWrapper: {
    width: '100%',
    maxWidth: 480,
  },
});