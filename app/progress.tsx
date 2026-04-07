// progress.tsx — Progress Dashboard (Phase 10f redesign)
//
// Layout: compact grid with NO scrolling — everything visible at once.
//   Header:  page title + level/word count
//   Top row: 4 stat cards (Streak, Vocabulary, Grammar best, Daily Challenge)
//   Bottom:  3 cards side by side —
//              • Section scores (2-column compact grid)
//              • Vocabulary mastery by category (stacked bars)
//              • Grammar topics (exercise count per topic)

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import useLevelStore from '../src/store/useLevelStore';
import { VOCABULARY } from '../src/data/vocabulary';
import { GRAMMAR } from '../src/data/grammar';
import { loadMastery, MasteryMap } from '../src/lib/masteryService';
import { loadProgress, getTodayString, UserProgress } from '../src/lib/streakService';
import { loadActivity } from '../src/lib/activityService';
import { loadAllScores, SectionScore } from '../src/lib/scoresService';
import { loadTopicScores, TopicScoreMap, TopicScore } from '../src/lib/grammarTopicService';
import {
  colors, font, fontSize, spacing, radius, labelStyle,
} from '../src/styles/theme';

// ─── Helpers ───────────────────────────────────────────────────────────────────

// Format a scored section as a percentage, or "—" if never attempted
function pct(score: SectionScore): string {
  if (score.bestTotal === 0) return '—';
  return `${Math.round((score.bestScore / score.bestTotal) * 100)}%`;
}

// Format lastActiveDate as a human-readable string
function formatLastActive(dateStr: string): string {
  if (!dateStr) return 'never active';
  const today = getTodayString();
  if (dateStr === today) return 'Last active: today';
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86_400_000);
  if (diff === 1) return 'Last active: yesterday';
  return `Last active: ${diff} days ago`;
}

// Format sessions as "Nx" (e.g. "3×"), or "—" if never attempted
function sess(score: SectionScore): string {
  if (score.sessionsCompleted === 0) return '—';
  return `${score.sessionsCompleted}×`;
}

// ─── StatCard ─────────────────────────────────────────────────────────────────
// One of the four top summary cards (Streak / Vocabulary / Grammar / Challenge).

type StatCardProps = {
  label: string;    // ALL CAPS label above the number
  value: string;    // the main big value
  sub: string;      // small line below (unit / context)
  accent?: string;  // optional color override for the value text
};

function StatCard({ label, value, sub, accent }: StatCardProps) {
  return (
    <View style={statCard.card}>
      <Text style={statCard.label}>{label}</Text>
      <Text style={[statCard.value, accent ? { color: accent } : null]}>{value}</Text>
      <Text style={statCard.sub}>{sub}</Text>
    </View>
  );
}

const statCard = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginHorizontal: 4,
  },
  label: {
    fontFamily: font.semiBold,
    fontSize: fontSize.xxs,
    color: colors.textSecondary,
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  value: {
    fontFamily: font.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  sub: {
    fontFamily: font.regular,
    fontSize: fontSize.xxs,
    color: colors.textMuted,
  },
});

// ─── MiniScoreRow ─────────────────────────────────────────────────────────────
// A single label + value row inside the Section Scores card.

type MiniScoreRowProps = {
  label: string;
  value: string;
  isLast?: boolean;  // omits the bottom border on the last row
};

function MiniScoreRow({ label, value, isLast }: MiniScoreRowProps) {
  return (
    <View style={[miniRow.row, isLast ? { borderBottomWidth: 0 } : null]}>
      <Text style={miniRow.label}>{label}</Text>
      <Text style={miniRow.value}>{value}</Text>
    </View>
  );
}

const miniRow = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  label: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textPrimary,
    flex: 1,
  },
  value: {
    fontFamily: font.bold,
    fontSize: fontSize.xs,
    color: colors.textPrimary,
  },
});

// ─── CategoryBar ──────────────────────────────────────────────────────────────
// A stacked bar showing known (green) + shaky (amber) out of total words.
// The remaining width stays as the track background colour (grey).

type CategoryBarProps = {
  label: string;
  total: number;
  known: number;
  shaky: number;
  isLast?: boolean;
};

