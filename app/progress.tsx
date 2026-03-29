// progress.tsx — Progress Dashboard
//
// Shows the user's overall progress across all sections:
//   - Streak and daily challenge status
//   - Vocabulary mastery (known vs total)
//   - Best scores for: Grammar, Exam Reading, Exam Listening
//   - Completion counts for: Exam Writing, Exam Speaking
//   - Best scores for: Gender Battle, Listening Quiz
//   - Completion count for: Word Match
//
// Reloads data every time the screen comes into focus (useFocusEffect).

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import useLevelStore from '../src/store/useLevelStore';
import { VOCABULARY } from '../src/data/vocabulary';
import { loadMastery } from '../src/lib/masteryService';
import { loadProgress, getTodayString } from '../src/lib/streakService';
import { loadAllScores, SectionScore } from '../src/lib/scoresService';
import {
  colors, font, fontSize, spacing, radius,
  cardStyle, labelStyle, progressTrackStyle, statNumberStyle,
} from '../src/styles/theme';

// ─── Helpers ───────────────────────────────────────────────────────────────────

function pct(score: SectionScore): string {
  if (score.bestTotal === 0) return '—';
  return `${Math.round((score.bestScore / score.bestTotal) * 100)}%`;
}

// ─── Sub-components ────────────────────────────────────────────────────────────

type ScoreRowProps = {
  label: string;
  score: SectionScore;
  type: 'scored' | 'completion';
};

function ScoreRow({ label, score, type }: ScoreRowProps) {
  const isAttempted = score.sessionsCompleted > 0;

  return (
    <View style={rowStyles.row}>
      <Text style={rowStyles.label}>{label}</Text>
      <View style={rowStyles.right}>
        {type === 'scored' ? (
          <>
            <Text style={rowStyles.value}>{pct(score)}</Text>
            <Text style={rowStyles.meta}>
              {isAttempted ? `${score.sessionsCompleted} sessions` : 'Not started'}
            </Text>
          </>
        ) : (
          <>
            <Text style={rowStyles.value}>
              {isAttempted ? score.sessionsCompleted : '—'}
            </Text>
            <Text style={rowStyles.meta}>
              {isAttempted ? 'sessions' : 'Not started'}
            </Text>
          </>
        )}
      </View>
    </View>
  );
}

const rowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  label: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    flex: 1,
  },
  right: {
    alignItems: 'flex-end',
  },
  value: {
    fontFamily: font.bold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  meta: {
    fontFamily: font.regular,
    fontSize: fontSize.xxs,
    color: colors.textMuted,
  },
});

// ─── Main component ───────────────────────────────────────────────────────────

