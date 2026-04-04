// index.tsx — Home / Dashboard screen
//
// Purpose: forward-looking — tells the user what to do next.
// (Progress screen is backward-looking — how have I done overall)
//
// Layout:
//   1. Top row — level badge + streak count
//   2. Greeting — "LERNE DEUTSCH" wordmark + streak message
//   3. TODAY'S FOCUS — recommended next section (lowest score / not started)
//   4. Stats strip — words known · best grammar · daily challenge
//   5. Section grid — 6 quick-launch cards with Feather icons (no emojis)

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import useLevelStore from '../src/store/useLevelStore';
import { VOCABULARY } from '../src/data/vocabulary';
import { loadMastery } from '../src/lib/masteryService';
import { loadProgress, getTodayString } from '../src/lib/streakService';
import { loadAllScores } from '../src/lib/scoresService';
import {
  colors, font, fontSize, spacing, radius,
  labelStyle,
} from '../src/styles/theme';

// ─── Types ─────────────────────────────────────────────────────────────────────

type DashboardData = {
  streak: number;
  challengeDoneToday: boolean;
  knownCount: number;
  totalCount: number;
  dueCount: number;       // words with next_review_date <= today
  grammarSessions: number;
  grammarBestPct: number | null;
  examSessions: number;
  gamesSessions: number;
};

// ─── TODAY'S FOCUS logic ───────────────────────────────────────────────────────
// Returns the section we most recommend, plus a short reason string.

type FocusSection = {
  label: string;       // section name shown in the card
  reason: string;      // one-line explanation, e.g. "Not started yet"
  icon: string;        // Feather icon name
  route: string;       // expo-router href
};

// Returns the appropriate German greeting based on the current hour
function getGermanGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Guten Morgen.';
  if (hour >= 12 && hour < 18) return 'Guten Tag.';
  if (hour >= 18 && hour < 22) return 'Guten Abend.';
  return 'Gute Nacht.';
}

function getFocusSection(data: DashboardData): FocusSection {
  // Priority 1: daily challenge not done today
  if (!data.challengeDoneToday) {
    return {
      label: 'Daily Challenge',
      reason: 'Complete today\'s challenge to keep your streak.',
      icon: 'calendar',
      route: '/daily',
    };
  }
  // Priority 2: grammar never attempted
  if (data.grammarSessions === 0) {
    return {
      label: 'Grammar',
      reason: 'Not started yet — drill the fundamentals.',
      icon: 'edit-3',
      route: '/grammar',
    };
  }
  // Priority 3: grammar score below 70%
  if (data.grammarBestPct !== null && data.grammarBestPct < 70) {
    return {
      label: 'Grammar',
      reason: `Your best score is ${data.grammarBestPct}% — room to improve.`,
      icon: 'edit-3',
      route: '/grammar',
    };
  }
  // Priority 4: exam prep never attempted
  if (data.examSessions === 0) {
    return {
      label: 'Exam Prep',
      reason: 'Not started yet — practise all four skills.',
      icon: 'book-open',
      route: '/exam',
    };
  }
  // Priority 5: mini games never played
  if (data.gamesSessions === 0) {
    return {
      label: 'Mini Games',
      reason: 'Not started yet — practise through play.',
      icon: 'zap',
      route: '/games',
    };
  }
  // Default: always good to review flashcards
  return {
    label: 'Flashcards',
    reason: `${data.knownCount} of ${data.totalCount} words known — keep going.`,
    icon: 'layers',
    route: '/flashcards',
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const level = useLevelStore((state) => state.level);
  const router = useRouter();

  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  // Reload every time this screen comes into focus
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

        const knownCount = vocab.filter(w => mastery.get(w.id)?.state === 'known').length;
        const totalCount = vocab.length;

        // Count words due for review today (next_review_date <= today, or never studied)
        const todayStr = new Date().toISOString().split('T')[0];
        const dueCount = vocab.filter(w => {
          const m = mastery.get(w.id);
          if (!m) return true; // never studied — always due
          if (m.nextReviewDate && m.nextReviewDate > todayStr) return false;
          return true;
        }).length;

        const challengeDoneToday =
          progress.dailyChallengeCompletedDate === getTodayString();

        const g = scores.grammar;
        const grammarBestPct = g.bestTotal > 0
          ? Math.round((g.bestScore / g.bestTotal) * 100)
          : null;

        const examSessions =
          scores.exam_reading.sessionsCompleted +
          scores.exam_listening.sessionsCompleted +
          scores.exam_writing.sessionsCompleted +
          scores.exam_speaking.sessionsCompleted +
          scores.exam_comprehension.sessionsCompleted;

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
            dueCount,
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

  const masteryPct = data.totalCount > 0 ? data.knownCount / data.totalCount : 0;
  const focus = getFocusSection(data);

  // Streak message shown under the wordmark
  const streakMessage = data.streak > 0
    ? `You're on a ${data.streak}-day streak.`
    : 'Start your streak — complete today\'s challenge.';

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* ── 1. Top row: level badge + streak ── */}
      <View style={styles.topRow}>
        <View style={styles.levelBadge}>
          <Text style={styles.levelBadgeText}>{level}</Text>
        </View>
        <View style={styles.streakRow}>
          <Text style={styles.streakCount}>{data.streak}</Text>
          <Text style={styles.streakLabel}> day streak</Text>
        </View>
      </View>

      {/* ── 2. Greeting: German time-of-day greeting + streak message ── */}
      <View style={styles.greetingBlock}>
        <Text style={styles.greeting}>{getGermanGreeting()}</Text>
        <Text style={styles.streakMessage}>{streakMessage}</Text>
      </View>

      {/* ── 3. TODAY'S FOCUS card ── */}
      <TouchableOpacity
        style={styles.focusCard}
        onPress={() => router.push(focus.route as any)}
        activeOpacity={0.8}
      >
        <Text style={styles.focusLabel}>TODAY'S FOCUS</Text>
        <View style={styles.focusBody}>
          <View style={styles.focusIconWrap}>
            <Feather name={focus.icon as any} size={18} color={colors.accent} />
          </View>
          <View style={styles.focusText}>
            <Text style={styles.focusSection}>{focus.label}</Text>
            <Text style={styles.focusReason}>{focus.reason}</Text>
          </View>
          <Feather name="arrow-right" size={16} color={colors.textMuted} />
        </View>
      </TouchableOpacity>

      {/* ── 4. Stats strip ── */}
      <View style={styles.statsStrip}>
        <View style={styles.statCell}>
          <Text style={styles.statNumber}>{data.knownCount}</Text>
          <Text style={styles.statLabel}>words known</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCell}>
          <Text style={styles.statNumber}>
            {data.grammarBestPct !== null ? `${data.grammarBestPct}%` : '—'}
          </Text>
          <Text style={styles.statLabel}>best grammar</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCell}>
          <Text style={[styles.statNumber, data.challengeDoneToday && styles.statNumberGreen]}>
            {data.challengeDoneToday ? '✓' : '—'}
          </Text>
          <Text style={styles.statLabel}>daily done</Text>
        </View>
      </View>

      {/* ── 5. Section grid ── */}
      <Text style={[labelStyle, styles.sectionHeading]}>SECTIONS</Text>

      <View style={styles.sectionGrid}>
        <SectionCard
          icon="calendar"
          title="Daily Challenge"
          detail={data.challengeDoneToday ? 'Done today' : 'Not done yet'}
          highlight={data.challengeDoneToday}
          onPress={() => router.push('/daily')}
        />
        <SectionCard
          icon="layers"
          title="Flashcards"
          detail={`${data.dueCount} due · ${data.knownCount} known`}
          onPress={() => router.push('/flashcards')}
        />
        <SectionCard
          icon="edit-3"
          title="Grammar"
          detail={data.grammarBestPct !== null ? `Best: ${data.grammarBestPct}%` : 'Not started'}
          onPress={() => router.push('/grammar')}
        />
        <SectionCard
          icon="book-open"
          title="Exam Prep"
          detail={data.examSessions > 0 ? `${data.examSessions} sessions` : 'Not started'}
          onPress={() => router.push('/exam')}
        />
        <SectionCard
          icon="zap"
          title="Mini Games"
          detail={data.gamesSessions > 0 ? `${data.gamesSessions} sessions` : 'Not started'}
          onPress={() => router.push('/games')}
        />
        <SectionCard
          icon="bar-chart-2"
          title="Progress"
          detail={`${Math.round(masteryPct * 100)}% vocab known`}
          onPress={() => router.push('/progress')}
        />
      </View>

    </ScrollView>
  );
}

