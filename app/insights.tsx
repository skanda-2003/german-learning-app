// insights.tsx — Insights / Analytics screen
//
// Shows four sections:
//   1. WEAK VOCABULARY  — words you've marked Unknown or Shaky
//   2. RECENT MISTAKES  — last 10 grammar questions you got wrong
//   3. WEAK TOPICS      — grammar topics ranked by mistake count
//   4. ACTIVITY         — heatmap of the last 3 months of daily challenge completions

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
import { loadMistakes, MistakeEntry } from '../src/lib/mistakeService';
import { loadActivityDates } from '../src/lib/activityService';
import { loadTopicScores } from '../src/lib/grammarTopicService';
import type { Word } from '../src/data/vocabulary';
import type { MasteryState } from '../src/lib/masteryService';
import {
  colors, font, fontSize, spacing, radius, labelStyle,
} from '../src/styles/theme';
import { toDateString } from '../src/lib/dateUtils';

// ─── Types ─────────────────────────────────────────────────────────────────────

type WeakWord = { word: Word; state: MasteryState };
type WeakTopic = { topic: string; pct: number; sessions: number };

// ─── Constants ─────────────────────────────────────────────────────────────────

const DAYS_SHOWN   = 91;  // ~3 months
const MAX_WEAK_WORDS   = 15;
const MAX_MISTAKES     = 10;

// ─── Helpers ───────────────────────────────────────────────────────────────────

// toDateString is imported from src/lib/dateUtils.ts

// Build the calendar grid for the last DAYS_SHOWN days.
// Returns an array of week-columns; each column is 7 day slots (null = padding).
type DaySlot = { dateStr: string; isActive: boolean } | null;

function buildCalendarWeeks(activeDatesSet: Set<string>): DaySlot[][] {
  // Build flat array of the last DAYS_SHOWN days.
  // Use setDate() instead of subtracting ms to avoid DST edge cases.
  const allDays: DaySlot[] = [];
  for (let i = DAYS_SHOWN - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    allDays.push({ dateStr: toDateString(d), isActive: activeDatesSet.has(toDateString(d)) });
  }

  // Pad the start so day 0 falls on the correct weekday column (0 = Sunday).
  const firstDay    = new Date();
  firstDay.setDate(firstDay.getDate() - (DAYS_SHOWN - 1));
  const startPad    = firstDay.getDay(); // 0 = Sunday
  const padded: DaySlot[] = [...Array<null>(startPad).fill(null), ...allDays];

  // Group into weeks of 7
  const weeks: DaySlot[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }
  return weeks;
}

