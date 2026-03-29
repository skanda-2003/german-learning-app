// index.tsx — Home / Dashboard screen
//
// Shows a summary of the user's current state:
//   - Current level + daily challenge streak
//   - Vocabulary mastery progress bar
//   - Quick-access cards for each section

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import useLevelStore from '../src/store/useLevelStore';
import { VOCABULARY } from '../src/data/vocabulary';
import { loadMastery } from '../src/lib/masteryService';
import { loadProgress, getTodayString } from '../src/lib/streakService';
import { loadAllScores } from '../src/lib/scoresService';
import {
  colors, font, fontSize, spacing, radius,
  cardStyle, labelStyle, statNumberStyle, progressTrackStyle,
} from '../src/styles/theme';

// ─── Types ─────────────────────────────────────────────────────────────────────

type DashboardData = {
  streak: number;
  challengeDoneToday: boolean;
  knownCount: number;
  totalCount: number;
  grammarSessions: number;
  grammarBestPct: number | null;
  examSessions: number;
  gamesSessions: number;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const level = useLevelStore((state) => state.level);
  const router = useRouter();

  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  // Reload every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      let cancelled = false;

      async function load() {
        setLoading(true);
        const vocab = VOCABULARY[level];

        const [mastery, progress, scores] = await Promise.all([
          loadMastery(),
          loadProgress(),
          loadAllScores(),
        ]);

        const knownCount = vocab.filter(w => mastery.has(w.id)).length;
        const totalCount = vocab.length;

        const challengeDoneToday =
          progress.dailyChallengeCompletedDate === getTodayString();

        // Grammar best %
        const g = scores.grammar;
        const grammarBestPct = g.bestTotal > 0
          ? Math.round((g.bestScore / g.bestTotal) * 100)
          : null;

        // Exam: sum sessions across all 4 sub-sections
        const examSessions =
          scores.exam_reading.sessionsCompleted +
          scores.exam_listening.sessionsCompleted +
          scores.exam_writing.sessionsCompleted +
          scores.exam_speaking.sessionsCompleted;

        // Games: sum sessions across all games
        const gamesSessions =
          scores.game_gender_battle.sessionsCompleted +
          scores.game_listening_quiz.sessionsCompleted +
          scores.game_word_match.sessionsCompleted;

        if (!cancelled) {
          setData({
            streak: progress.streakCount,
            challengeDoneToday,
            knownCount,
            totalCount,
            grammarSessions: g.sessionsCompleted,
            grammarBestPct,
            examSessions,
            gamesSessions,
          });
          setLoading(false);
        }
      }

      load();
      return () => { cancelled = true; };
    }, [level])
  );

  if (loading || !data) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={colors.accent} />
      </View>
    );
  }

  const masteryPct = data.totalCount > 0
    ? data.knownCount / data.totalCount
    : 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* ── Top bar: level + streak ── */}
      <View style={styles.topRow}>
        <View style={styles.levelBadge}>
          <Text style={styles.levelBadgeText}>{level}</Text>
        </View>
        <View style={styles.streakBadge}>
          <Text style={styles.streakFire}>🔥</Text>
          <Text style={styles.streakCount}>{data.streak}</Text>
          <Text style={styles.streakLabel}>day streak</Text>
        </View>
      </View>

      {/* ── Greeting ── */}
      <View style={styles.greetingBlock}>
        <Text style={styles.greetingTitle}>Lerne Deutsch</Text>
        <Text style={styles.greetingSubtitle}>
          {data.challengeDoneToday
            ? 'Daily challenge complete. Keep it up.'
            : 'Complete today\'s challenge to keep your streak.'}
        </Text>
      </View>

      {/* ── Vocabulary card ── */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>VOCABULARY MASTERY</Text>
        <View style={styles.masteryRow}>
          <Text style={styles.masteryNumber}>{data.knownCount}</Text>
          <Text style={styles.masteryTotal}> / {data.totalCount} words</Text>
        </View>

        {/* Progress bar */}
        <View style={[progressTrackStyle, styles.progressTrack]}>
          <View
            style={[
              styles.progressFill,
              { width: `${Math.round(masteryPct * 100)}%` as any },
            ]}
          />
        </View>

        <Text style={styles.masteryPctLabel}>
          {Math.round(masteryPct * 100)}% of {level} vocabulary known
        </Text>
      </View>

      {/* ── Section summary cards ── */}
      <Text style={[labelStyle, styles.sectionHeading]}>SECTIONS</Text>

      <View style={styles.sectionGrid}>

        <SectionCard
          emoji="📅"
          title="Daily Challenge"
          detail={data.challengeDoneToday ? 'Done today' : 'Not done yet'}
          highlight={data.challengeDoneToday}
          onPress={() => router.push('/daily')}
        />

        <SectionCard
          emoji="🃏"
          title="Flashcards"
          detail={`${data.knownCount} known`}
          onPress={() => router.push('/flashcards')}
        />

        <SectionCard
          emoji="📝"
          title="Grammar"
          detail={
            data.grammarBestPct !== null
              ? `Best: ${data.grammarBestPct}%`
              : `${data.grammarSessions} sessions`
          }
          onPress={() => router.push('/grammar')}
        />

        <SectionCard
          emoji="🎓"
          title="Exam Prep"
          detail={
            data.examSessions > 0
              ? `${data.examSessions} sessions`
              : 'Not started'
          }
          onPress={() => router.push('/exam')}
        />

        <SectionCard
          emoji="🎮"
          title="Mini Games"
          detail={
            data.gamesSessions > 0
              ? `${data.gamesSessions} sessions`
              : 'Not started'
          }
          onPress={() => router.push('/games')}
        />

        <SectionCard
          emoji="📊"
          title="Progress"
          detail="View all scores"
          onPress={() => router.push('/progress')}
        />

      </View>

    </ScrollView>
  );
}