function CategoryBar({ label, total, known, shaky, isLast }: CategoryBarProps) {
  // Percentages for absolute-positioned fill bars
  const knownPct = total > 0 ? (known / total) * 100 : 0;
  const shakyPct = total > 0 ? (shaky / total) * 100 : 0;

  return (
    <View style={[catBar.row, isLast ? null : { marginBottom: 10 }]}>
      {/* Label row: category name on left, counts on right */}
      <View style={catBar.labelRow}>
        <Text style={catBar.label}>{label}</Text>
        <Text style={catBar.count}>{known + shaky} / {total}</Text>
      </View>

      {/* Stacked bar track + percentage label */}
      <View style={catBar.trackRow}>
        <View style={catBar.track}>
          {/* Green fill: known words */}
          <View style={[catBar.fill, { left: 0, width: `${knownPct}%` as any, backgroundColor: colors.success }]} />
          {/* Amber fill: shaky words, starts right after the green section */}
          <View style={[catBar.fill, { left: `${knownPct}%` as any, width: `${shakyPct}%` as any, backgroundColor: colors.amber }]} />
        </View>
        <Text style={catBar.pctLabel}>
          {total > 0 ? `${Math.round(((known + shaky) / total) * 100)}%` : '0%'}
        </Text>
      </View>
    </View>
  );
}

const catBar = StyleSheet.create({
  row: {},
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textPrimary,
  },
  count: {
    fontFamily: font.regular,
    fontSize: fontSize.xxs,
    color: colors.textMuted,
  },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  track: {
    flex: 1,
    height: 5,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
    position: 'relative',
  },
  pctLabel: {
    fontFamily: font.regular,
    fontSize: fontSize.xxs,
    color: colors.textSecondary,
    width: 28,          // fixed width so all bars align neatly
    textAlign: 'right',
  },
  fill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
});

// ─── TopicRow ────────────────────────────────────────────────────────────────
// A compact row inside the Grammar Topics card: topic name + best score bar + percentage.
// Shows "—" for topics that have never been attempted.

type TopicRowProps = {
  topic: string;
  score: TopicScore | undefined; // undefined = never attempted
  isLast?: boolean;
};

function TopicRow({ topic, score, isLast }: TopicRowProps) {
  const pct = score && score.bestTotal > 0
    ? Math.round((score.bestScore / score.bestTotal) * 100)
    : null;

  // Bar color: green ≥ 80%, amber 50–79%, red < 50%
  const barColor = pct === null
    ? colors.border
    : pct >= 80 ? colors.success
    : pct >= 50 ? colors.amber
    : colors.error;

  return (
    <View style={[topicRow.row, isLast ? { borderBottomWidth: 0 } : null]}>
      <Text style={topicRow.label} numberOfLines={1}>{topic}</Text>
      {/* Mini score bar */}
      <View style={topicRow.track}>
        {pct !== null && (
          <View style={[topicRow.fill, { width: `${pct}%` as any, backgroundColor: barColor }]} />
        )}
      </View>
      <Text style={topicRow.pct}>{pct !== null ? `${pct}%` : '—'}</Text>
    </View>
  );
}