// Extract the month abbreviation for the first day of each week (for column labels)
const MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function weekMonthLabel(week: DaySlot[]): string | null {
  // Return a month label if this week contains the 1st of a month
  const firstDay = week.find((d) => d !== null);
  if (!firstDay) return null;
  if (firstDay.dateStr.slice(8) === '01') {
    return MONTH_ABBR[parseInt(firstDay.dateStr.slice(5, 7), 10) - 1];
  }
  return null;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function InsightsScreen() {
  const level = useLevelStore((state) => state.level);

  const [isLoading,   setIsLoading]   = useState(true);
  const [weakWords,   setWeakWords]   = useState<WeakWord[]>([]);
  const [mistakes,    setMistakes]    = useState<MistakeEntry[]>([]);
  const [weakTopics,  setWeakTopics]  = useState<WeakTopic[]>([]);
  const [calWeeks,    setCalWeeks]    = useState<DaySlot[][]>([]);
  const [activeCount, setActiveCount] = useState(0);

  // ── Load all data when the screen comes into focus ──
  useFocusEffect(
    useCallback(() => {
      loadAll();
    }, [level])
  );

  async function loadAll() {
    setIsLoading(true);

    const [masteryMap, mistakeList, activityDateList, topicScoreMap] = await Promise.all([
      loadMastery(),
      loadMistakes(),
      loadActivityDates(),
      loadTopicScores(level),
    ]);

    // ── 1. Weak vocabulary ──
    const vocabForLevel = VOCABULARY[level];
    const weakVocab: WeakWord[] = vocabForLevel
      .filter((w) => {
        const state = masteryMap.get(w.id)?.state; // .state because MasteryMap now stores MasteryData
        return state === 'unknown' || state === 'shaky';
      })
      .map((w) => ({ word: w, state: masteryMap.get(w.id)!.state as MasteryState }))
      // Sort: unknown first (higher priority to review), then shaky
      .sort((a, b) => {
        if (a.state === b.state) return 0;
        return a.state === 'unknown' ? -1 : 1;
      })
      .slice(0, MAX_WEAK_WORDS);

    // ── 2. Weak grammar topics — sorted by lowest best score ──
    // Only shows topics that have been attempted at least once.
    const weakTopicList: WeakTopic[] = Array.from(topicScoreMap.entries())
      .filter(([, s]) => s.bestTotal > 0)
      .map(([topic, s]) => ({
        topic,
        pct:      Math.round((s.bestScore / s.bestTotal) * 100),
        sessions: s.sessionsCompleted,
      }))
      .sort((a, b) => a.pct - b.pct) // lowest score first = weakest topic first
      .slice(0, 10);

    // ── 3. Activity calendar ──
    const activeDatesSet = new Set(activityDateList);
    const weeks = buildCalendarWeeks(activeDatesSet);

    setWeakWords(weakVocab);
    setMistakes(mistakeList.slice(0, MAX_MISTAKES));
    setWeakTopics(weakTopicList);
    setCalWeeks(weeks);
    setActiveCount(activeDatesSet.size);
    setIsLoading(false);
  }

  // ─── Loading ──────────────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="small" color={colors.accent} />
      </View>
    );
  }

  // Bar color for a topic score: green ≥ 80%, amber 50–79%, red < 50%
  function topicBarColor(pct: number): string {
    if (pct >= 80) return colors.success;
    if (pct >= 50) return colors.amber;
    return colors.error;
  }

  // ─── Main render ──────────────────────────────────────────────────────────────

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>Insights</Text>
      <Text style={styles.pageSubtitle}>
        Analytics — where you're weak and what to revisit.
      </Text>

      {/* ── Section 1: Weak Vocabulary ─────────────────────────────── */}
      <Text style={[labelStyle, styles.sectionLabel]}>WEAK VOCABULARY</Text>
      <View style={styles.card}>
        {weakWords.length === 0 ? (
          <Text style={styles.emptyText}>
            No weak vocabulary yet — keep studying flashcards.
          </Text>
        ) : (
          weakWords.map(({ word, state }) => (
            <View key={word.id} style={styles.vocabRow}>
              <View style={styles.vocabLeft}>
                <Text style={styles.vocabGerman}>{word.german}</Text>
                <Text style={styles.vocabEnglish}>{word.english}</Text>
              </View>
              <View style={[
                styles.stateBadge,
                state === 'unknown' ? styles.badgeUnknown : styles.badgeShaky,
              ]}>
                <Text style={[
                  styles.stateBadgeText,
                  state === 'unknown' ? styles.badgeTextUnknown : styles.badgeTextShaky,
                ]}>
                  {state}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>

      {/* ── Section 2: Recent Mistakes ─────────────────────────────── */}
      <Text style={[labelStyle, styles.sectionLabel]}>RECENT MISTAKES</Text>
      <View style={styles.card}>
        {mistakes.length === 0 ? (
          <Text style={styles.emptyText}>
            No mistakes logged yet — complete some grammar exercises.
          </Text>
        ) : (
          mistakes.map((m) => (
            <View key={m.id} style={styles.mistakeRow}>
              <Text style={styles.mistakeQuestion} numberOfLines={2}>
                {m.question}
              </Text>
              <View style={styles.mistakeAnswerRow}>
                <Text style={styles.mistakeYours}>
                  You: <Text style={styles.wrongText}>{m.userAnswer}</Text>
                </Text>
                <Text style={styles.mistakeCorrect}>
                  Correct: <Text style={styles.correctText}>{m.correctAnswer}</Text>
                </Text>
              </View>
            </View>
          ))
        )}
      </View>

      {/* ── Section 3: Weak Grammar Topics ─────────────────────────── */}
      <Text style={[labelStyle, styles.sectionLabel]}>WEAK GRAMMAR TOPICS</Text>
      <View style={styles.card}>
        {weakTopics.length === 0 ? (
          <Text style={styles.emptyText}>
            No topic data yet — complete grammar exercises by topic to see scores here.
          </Text>
        ) : (
          weakTopics.map(({ topic, pct }) => (
            <View key={topic} style={styles.topicRow}>
              <Text style={styles.topicName} numberOfLines={1}>{topic}</Text>
              <View style={styles.topicBarTrack}>
                <View style={[
                  styles.topicBarFill,
                  { width: `${pct}%` as any, backgroundColor: topicBarColor(pct) },
                ]} />
              </View>
              <Text style={styles.topicCount}>{pct}%</Text>
            </View>
          ))
        )}
      </View>

      {/* ── Section 4: Activity Calendar ───────────────────────────── */}
      <Text style={[labelStyle, styles.sectionLabel]}>ACTIVITY</Text>
      <View style={styles.card}>
        <Text style={styles.calendarMeta}>
          {activeCount} day{activeCount !== 1 ? 's' : ''} completed in the last 3 months
        </Text>

        {/* Day-of-week labels */}
        <View style={styles.calendarDayLabels}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <Text key={i} style={styles.dayLabel}>{d}</Text>
          ))}
        </View>

        {/* Month labels + grid */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            {/* Month name labels above each column */}
            <View style={styles.calendarMonthRow}>
              {calWeeks.map((week, wi) => {
                const label = weekMonthLabel(week);
                return (
                  <View key={wi} style={styles.calendarCell}>
                    {label && <Text style={styles.monthLabel}>{label}</Text>}
                  </View>
                );
              })}
            </View>

            {/* Week columns */}
            <View style={styles.calendarGrid}>
              {calWeeks.map((week, wi) => (
                <View key={wi} style={styles.calendarWeekCol}>
                  {week.map((day, di) => (
                    <View
                      key={di}
                      style={[
                        styles.calendarSquare,
                        day === null
                          ? styles.squareEmpty
                          : day.isActive
                            ? styles.squareActive
                            : styles.squareInactive,
                      ]}
                    />
                  ))}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Legend */}
        <View style={styles.calendarLegend}>
          <View style={[styles.calendarSquare, styles.squareInactive]} />
          <Text style={styles.legendText}>No challenge</Text>
          <View style={[styles.calendarSquare, styles.squareActive, { marginLeft: spacing.md }]} />
          <Text style={styles.legendText}>Completed</Text>
        </View>
      </View>

    </ScrollView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const SQUARE_SIZE = 11;
const SQUARE_GAP  = 2;

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },

  container: {
    padding: spacing.xxl,
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
    lineHeight: 20,
  },

  sectionLabel: {
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },

  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },

  emptyText: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textMuted,
    textAlign: 'center',
    paddingVertical: spacing.sm,
  },

  // ── Weak vocabulary ──
  vocabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  vocabLeft: {
    flex: 1,
    marginRight: spacing.md,
  },
  vocabGerman: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  vocabEnglish: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 1,
  },
  stateBadge: {
    borderWidth: 1,
    borderRadius: radius.sm,
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
  },
  badgeUnknown: {
    borderColor: colors.error,
    backgroundColor: colors.errorLight,
  },
  badgeShaky: {
    borderColor: colors.amber,
    backgroundColor: colors.amberLight,
  },
  stateBadgeText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.xxs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  badgeTextUnknown: { color: colors.error },
  badgeTextShaky:   { color: colors.amber },

  // ── Recent mistakes ──
  mistakeRow: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  mistakeQuestion: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    lineHeight: 18,
  },
  mistakeAnswerRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  mistakeYours: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  mistakeCorrect: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  wrongText:    { color: colors.error,   fontFamily: 'IBMPlexMono_600SemiBold' },
  correctText:  { color: colors.success, fontFamily: 'IBMPlexMono_600SemiBold' },

  // ── Weak grammar topics ──
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  topicName: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textPrimary,
    width: 130,
  },
  topicBarTrack: {
    flex: 1,
    height: 6,
    backgroundColor: colors.border,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  topicBarFill: {
    height: '100%',
    backgroundColor: colors.error,
    borderRadius: radius.sm,
  },
  topicCount: {
    fontFamily: font.semiBold,
    fontSize: fontSize.xs,
    color: colors.textMuted,
    width: 20,
    textAlign: 'right',
  },

  // ── Activity calendar ──
  calendarMeta: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },

  calendarDayLabels: {
    flexDirection: 'column',
    position: 'absolute',
    left: spacing.lg,
    top: 48, // aligns with the grid rows (below month row)
    gap: SQUARE_GAP,
  },
  dayLabel: {
    fontFamily: font.regular,
    fontSize: 8,
    color: colors.textMuted,
    height: SQUARE_SIZE,
    lineHeight: SQUARE_SIZE,
    width: 8,
    textAlign: 'center',
  },

  calendarMonthRow: {
    flexDirection: 'row',
    gap: SQUARE_GAP,
    marginBottom: SQUARE_GAP,
    marginLeft: 14, // leaves space for day labels
  },
  calendarCell: {
    width: SQUARE_SIZE,
  },
  monthLabel: {
    fontFamily: font.regular,
    fontSize: 8,
    color: colors.textSecondary,
  },

  calendarGrid: {
    flexDirection: 'row',
    gap: SQUARE_GAP,
    marginLeft: 14, // leaves space for day labels
  },
  calendarWeekCol: {
    flexDirection: 'column',
    gap: SQUARE_GAP,
  },
  calendarSquare: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    borderRadius: 2,
  },
  squareEmpty:    { backgroundColor: 'transparent' },
  squareInactive: { backgroundColor: colors.border },
  squareActive:   { backgroundColor: colors.success },

  calendarLegend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  legendText: {
    fontFamily: font.regular,
    fontSize: fontSize.xxs,
    color: colors.textMuted,
  },
});