// ─── Section card sub-component ───────────────────────────────────────────────

type SectionCardProps = {
  icon: string;      // Feather icon name — no emojis
  title: string;
  detail: string;
  highlight?: boolean;
  onPress: () => void;
};

function SectionCard({ icon, title, detail, highlight, onPress }: SectionCardProps) {
  return (
    <TouchableOpacity
      style={[styles.sectionCard, highlight && styles.sectionCardHighlight]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Feather
        name={icon as any}
        size={15}
        color={highlight ? colors.success : colors.textMuted}
        style={styles.sectionCardIcon}
      />
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

  // ── 1. Top row ──
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
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  levelBadgeText: {
    fontFamily: font.bold,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    letterSpacing: 1,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
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

  // ── 2. Greeting ──
  greetingBlock: {
    marginBottom: spacing.xxl,
  },
  // German time-of-day greeting — large, IBM Plex Mono, primary text
  greeting: {
    fontFamily: font.bold,
    fontSize: fontSize.xxxl,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  streakMessage: {
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 22,
  },

  // ── 3. TODAY'S FOCUS card ──
  focusCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.accent,   // blue border makes it stand out from regular cards
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.xxl,
  },
  focusLabel: {
    fontFamily: font.semiBold,
    fontSize: fontSize.xs,
    color: colors.accent,
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  focusBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  focusIconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusText: {
    flex: 1,
  },
  focusSection: {
    fontFamily: font.semiBold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  focusReason: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 18,
  },

  // ── 4. Stats strip ──
  statsStrip: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    marginBottom: spacing.xxl,
  },
  statCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  statNumber: {
    fontFamily: font.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  statNumberGreen: {
    color: colors.success,
  },
  statLabel: {
    fontFamily: font.regular,
    fontSize: fontSize.xxs,
    color: colors.textMuted,
    textAlign: 'center',
    letterSpacing: 0.3,
  },

  // ── 5. Section grid ──
  sectionHeading: {
    marginBottom: spacing.md,
  },
  sectionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  sectionCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.lg,
    width: '47%' as any,
    minWidth: 140,
  },
  sectionCardHighlight: {
    borderColor: colors.success,
    backgroundColor: colors.successLight,
  },
  sectionCardIcon: {
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