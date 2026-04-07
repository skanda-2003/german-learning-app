// daily.tsx — Daily Challenge screen
//
// Flow:
//   1. Load streak progress + grammar topic scores from Supabase in parallel
//   2a. If today's challenge is already done → show the "come back tomorrow" screen
//   2b. If not done → compute 5 weighted exercises (weak topics get more slots),
//       then show intro screen
//   3. User completes all 5 → completion saved to Supabase, streak updated, done screen shown
//
// Spaced repetition weighting (Phase 33):
//   - Weak topics (< 60% best score) or unattempted → weight 3 (more frequent)
//   - Mid topics (60–79%)                           → weight 2
//   - Strong topics (≥ 80%)                         → weight 1 (less frequent)
//   - First-time users (no scores yet) → all topics weight 3, uniform pick by seed

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
import useAuthStore from '../src/store/useAuthStore';
import { GRAMMAR, GrammarExercise } from '../src/data/grammar';
import ExerciseCard from '../src/components/ExerciseCard';
import {
  loadProgress,
  completeChallenge,
  getTodayString,
  UserProgress,
} from '../src/lib/streakService';
import { getTomorrowString, formatDate } from '../src/lib/dateUtils';
import { logActivity } from '../src/lib/activityService';
import { loadMistakes } from '../src/lib/mistakeService';
import { getContextualTip } from '../src/lib/contextualTipService';
import useTipStore from '../src/store/useTipStore';
import { loadTopicScores, TopicScoreMap } from '../src/lib/grammarTopicService';
import {
  colors, font, fontSize, spacing, radius,
  cardStyle, progressTrackStyle,
} from '../src/styles/theme';

// ─── Constants ─────────────────────────────────────────────────────────────────

const CHALLENGE_SIZE = 5;

// ─── Helpers ───────────────────────────────────────────────────────────────────

// Simple hash: sums char codes of a string, returns a non-negative integer.
// Good enough for seeding — no crypto needed here.
function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h + s.charCodeAt(i)) & 0xffff; // keep it in safe integer range
  }
  return h;
}

// ─── Weighted daily exercise selection ────────────────────────────────────────
//
// Groups all exercises by topic, assigns a weight to each topic based on
// the user's score history, then allocates 5 slots proportionally.
//
// Weights:
//   Weak (< 60%) or unattempted → 3  (show more often)
//   Mid  (60–79%)               → 2
//   Strong (≥ 80%)              → 1  (show less often)

function getTopicWeight(topic: string, scoreMap: TopicScoreMap): number {
  const score = scoreMap.get(topic);
  if (!score || score.bestTotal === 0) return 3; // unattempted → treat as weak
  const pct = score.bestScore / score.bestTotal;
  if (pct < 0.6) return 3;  // weak
  if (pct < 0.8) return 2;  // mid
  return 1;                  // strong
}

// Picks one exercise from a topic's exercise list using the combined seed.
// Offset lets us avoid picking the same exercise twice across different slots.
function pickFromTopic(
  topicExercises: GrammarExercise[],
  seed: number,
  offset: number
): GrammarExercise {
  const idx = Math.abs(seed + offset) % topicExercises.length;
  return topicExercises[idx];
}

