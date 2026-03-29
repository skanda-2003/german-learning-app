// grammar.tsx — Grammar Exercises screen
//
// Flow:
//   1. Topic selector — pick "All topics" or a specific topic to drill
//   2. Exercises shown one at a time via ExerciseCard
//   3. Progress bar + "X / Y" counter at the top
//   4. Score tracker (correct / total answered) updates after each exercise
//   5. End screen with final score and options to retry or pick another topic

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import useLevelStore from '../src/store/useLevelStore';
import { GRAMMAR, GrammarExercise } from '../src/data/grammar';
import ExerciseCard from '../src/components/ExerciseCard';
import { generateGrammarExercises } from '../src/lib/gemini';
import { saveScore } from '../src/lib/scoresService';
import {
  colors, font, fontSize, spacing, radius,
  labelStyle, progressTrackStyle,
} from '../src/styles/theme';

// ─── Types ─────────────────────────────────────────────────────────────────────

type Screen = 'topic-select' | 'exercise' | 'done';

// ─── Component ────────────────────────────────────────────────────────────────

export default function GrammarScreen() {
  const level = useLevelStore((state) => state.level);
  const allExercises = GRAMMAR[level];

  const [screen, setScreen] = useState<Screen>('topic-select');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [extraExercises, setExtraExercises] = useState<GrammarExercise[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);

  const topics: string[] = useMemo(() => {
    const seen = new Set<string>();
    const result: string[] = [];
    for (const ex of allExercises) {
      if (!seen.has(ex.topic)) { seen.add(ex.topic); result.push(ex.topic); }
    }
    return result;
  }, [allExercises]);

  const exercises: GrammarExercise[] = useMemo(() => {
    const base = selectedTopic === null
      ? allExercises
      : allExercises.filter((ex) => ex.topic === selectedTopic);
    return [...base, ...extraExercises];
  }, [allExercises, selectedTopic, extraExercises]);

  const totalExercises = exercises.length;
  const currentExercise = exercises[currentIndex] ?? null;

  function startTopic(topic: string | null) {
    setSelectedTopic(topic);
    setCurrentIndex(0);
    setCorrectCount(0);
    setExtraExercises([]);
    setGenerateError(null);
    setScreen('exercise');
  }

  async function handleGenerateMore() {
    setIsGenerating(true);
    setGenerateError(null);
    const topicForGemini =
      selectedTopic ?? topics[Math.floor(Math.random() * topics.length)] ?? 'German A1 grammar';
    const raw = await generateGrammarExercises(topicForGemini, level);
    if (raw.length === 0) {
      setGenerateError('Could not generate exercises right now. Try again.');
      setIsGenerating(false);
      return;
    }
    const newExercises: GrammarExercise[] = raw.map((ex, i) => ({
      id: `gemini_${Date.now()}_${i}`,
      topic: topicForGemini,
      type: ex.type,
      question: ex.question,
      options: ex.options,
      answer: ex.answer,
      explanation: ex.explanation,
    }));
    const startIndex = exercises.length;
    setExtraExercises((prev) => [...prev, ...newExercises]);
    setCurrentIndex(startIndex);
    setIsGenerating(false);
    setScreen('exercise');
  }

  function handleNext(wasCorrect: boolean) {
    const newCorrectCount = wasCorrect ? correctCount + 1 : correctCount;
    if (wasCorrect) setCorrectCount(newCorrectCount);
    const nextIndex = currentIndex + 1;
    if (nextIndex >= totalExercises) {
      saveScore('grammar', newCorrectCount, totalExercises);
      setScreen('done');
    } else {
      setCurrentIndex(nextIndex);
    }
  }

  function goToTopicSelect() {
    setScreen('topic-select');
    setSelectedTopic(null);
    setCurrentIndex(0);
    setCorrectCount(0);
    setExtraExercises([]);
    setGenerateError(null);
  }

  function retry() {
    setCurrentIndex(0);
    setCorrectCount(0);
    setScreen('exercise');
  }

  // ─── Empty state ──────────────────────────────────────────────────────────
  if (allExercises.length === 0) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.emptyTitle}>{level} exercises coming soon.</Text>
        <Text style={styles.emptySubtitle}>Switch to A1 to start practising.</Text>
      </View>
    );
  }

  // ─── Topic selector ───────────────────────────────────────────────────────
  if (screen === 'topic-select') {
    return (
      <ScrollView contentContainerStyle={styles.topicContainer}>
        <Text style={styles.pageTitle}>Grammar Exercises</Text>
        <Text style={styles.pageSubtitle}>
          {allExercises.length} exercises across {topics.length} topics
        </Text>

        {/* All Topics row */}
        <TouchableOpacity style={[styles.topicRow, styles.topicRowAll]} onPress={() => startTopic(null)}>
          <View style={styles.topicRowLeft}>
            <Text style={styles.topicRowTitle}>All Topics</Text>
            <Text style={styles.topicRowCount}>{allExercises.length} exercises</Text>
          </View>
          <Text style={styles.topicArrow}>→</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Individual topics */}
        {topics.map((topic) => {
          const count = allExercises.filter((ex) => ex.topic === topic).length;
          return (
            <TouchableOpacity
              key={topic}
              style={styles.topicRow}
              onPress={() => startTopic(topic)}
            >
              <View style={styles.topicRowLeft}>
                <Text style={styles.topicRowTitle}>{topic}</Text>
                <Text style={styles.topicRowCount}>{count} exercises</Text>
              </View>
              <Text style={styles.topicArrow}>→</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }

  // ─── Done screen ──────────────────────────────────────────────────────────
  if (screen === 'done') {
    const percentage = totalExercises > 0
      ? Math.round((correctCount / totalExercises) * 100)
      : 0;

    return (
      <View style={styles.centeredContainer}>
        <Text style={[labelStyle, { marginBottom: spacing.sm }]}>
          {selectedTopic ?? 'All Topics'}
        </Text>
        <Text style={styles.doneScore}>{percentage}%</Text>
        <Text style={styles.doneFraction}>{correctCount} / {totalExercises} correct</Text>

        <View style={styles.doneButtons}>
          <TouchableOpacity style={styles.primaryButton} onPress={retry}>
            <Text style={styles.primaryButtonText}>Try Again</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryButton, isGenerating && styles.buttonDisabled]}
            onPress={handleGenerateMore}
            disabled={isGenerating}
          >
            {isGenerating
              ? <ActivityIndicator size="small" color={colors.textPrimary} />
              : <Text style={styles.secondaryButtonText}>✨ Generate More</Text>
            }
          </TouchableOpacity>

          {generateError && (
            <Text style={styles.errorText}>{generateError}</Text>
          )}

          <TouchableOpacity style={styles.ghostButton} onPress={goToTopicSelect}>
            <Text style={styles.ghostButtonText}>← Choose Another Topic</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ─── Exercise screen ──────────────────────────────────────────────────────
  const progress = totalExercises > 0 ? currentIndex / totalExercises : 0;

  return (
    <ScrollView contentContainerStyle={styles.exerciseContainer}>

      {/* Header */}
      <View style={styles.exerciseHeader}>
        <TouchableOpacity onPress={goToTopicSelect}>
          <Text style={styles.backText}>← Topics</Text>
        </TouchableOpacity>
        <Text style={styles.topicLabel} numberOfLines={1}>
          {selectedTopic ?? 'All Topics'}
        </Text>
      </View>

      {/* Progress */}
      <View style={styles.progressBlock}>
        <View style={styles.progressRow}>
          <Text style={styles.progressMeta}>{currentIndex + 1} / {totalExercises}</Text>
          <Text style={styles.correctMeta}>✓ {correctCount} correct</Text>
        </View>
        <View style={[progressTrackStyle, { width: '100%', maxWidth: 480 } as any]}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` as any }]} />
        </View>
      </View>

      {/* Exercise card */}
      <View style={styles.cardWrapper}>
        {currentExercise && (
          <ExerciseCard
            key={currentExercise.id}
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

  // ── Topic selector ──
  topicContainer: {
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
  },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  topicRowAll: {
    paddingVertical: spacing.xl,
    marginBottom: spacing.sm,
  },
  topicRowLeft: {
    flex: 1,
  },
  topicRowTitle: {
    fontFamily: font.semiBold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  topicRowCount: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  topicArrow: {
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textMuted,
    marginLeft: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: spacing.sm,
  },

  // ── Done screen ──
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
  doneButtons: {
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    gap: spacing.md,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: colors.textPrimary,
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.md,
    color: colors.background,
  },
  secondaryButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  ghostButton: {
    paddingVertical: spacing.sm,
  },
  ghostButtonText: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.accent,
  },
  errorText: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.error,
    textAlign: 'center',
  },

  // ── Exercise screen ──
  exerciseContainer: {
    flexGrow: 1,
    padding: spacing.xxl,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 480,
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  backText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.accent,
  },
  topicLabel: {
    flex: 1,
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
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
