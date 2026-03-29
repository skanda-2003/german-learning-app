// daily.tsx — Daily Challenge screen
//
// Flow:
//   1. Load the user's progress from Supabase (streak + completion date)
//   2a. If today's challenge is already done → show the "come back tomorrow" screen
//   2b. If not done → show 5 grammar exercises (selected by today's date as a seed)
//   3. User completes all 5 → completion saved to Supabase, streak updated, done screen shown

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
import { logActivity } from '../src/lib/activityService';
import {
  colors, font, fontSize, spacing, radius,
  cardStyle, progressTrackStyle,
} from '../src/styles/theme';

// ─── Constants ─────────────────────────────────────────────────────────────────

const CHALLENGE_SIZE = 5;

// ─── Helpers ───────────────────────────────────────────────────────────────────

function getDailyExercises(allExercises: GrammarExercise[]): GrammarExercise[] {
  if (allExercises.length === 0) return [];
  const seed = parseInt(getTodayString().replace(/-/g, ''), 10);
  const startIndex = seed % allExercises.length;
  const result: GrammarExercise[] = [];
  for (let i = 0; i < CHALLENGE_SIZE; i++) {
    result.push(allExercises[(startIndex + i) % allExercises.length]);
  }
  return result;
}

function getTomorrowString(): string {
  const d = new Date(Date.now() + 86_400_000);
  const yyyy = d.getFullYear();
  const mm   = String(d.getMonth() + 1).padStart(2, '0');
  const dd   = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

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
  const [exercises] = useState<GrammarExercise[]>(() => getDailyExercises(allExercises));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setScreen('loading');
      loadProgress().then((p) => {
        setProgress(p);
        if (p.dailyChallengeCompletedDate === getTodayString()) {
          setScreen('already-done');
        } else {
          setScreen('intro');
        }
      });
    }, [])
  );

  async function handleNext(wasCorrect: boolean) {
    if (wasCorrect) setCorrectCount(prev => prev + 1);
    const nextIndex = currentIndex + 1;
    if (nextIndex >= CHALLENGE_SIZE) {
      // Save streak + log today's activity for the calendar (fire-and-forget)
      const [updated] = await Promise.all([
        completeChallenge(),
        logActivity(),
      ]);
      setProgress(updated);
      setScreen('done');
    } else {
      setCurrentIndex(nextIndex);
    }
  }

  // ─── Loading ──────────────────────────────────────────────────────────────
  if (screen === 'loading') {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="small" color={colors.accent} />
      </View>
    );
  }

  // ─── No content ───────────────────────────────────────────────────────────
  if (allExercises.length === 0) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.emptyTitle}>{level} challenge coming soon.</Text>
        <Text style={styles.emptySubtitle}>Switch to A1 to start practising.</Text>
      </View>
    );
  }

  // ─── Already done ─────────────────────────────────────────────────────────
  if (screen === 'already-done') {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.pageTitle}>Daily Challenge</Text>
        <Text style={styles.pageDate}>{formatDate(getTodayString())}</Text>

        <View style={[cardStyle, styles.doneCard]}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.doneCardTitle}>Complete</Text>
          <Text style={styles.doneCardSub}>Come back tomorrow.</Text>
        </View>

        <View style={styles.streakRow}>
          <Text style={styles.streakFire}>🔥</Text>
          <Text style={styles.streakNumber}>{progress.streakCount}</Text>
          <Text style={styles.streakLabel}>day streak</Text>
        </View>

        <Text style={styles.nextDate}>
          Next challenge: {formatDate(getTomorrowString())}
        </Text>
      </View>
    );
  }

  // ─── Intro ────────────────────────────────────────────────────────────────
  if (screen === 'intro') {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.pageTitle}>Daily Challenge</Text>
        <Text style={styles.pageDate}>{formatDate(getTodayString())}</Text>

        <Text style={styles.introDescription}>
          5 grammar exercises.{'\n'}Complete them all to keep your streak.
        </Text>

        <View style={styles.streakRow}>
          <Text style={styles.streakFire}>🔥</Text>
          <Text style={styles.streakNumber}>{progress.streakCount}</Text>
          <Text style={styles.streakLabel}>day streak</Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => setScreen('challenge')}
        >
          <Text style={styles.primaryButtonText}>Start Challenge →</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ─── Done ─────────────────────────────────────────────────────────────────
  if (screen === 'done') {
    const percentage = Math.round((correctCount / CHALLENGE_SIZE) * 100);
    const subtitle =
      percentage === 100 ? 'Flawless. All 5 correct.' :
      percentage >= 60   ? `${correctCount} / ${CHALLENGE_SIZE} correct` :
                           `${correctCount} / ${CHALLENGE_SIZE} correct — keep going!`;

    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.doneScore}>{percentage}%</Text>
        <Text style={styles.doneFraction}>{subtitle}</Text>

        <View style={styles.streakRow}>
          <Text style={styles.streakFire}>🔥</Text>
          <Text style={styles.streakNumber}>{progress.streakCount}</Text>
          <Text style={styles.streakLabel}>day streak</Text>
        </View>

        {progress.streakCount > 1 && (
          <Text style={styles.streakMessage}>
            {progress.streakCount} days in a row
          </Text>
        )}
      </View>
    );
  }

  // ─── Challenge ────────────────────────────────────────────────────────────
  const currentExercise = exercises[currentIndex];
  const challengeProgress = currentIndex / CHALLENGE_SIZE;

  return (
    <ScrollView contentContainerStyle={styles.challengeContainer}>

      {/* Header */}
      <View style={styles.challengeHeader}>
        <Text style={styles.challengeTitle}>Daily Challenge</Text>
        <Text style={styles.challengeDate}>{formatDate(getTodayString())}</Text>
      </View>

      {/* Progress */}
      <View style={styles.progressBlock}>
        <View style={styles.progressRow}>
          <Text style={styles.progressMeta}>{currentIndex + 1} / {CHALLENGE_SIZE}</Text>
          <Text style={styles.correctMeta}>✓ {correctCount} correct</Text>
        </View>
        <View style={[progressTrackStyle, { width: '100%', maxWidth: 480 } as any]}>
          <View style={[styles.progressFill, { width: `${challengeProgress * 100}%` as any }]} />
        </View>
      </View>

      {/* Exercise */}
      <View style={styles.cardWrapper}>
        {currentExercise && (
          <ExerciseCard
            key={currentExercise.id + currentIndex}
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

  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxxl,
    backgroundColor: colors.background,
  },

  emptyTitle: {
    fontFamily: font.semiBold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },

  // ── Shared heading ──
  pageTitle: {
    fontFamily: font.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  pageDate: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xxxl,
  },

  // ── Already-done card ──
  doneCard: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.hero,
    marginBottom: spacing.xxl,
    width: '100%',
    maxWidth: 320,
  },
  checkmark: {
    fontSize: 32,
    color: colors.success,
    marginBottom: spacing.sm,
  },
  doneCardTitle: {
    fontFamily: font.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  doneCardSub: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },

  // ── Streak row ──
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  streakFire: { fontSize: 22 },
  streakNumber: {
    fontFamily: font.bold,
    fontSize: fontSize.xxl,
    color: colors.textPrimary,
  },
  streakLabel: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },

  nextDate: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },

  // ── Intro ──
  introDescription: {
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xxxl,
  },
  primaryButton: {
    backgroundColor: colors.textPrimary,
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.hero,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  primaryButtonText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.md,
    color: colors.background,
  },

  // ── Done score ──
  doneScore: {
    fontFamily: font.bold,
    fontSize: 64,
    color: colors.textPrimary,
    lineHeight: 72,
  },
  doneFraction: {
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.xxxl,
  },
  streakMessage: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },

  // ── Challenge screen ──
  challengeContainer: {
    flexGrow: 1,
    padding: spacing.xxl,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  challengeHeader: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  challengeTitle: {
    fontFamily: font.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  challengeDate: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  progressBlock: {
    width: '100%',
    maxWidth: 480,
    marginBottom: spacing.xxl,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  progressMeta: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  correctMeta: {
    fontFamily: font.semiBold,
    fontSize: fontSize.xs,
    color: colors.success,
  },
  progressFill: {
    height: '100%' as any,
    backgroundColor: colors.accent,
    borderRadius: 2,
  },
  cardWrapper: {
    width: '100%',
    maxWidth: 480,
  },
});