// ─── Section card sub-component ───────────────────────────────────────────────

import { TouchableOpacity } from 'react-native';

type SectionCardProps = {
  emoji: string;
  title: string;
  detail: string;
  highlight?: boolean;
  onPress: () => void;
};

function SectionCard({ emoji, title, detail, highlight, onPress }: SectionCardProps) {
  return (
    <TouchableOpacity
      style={[styles.sectionCard, highlight && styles.sectionCardHighlight]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text style={styles.sectionCardEmoji}>{emoji}</Text>
      <Text style={styles.sectionCardTitle}>{title}</Text>
      <Text style={[
        styles.sectionCardDetail,
        highlight && styles.sectionCardDetailHighlight,
      ]}>
        {detail}
      </Text>
    </TouchableOpacity>
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

  // ── Top row ──
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xxl,
  },
  levelBadge: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  levelBadgeText: {
    fontFamily: font.bold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    letterSpacing: 1,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  streakFire: {
    fontSize: 18,
  },
  streakCount: {
    fontFamily: font.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
  },
  streakLabel: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },

  // ── Greeting ──
  greetingBlock: {
    marginBottom: spacing.xxl,
  },
  greetingTitle: {
    fontFamily: font.bold,
    fontSize: fontSize.xxxl,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  greetingSubtitle: {
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 22,
  },

  // ── Vocabulary card ──
  card: {
    ...cardStyle,
    marginBottom: spacing.xxxl,
  },
  cardLabel: {
    ...labelStyle,
    marginBottom: spacing.lg,
  },
  masteryRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.lg,
  },
  masteryNumber: {
    ...statNumberStyle,
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
  masteryPctLabel: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },

  // ── Section grid ──
  sectionHeading: {
    marginBottom: spacing.md,
  },
  sectionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  sectionCard: {
    ...cardStyle,
    padding: spacing.xl,
    width: '47%' as any,
    minWidth: 140,
  },
  sectionCardHighlight: {
    borderColor: colors.success,
    backgroundColor: colors.successLight,
  },
  sectionCardEmoji: {
    fontSize: 22,
    marginBottom: spacing.sm,
  },
  sectionCardTitle: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  sectionCardDetail: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  sectionCardDetailHighlight: {
    color: colors.success,
    fontFamily: font.semiBold,
  },
});