// Main weighted selection function.
// scoreMap may be empty (first-time user) → falls back to uniform random by seed.
function getDailyExercises(
  allExercises: GrammarExercise[],
  userId: string,
  scoreMap: TopicScoreMap
): GrammarExercise[] {
  if (allExercises.length === 0) return [];

  const dateSeed = parseInt(getTodayString().replace(/-/g, ''), 10);
  const userSeed = hashString(userId);
  const seed = dateSeed ^ userSeed; // unique per user per day

  // Step 1: Group exercises by topic
  const byTopic = new Map<string, GrammarExercise[]>();
  for (const ex of allExercises) {
    if (!byTopic.has(ex.topic)) byTopic.set(ex.topic, []);
    byTopic.get(ex.topic)!.push(ex);
  }

  const topics = Array.from(byTopic.keys());

  // Step 2: Compute weights for each topic
  const weights = topics.map(t => getTopicWeight(t, scoreMap));
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);

  // Step 3: Allocate 5 slots proportionally — round each, then fix sum to 5
  let slots = weights.map(w => Math.round((w / totalWeight) * CHALLENGE_SIZE));
  // Adjust so slots sum to exactly CHALLENGE_SIZE
  let diff = CHALLENGE_SIZE - slots.reduce((s, x) => s + x, 0);
  // Fix by adding/removing from the topic with the highest weight first
  const sortedByWeight = topics.map((_, i) => i).sort((a, b) => weights[b] - weights[a]);
  for (const idx of sortedByWeight) {
    if (diff === 0) break;
    slots[idx] = Math.max(0, slots[idx] + (diff > 0 ? 1 : -1));
    diff += diff > 0 ? -1 : 1;
  }
  // Guarantee at least 1 slot for topics with weight 3 (weak/unattempted), up to 5 topics
  const weakTopics = topics.filter((t, i) => weights[i] === 3 && slots[i] === 0);
  for (const weakTopic of weakTopics.slice(0, CHALLENGE_SIZE)) {
    const weakIdx = topics.indexOf(weakTopic);
    // Take a slot from the topic with the most slots (that has ≥ 2)
    const donor = sortedByWeight.find(i => i !== weakIdx && slots[i] >= 2);
    if (donor === undefined) break; // no slots to move
    slots[donor]--;
    slots[weakIdx]++;
  }

  // Step 4: Pick exercises for each allocated slot, avoiding duplicates
  const result: GrammarExercise[] = [];
  const usedIds = new Set<string>();
  let offset = 0;

  for (let i = 0; i < topics.length; i++) {
    const topicExs = byTopic.get(topics[i])!;
    for (let s = 0; s < slots[i]; s++) {
      // Find an exercise from this topic we haven't used yet
      let picked: GrammarExercise | null = null;
      for (let attempt = 0; attempt < topicExs.length; attempt++) {
        const candidate = pickFromTopic(topicExs, seed, offset + attempt);
        if (!usedIds.has(candidate.id)) {
          picked = candidate;
          break;
        }
      }
      // Fallback: just use the offset pick (duplicate is better than crash)
      if (!picked) picked = pickFromTopic(topicExs, seed, offset);
      usedIds.add(picked.id);
      result.push(picked);
      offset++;
    }
  }

  return result;
}

// getTomorrowString and formatDate are imported from src/lib/dateUtils.ts

// ─── Screen types ──────────────────────────────────────────────────────────────

type Screen = 'loading' | 'intro' | 'challenge' | 'done' | 'already-done';

// ─── Component ────────────────────────────────────────────────────────────────

export default function DailyScreen() {
  const level = useLevelStore(state => state.level);
  const allExercises = GRAMMAR[level];
  const setContextualTip = useTipStore((state) => state.setContextualTip);
  const userId = useAuthStore(state => state.userId) ?? 'fallback-user';

  const [screen, setScreen] = useState<Screen>('loading');
  const [progress, setProgress] = useState<UserProgress>({
    streakCount: 0,
    lastActiveDate: '',
    dailyChallengeCompletedDate: '',
  });
  // exercises are computed after topic scores load, so they start empty
  const [exercises, setExercises] = useState<GrammarExercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setScreen('loading');
      setCurrentIndex(0);
      setCorrectCount(0);

      // Load both streak progress and topic weakness scores in parallel,
      // then compute the weighted exercise selection before showing the intro.
      Promise.all([
        loadProgress(),
        loadTopicScores(level),
      ]).then(([p, scoreMap]) => {
        setProgress(p);
        // Compute weighted exercises now that we have topic scores
        setExercises(getDailyExercises(allExercises, userId, scoreMap));
        if (p.dailyChallengeCompletedDate === getTodayString()) {
          setScreen('already-done');
        } else {
          setScreen('intro');
        }
      });
    }, [level]) // re-run if level changes
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
      // Surface a targeted tip based on the user's recent grammar mistakes
      loadMistakes().then((mistakes) => {
        const tip = getContextualTip(mistakes, level);
        if (tip) setContextualTip(tip);
      });
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

        {/* Grace period indicator — only shown when grace was applied */}
        {progress.graceUsed && (
          <Text style={styles.graceNote}>Grace day used</Text>
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
  graceNote: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: spacing.sm,
    letterSpacing: 0.3,
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