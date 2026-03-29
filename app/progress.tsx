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
import { loadAllScores, SectionScore, SectionKey } from '../src/lib/scoresService';

// ─── Helpers ───────────────────────────────────────────────────────────────────

// Format a score as a percentage string, e.g. "80%"
function pct(score: SectionScore): string {
  if (score.bestTotal === 0) return '—';
  return `${Math.round((score.bestScore / score.bestTotal) * 100)}%`;
}

// Format a score as "N / T", e.g. "8 / 10"
function fraction(score: SectionScore): string {
  if (score.bestTotal === 0) return '—';
  return `${score.bestScore} / ${score.bestTotal}`;
}

// ─── Sub-components ────────────────────────────────────────────────────────────

// A single section row showing best score or completions
type ScoreRowProps = {
  emoji: string;
  label: string;
  score: SectionScore;
  type: 'scored' | 'completion'; // scored = show %, completion = show "N sessions"
};

function ScoreRow({ emoji, label, score, type }: ScoreRowProps) {
  const isAttempted = score.sessionsCompleted > 0;

  return (
    <View style={styles.scoreRow}>
      <Text style={styles.scoreRowEmoji}>{emoji}</Text>
      <View style={styles.scoreRowContent}>
        <Text style={styles.scoreRowLabel}>{label}</Text>
        {!isAttempted ? (
          <Text style={styles.scoreRowNotStarted}>Not started</Text>
        ) : type === 'completion' ? (
          <Text style={styles.scoreRowValue}>
            {score.sessionsCompleted} session{score.sessionsCompleted !== 1 ? 's' : ''} completed
          </Text>
        ) : (
          <Text style={styles.scoreRowValue}>
            Best: <Text style={styles.scoreRowHighlight}>{pct(score)}</Text>
            {'  '}({fraction(score)}){'  '}·{'  '}
            {score.sessionsCompleted} session{score.sessionsCompleted !== 1 ? 's' : ''}
          </Text>
        )}
      </View>
    </View>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProgressScreen() {
  const level = useLevelStore(state => state.level);
  const words = VOCABULARY[level];

  const [isLoading, setIsLoading] = useState(true);
  const [knownCount, setKnownCount] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [challengeDoneToday, setChallengeDoneToday] = useState(false);
  const [scores, setScores] = useState<Record<SectionKey, SectionScore> | null>(null);

  // Reload everything every time the tab is focused
  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);

      Promise.all([
        loadMastery(),
        loadProgress(),
        loadAllScores(),
      ]).then(([masteryMap, progress, allScores]) => {
        setKnownCount(masteryMap.size);
        setStreakCount(progress.streakCount);
        setChallengeDoneToday(progress.dailyChallengeCompletedDate === getTodayString());
        setScores(allScores);
        setIsLoading(false);
      });
    }, [])
  );

  // ─── Loading ────────────────────────────────────────────────────────────────
  if (isLoading || !scores) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#4fc3f7" />
        <Text style={styles.loadingText}>Loading your progress...</Text>
      </View>
    );
  }

  const totalWords = words.length;
  const masteryPct = totalWords > 0 ? Math.round((knownCount / totalWords) * 100) : 0;

  // ─── Main screen ────────────────────────────────────────────────────────────
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.screenTitle}>Progress</Text>
      <Text style={styles.screenSubtitle}>Level {level}</Text>

      {/* ── Streak card ── */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Daily Streak</Text>
        <View style={styles.streakRow}>
          <Text style={styles.streakFlame}>🔥</Text>
          <Text style={styles.streakCount}>{streakCount}</Text>
          <Text style={styles.streakLabel}>day{streakCount !== 1 ? 's' : ''}</Text>
        </View>
        <Text style={styles.challengeStatus}>
          {challengeDoneToday ? '✅ Challenge completed today' : '⏳ Daily challenge not done yet'}
        </Text>
      </View>

      {/* ── Vocabulary mastery card ── */}
      <View style={styles.card}>
        <View style={styles.cardTitleRow}>
          <Text style={styles.cardTitle}>Vocabulary Mastery</Text>
          <Text style={styles.masteryFraction}>{knownCount} / {totalWords}</Text>
        </View>

        {/* Progress bar */}
        <View style={styles.masteryBarBackground}>
          <View style={[styles.masteryBarFill, { width: `${masteryPct}%` as any }]} />
        </View>
        <Text style={styles.masteryPct}>{masteryPct}% of {level} vocabulary known</Text>
      </View>

      {/* ── Grammar ── */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Grammar Exercises</Text>
        <ScoreRow
          emoji="📝"
          label="Grammar"
          score={scores.grammar}
          type="scored"
        />
      </View>

      {/* ── Exam Prep ── */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Exam Prep</Text>
        <ScoreRow emoji="📖" label="Reading"  score={scores.exam_reading}  type="scored" />
        <ScoreRow emoji="🎧" label="Listening" score={scores.exam_listening} type="scored" />
        <ScoreRow emoji="✍️" label="Writing"  score={scores.exam_writing}  type="completion" />
        <ScoreRow emoji="🎤" label="Speaking"  score={scores.exam_speaking}  type="completion" />
      </View>

      {/* ── Mini Games ── */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Mini Games</Text>
        <ScoreRow emoji="⚔️" label="Gender Battle"  score={scores.game_gender_battle}  type="scored" />
        <ScoreRow emoji="🎧" label="Listening Quiz"  score={scores.game_listening_quiz} type="scored" />
        <ScoreRow emoji="🔗" label="Word Match"      score={scores.game_word_match}     type="completion" />
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
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#888',
  },

  container: {
    padding: 24,
    backgroundColor: '#f5f5f5',
    paddingBottom: 40,
  },

  screenTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  screenSubtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 24,
  },

  // ── Cards ──
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 14,
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  // ── Streak ──
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  streakFlame: { fontSize: 32 },
  streakCount: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#e65100',
  },
  streakLabel: {
    fontSize: 16,
    color: '#bf360c',
    fontWeight: '600',
  },
  challengeStatus: {
    fontSize: 13,
    color: '#888',
  },

  // ── Mastery bar ──
  masteryFraction: {
    fontSize: 13,
    color: '#888',
    fontWeight: '600',
  },
  masteryBarBackground: {
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  masteryBarFill: {
    height: '100%',
    backgroundColor: '#4fc3f7',
    borderRadius: 5,
  },
  masteryPct: {
    fontSize: 13,
    color: '#888',
  },

  // ── Score rows ──
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  scoreRowEmoji: {
    fontSize: 18,
    marginRight: 12,
    marginTop: 1,
  },
  scoreRowContent: {
    flex: 1,
  },
  scoreRowLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  scoreRowValue: {
    fontSize: 13,
    color: '#888',
  },
  scoreRowHighlight: {
    color: '#1a1a2e',
    fontWeight: '700',
  },
  scoreRowNotStarted: {
    fontSize: 13,
    color: '#ccc',
    fontStyle: 'italic',
  },
});