const topicRow = StyleSheet.create({
  row: {
    flexDirection:    'row',
    alignItems:       'center',
    paddingVertical:  5,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  label: {
    fontFamily: font.regular,
    fontSize:   fontSize.xxs,
    color:      colors.textPrimary,
    width:      90,
  },
  track: {
    flex:            1,
    height:          4,
    backgroundColor: colors.border,
    borderRadius:    2,
    overflow:        'hidden',
  },
  fill: {
    height:       '100%',
    borderRadius: 2,
  },
  pct: {
    fontFamily: font.semiBold,
    fontSize:   fontSize.xxs,
    color:      colors.textMuted,
    width:      26,
    textAlign:  'right',
  },
});

// ─── Main component ───────────────────────────────────────────────────────────

export default function ProgressScreen() {
  const level = useLevelStore((state) => state.level);

  const [loading, setLoading]               = useState(true);
  const [masteryMap, setMasteryMap]         = useState<MasteryMap>(new Map());
  const [topicScores, setTopicScores]       = useState<TopicScoreMap>(new Map());
  const [streak, setStreak]                 = useState(0);
  const [lastActiveDate, setLastActiveDate] = useState('');
  const [weeklyCount, setWeeklyCount]       = useState(0);
  const [challengeDoneToday, setChallengeDoneToday] = useState(false);
  const [scores, setScores] = useState<Awaited<ReturnType<typeof loadAllScores>> | null>(null);

  // Reload all data whenever this screen comes into focus
  useFocusEffect(
    useCallback(() => {
      let cancelled = false;

      async function load() {
        setLoading(true);

        const [mastery, progress, allScores, topicScoreMap, weekly] = await Promise.all([
          loadMastery(),
          loadProgress(),
          loadAllScores(),
          loadTopicScores(level),
          loadActivity(7),
        ]);

        if (!cancelled) {
          setMasteryMap(mastery);
          setTopicScores(topicScoreMap);
          setStreak(progress.streakCount);
          setLastActiveDate(progress.lastActiveDate);
          setWeeklyCount(weekly);
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

  // ── Vocabulary stats ──────────────────────────────────────────────────────

  const vocab = VOCABULARY[level];
  const totalCount = vocab.length;
  // Use .state now that MasteryMap stores MasteryData objects
  const knownCount = vocab.filter(w => masteryMap.get(w.id)?.state === 'known').length;
  // "seen" = any word the user has rated at least once (known + shaky + unknown)
  const seenCount  = vocab.filter(w => masteryMap.has(w.id)).length;
  const masteryPct = totalCount > 0 ? Math.round((knownCount / totalCount) * 100) : 0;

  // ── Vocabulary by category ────────────────────────────────────────────────

  const vocabCats = [
    { key: 'noun',      label: 'Nouns' },
    { key: 'verb',      label: 'Verbs' },
    { key: 'adjective', label: 'Adjectives' },
    { key: 'other',     label: 'Other' },
  ].map(({ key, label }) => {
    const words = key === 'other'
      ? vocab.filter(w => !['noun', 'verb', 'adjective'].includes(w.partOfSpeech))
      : vocab.filter(w => w.partOfSpeech === key);
    const known = words.filter(w => masteryMap.get(w.id)?.state === 'known').length;
    const shaky = words.filter(w => masteryMap.get(w.id)?.state === 'shaky').length;
    return { label, total: words.length, known, shaky };
  });

  // ── Grammar topics — sorted by score (lowest first so weak topics surface) ──
  // Topics are sorted: attempted (by score asc) then unattempted (by exercise count desc).

  const grammarExercises = GRAMMAR[level];
  const exerciseCountMap = new Map<string, number>();
  for (const ex of grammarExercises) {
    exerciseCountMap.set(ex.topic, (exerciseCountMap.get(ex.topic) ?? 0) + 1);
  }

  const allTopics = Array.from(exerciseCountMap.keys());
  const attempted   = allTopics
    .filter(t => topicScores.has(t))
    .sort((a, b) => {
      const sa = topicScores.get(a)!;
      const sb = topicScores.get(b)!;
      const pctA = sa.bestTotal > 0 ? sa.bestScore / sa.bestTotal : 0;
      const pctB = sb.bestTotal > 0 ? sb.bestScore / sb.bestTotal : 0;
      return pctA - pctB; // lowest score first
    });
  const unattempted = allTopics
    .filter(t => !topicScores.has(t))
    .sort((a, b) => (exerciseCountMap.get(b) ?? 0) - (exerciseCountMap.get(a) ?? 0));

  const topics = [...attempted, ...unattempted].slice(0, 10);

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <View style={styles.container}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>PROGRESS</Text>
        <Text style={styles.pageSubtitle}>{level} · {totalCount} words</Text>
      </View>

      {/* ── 4 Stat Cards ── */}
      <View style={styles.statRow}>
        <StatCard
          label="STREAK"
          value={`${streak}`}
          sub={`${weeklyCount} / 7 this week · ${formatLastActive(lastActiveDate)}`}
        />
        <StatCard
          label="VOCABULARY"
          value={`${knownCount} / ${totalCount}`}
          sub={`${seenCount} seen · ${masteryPct}% mastered`}
        />
        <StatCard
          label="GRAMMAR"
          value={pct(scores.grammar)}
          sub={scores.grammar.sessionsCompleted > 0
            ? `${scores.grammar.sessionsCompleted} sessions`
            : 'not started'}
        />
        <StatCard
          label="CHALLENGE"
          value={challengeDoneToday ? 'DONE' : '—'}
          sub={challengeDoneToday ? 'completed today' : 'pending'}
          accent={challengeDoneToday ? colors.success : undefined}
        />
      </View>

      {/* ── Bottom: 3 cards side by side ── */}
      <View style={styles.bottomRow}>

        {/* Card 1: Section Scores in 2-column grid */}
        <View style={[styles.card, styles.scoresCard]}>
          <Text style={[labelStyle, styles.cardLabel]}>SECTION SCORES</Text>
          <View style={styles.scoresGrid}>

            {/* Left column */}
            <View style={styles.scoresCol}>
              <MiniScoreRow label="Grammar"    value={pct(scores.grammar)} />
              <MiniScoreRow label="Reading"       value={pct(scores.exam_reading)} />
              <MiniScoreRow label="Comprehension" value={sess(scores.exam_comprehension)} />
              <MiniScoreRow label="Listening"     value={pct(scores.exam_listening)} />
              <MiniScoreRow label="Writing"       value={sess(scores.exam_writing)} isLast />
            </View>

            {/* Vertical divider */}
            <View style={styles.scoresDivider} />

            {/* Right column */}
            <View style={styles.scoresCol}>
              <MiniScoreRow label="Speaking"      value={sess(scores.exam_speaking)} />
              <MiniScoreRow label="Gender Battle" value={pct(scores.game_gender_battle)} />
              <MiniScoreRow label="L. Quiz"       value={pct(scores.game_listening_quiz)} />
              <MiniScoreRow label="Word Match"    value={sess(scores.game_word_match)} />
              <MiniScoreRow label="Sentences"     value={pct(scores.game_sentence_builder)} isLast />
            </View>

          </View>
        </View>

        {/* Card 2: Vocabulary mastery by category */}
        <View style={[styles.card, styles.chartCard]}>
          <Text style={[labelStyle, styles.cardLabel]}>VOCABULARY BY CATEGORY</Text>
          {vocabCats.map((cat, i) => (
            <CategoryBar
              key={cat.label}
              label={cat.label}
              total={cat.total}
              known={cat.known}
              shaky={cat.shaky}
              isLast={i === vocabCats.length - 1}
            />
          ))}
          {/* Legend */}
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.success }]} />
              <Text style={styles.legendLabel}>Known</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.amber }]} />
              <Text style={styles.legendLabel}>Shaky</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.border }]} />
              <Text style={styles.legendLabel}>Unknown</Text>
            </View>
          </View>
        </View>

        {/* Card 3: Grammar topics with best score bars */}
        <View style={[styles.card, styles.chartCard]}>
          <Text style={[labelStyle, styles.cardLabel]}>GRAMMAR TOPICS</Text>
          {topics.map((topic, i) => (
            <TopicRow
              key={topic}
              topic={topic}
              score={topicScores.get(topic)}
              isLast={i === topics.length - 1}
            />
          ))}
          {topics.length === 0 && (
            <Text style={styles.emptyText}>No exercises yet</Text>
          )}
        </View>

      </View>

    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },

  // Root container: fills the whole page, no scroll, vertical flex column
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.xxl,
    gap: spacing.md,
  },

  // Header: title on left, subtitle on right, baseline-aligned
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.md,
  },
  pageTitle: {
    fontFamily: font.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
    letterSpacing: 0.9,
    textTransform: 'uppercase',
  },
  pageSubtitle: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },

  // 4 stat cards in a row — negative horizontal margin cancels card margins
  statRow: {
    flexDirection: 'row',
    marginHorizontal: -4,
  },

  // Bottom section: 3 cards side by side, taking all remaining vertical space
  bottomRow: {
    flex: 1,
    flexDirection: 'row',
    gap: spacing.md,
  },

  // Shared card base style
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.lg,
  },

  // Section Scores card: fixed width so the two flex charts get equal space
  scoresCard: {
    width: 340,
  },

  // Each chart card stretches to fill remaining width equally
  chartCard: {
    flex: 1,
  },

  cardLabel: {
    marginBottom: spacing.md,
  },

  // Section Scores: two equal columns with a thin divider between them
  scoresGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  scoresCol: {
    flex: 1,
  },
  scoresDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.xs,
  },

  // Legend for the category bars (Known / Shaky / Unknown)
  legend: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendLabel: {
    fontFamily: font.regular,
    fontSize: fontSize.xxs,
    color: colors.textMuted,
  },

  emptyText: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
});