export default function ProgressScreen() {
  const level = useLevelStore((state) => state.level);

  const [loading, setLoading] = useState(true);
  const [knownCount, setKnownCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [challengeDoneToday, setChallengeDoneToday] = useState(false);
  const [scores, setScores] = useState<Awaited<ReturnType<typeof loadAllScores>> | null>(null);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;

      async function load() {
        setLoading(true);
        const vocab = VOCABULARY[level];

        const [mastery, progress, allScores] = await Promise.all([
          loadMastery(),
          loadProgress(),
          loadAllScores(),
        ]);

        if (!cancelled) {
          setKnownCount(vocab.filter(w => mastery.get(w.id) === 'known').length);
          setTotalCount(vocab.length);
          setStreak(progress.streakCount);
          setChallengeDoneToday(progress.dailyChallengeCompletedDate === getTodayString());
          setScores(allScores);
          setLoading(false);
        }
      }

      load();
      return () => { cancelled = true; };
    }, [level])
  );

  if (loading || !scores) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={colors.accent} />
      </View>
    );
  }

  const masteryPct = totalCount > 0 ? knownCount / totalCount : 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.pageTitle}>Progress</Text>
      <Text style={styles.pageSubtitle}>{level} · {totalCount} words</Text>

      {/* ── Streak ── */}
      <View style={[cardStyle, styles.streakCard]}>
        <View style={styles.streakLeft}>
          <Text style={[labelStyle, { marginBottom: spacing.xs }]}>STREAK</Text>
          <Text style={statNumberStyle}>{streak}</Text>
          <Text style={styles.streakUnit}>days</Text>
        </View>
        <View style={styles.streakRight}>
          <Text style={styles.fireEmoji}>🔥</Text>
          <View style={[
            styles.challengeBadge,
            challengeDoneToday ? styles.challengeDone : styles.challengePending,
          ]}>
            <Text style={[
              styles.challengeBadgeText,
              challengeDoneToday ? styles.challengeDoneText : styles.challengePendingText,
            ]}>
              {challengeDoneToday ? 'DONE TODAY' : 'PENDING'}
            </Text>
          </View>
        </View>
      </View>

      {/* ── Vocabulary ── */}
      <View style={[cardStyle, styles.section]}>
        <Text style={[labelStyle, styles.sectionLabel]}>VOCABULARY</Text>
        <View style={styles.masteryRow}>
          <Text style={statNumberStyle}>{knownCount}</Text>
          <Text style={styles.masteryTotal}> / {totalCount}</Text>
        </View>
        <View style={[progressTrackStyle, styles.progressTrack]}>
          <View style={[styles.progressFill, { width: `${Math.round(masteryPct * 100)}%` as any }]} />
        </View>
        <Text style={styles.masteryLabel}>{Math.round(masteryPct * 100)}% mastered</Text>
      </View>

      {/* ── Grammar ── */}
      <View style={[cardStyle, styles.section]}>
        <Text style={[labelStyle, styles.sectionLabel]}>GRAMMAR</Text>
        <ScoreRow label="Exercises" score={scores.grammar} type="scored" />
      </View>

      {/* ── Exam Prep ── */}
      <View style={[cardStyle, styles.section]}>
        <Text style={[labelStyle, styles.sectionLabel]}>EXAM PREP</Text>
        <ScoreRow label="Reading"   score={scores.exam_reading}   type="scored" />
        <ScoreRow label="Listening" score={scores.exam_listening} type="scored" />
        <ScoreRow label="Writing"   score={scores.exam_writing}   type="completion" />
        <ScoreRow label="Speaking"  score={scores.exam_speaking}  type="completion" />
      </View>

      {/* ── Mini Games ── */}
      <View style={[cardStyle, styles.section]}>
        <Text style={[labelStyle, styles.sectionLabel]}>MINI GAMES</Text>
        <ScoreRow label="Gender Battle"  score={scores.game_gender_battle}  type="scored" />
        <ScoreRow label="Listening Quiz" score={scores.game_listening_quiz} type="scored" />
        <ScoreRow label="Word Match"     score={scores.game_word_match}     type="completion" />
      </View>

    </ScrollView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },

  container: {
    padding: spacing.xxl,
    paddingBottom: spacing.hero,
    backgroundColor: colors.background,
  },

  pageTitle: {
    fontFamily: font.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  pageSubtitle: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xxl,
  },

  // ── Streak card ──
  streakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  streakLeft: {
    gap: 2,
  },
  streakUnit: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  streakRight: {
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  fireEmoji: {
    fontSize: 28,
  },
  challengeBadge: {
    borderWidth: 1,
    borderRadius: radius.sm,
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
  },
  challengeDone: {
    borderColor: colors.success,
    backgroundColor: colors.successLight,
  },
  challengePending: {
    borderColor: colors.border,
  },
  challengeBadgeText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.xxs,
    letterSpacing: 0.5,
  },
  challengeDoneText: {
    color: colors.success,
  },
  challengePendingText: {
    color: colors.textMuted,
  },

  // ── Cards ──
  section: {
    marginBottom: spacing.md,
  },
  sectionLabel: {
    marginBottom: spacing.sm,
  },

  // ── Vocabulary ──
  masteryRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.md,
  },
  masteryTotal: {
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  progressTrack: {
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%' as any,
    backgroundColor: colors.accent,
    borderRadius: 2,
  },
  masteryLabel: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
});