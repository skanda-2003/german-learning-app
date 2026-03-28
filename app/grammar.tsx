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

// ─── Types ─────────────────────────────────────────────────────────────────────

// The three screens the user moves through
type Screen = 'topic-select' | 'exercise' | 'done';

// ─── Component ────────────────────────────────────────────────────────────────

export default function GrammarScreen() {
  const level = useLevelStore((state) => state.level);
  const allExercises = GRAMMAR[level];

  // Which screen the user is on
  const [screen, setScreen] = useState<Screen>('topic-select');

  // The topic the user selected (null = All topics)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Index of the current exercise within the filtered list
  const [currentIndex, setCurrentIndex] = useState(0);

  // How many exercises the user got correct this session
  const [correctCount, setCorrectCount] = useState(0);

  // Gemini-generated exercises appended to the end of the list
  const [extraExercises, setExtraExercises] = useState<GrammarExercise[]>([]);

  // True while waiting for Gemini to respond
  const [isGenerating, setIsGenerating] = useState(false);

  // Error message shown if Gemini fails or returns nothing
  const [generateError, setGenerateError] = useState<string | null>(null);

  // ── Derived values ──────────────────────────────────────────────────────────

  // Unique list of topic names, in the order they first appear in the data
  const topics: string[] = useMemo(() => {
    const seen = new Set<string>();
    const result: string[] = [];
    for (const ex of allExercises) {
      if (!seen.has(ex.topic)) {
        seen.add(ex.topic);
        result.push(ex.topic);
      }
    }
    return result;
  }, [allExercises]);

  // The exercises to show — pre-written list (filtered by topic) + any Gemini-generated ones
  const exercises: GrammarExercise[] = useMemo(() => {
    const base =
      selectedTopic === null
        ? allExercises
        : allExercises.filter((ex) => ex.topic === selectedTopic);
    return [...base, ...extraExercises];
  }, [allExercises, selectedTopic, extraExercises]);

  const totalExercises = exercises.length;
  const currentExercise = exercises[currentIndex] ?? null;

  // ── Handlers ────────────────────────────────────────────────────────────────

  // User picks a topic (or All) and starts
  function startTopic(topic: string | null) {
    setSelectedTopic(topic);
    setCurrentIndex(0);
    setCorrectCount(0);
    setExtraExercises([]);   // clear any previously generated exercises
    setGenerateError(null);
    setScreen('exercise');
  }

  // Called from the done screen — asks Gemini for 5 more exercises on the same topic
  async function handleGenerateMore() {
    setIsGenerating(true);
    setGenerateError(null);

    // Pick the topic label to send to Gemini.
    // If "All Topics" was selected, pick a random topic from the list.
    const topicForGemini =
      selectedTopic ?? topics[Math.floor(Math.random() * topics.length)] ?? 'German A1 grammar';

    const raw = await generateGrammarExercises(topicForGemini, level);

    if (raw.length === 0) {
      setGenerateError('Could not generate exercises right now. Try again.');
      setIsGenerating(false);
      return;
    }

    // Convert the raw Gemini output into proper GrammarExercise objects with unique IDs
    const newExercises: GrammarExercise[] = raw.map((ex, i) => ({
      id: `gemini_${Date.now()}_${i}`,
      topic: topicForGemini,
      type: ex.type,
      question: ex.question,
      options: ex.options,
      answer: ex.answer,
      explanation: ex.explanation,
    }));

    // Append to extra exercises — the memo will update exercises automatically.
    // We also set the index to point at the first new exercise.
    const startIndex = exercises.length; // current total before appending
    setExtraExercises((prev) => [...prev, ...newExercises]);
    setCurrentIndex(startIndex);
    setIsGenerating(false);
    setScreen('exercise');
  }

  // Called by ExerciseCard when the user taps "Next"
  function handleNext(wasCorrect: boolean) {
    if (wasCorrect) setCorrectCount((prev) => prev + 1);

    const nextIndex = currentIndex + 1;
    if (nextIndex >= totalExercises) {
      // No more exercises — show the done screen
      setScreen('done');
    } else {
      setCurrentIndex(nextIndex);
    }
  }

  // Go back to topic selector and reset everything
  function goToTopicSelect() {
    setScreen('topic-select');
    setSelectedTopic(null);
    setCurrentIndex(0);
    setCorrectCount(0);
    setExtraExercises([]);
    setGenerateError(null);
  }

  // Retry the same topic from the start (keeps generated exercises in the set)
  function retry() {
    setCurrentIndex(0);
    setCorrectCount(0);
    setScreen('exercise');
  }

  // ─── Empty state (level has no exercises yet) ─────────────────────────────
  if (allExercises.length === 0) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.emptyEmoji}>🚧</Text>
        <Text style={styles.emptyTitle}>{level} Exercises Coming Soon</Text>
        <Text style={styles.emptySubtitle}>
          Switch to A1 using the level toggle at the top to start practising.
        </Text>
      </View>
    );
  }

  // ─── Topic selector ───────────────────────────────────────────────────────
  if (screen === 'topic-select') {
    return (
      <ScrollView contentContainerStyle={styles.topicContainer}>
        <Text style={styles.topicScreenTitle}>Grammar Exercises</Text>
        <Text style={styles.topicScreenSubtitle}>
          Choose a topic to practise, or do all {allExercises.length} exercises at once.
        </Text>

        {/* All Topics button */}
        <TouchableOpacity
          style={[styles.topicButton, styles.topicButtonAll]}
          onPress={() => startTopic(null)}
        >
          <View>
            <Text style={[styles.topicButtonText, styles.topicButtonAllText]}>
              All Topics
            </Text>
            <Text style={styles.topicButtonCount}>
              {allExercises.length} exercises
            </Text>
          </View>
          <Text style={styles.topicArrow}>→</Text>
        </TouchableOpacity>

        {/* Individual topic buttons */}
        {topics.map((topic) => {
          const count = allExercises.filter((ex) => ex.topic === topic).length;
          return (
            <TouchableOpacity
              key={topic}
              style={styles.topicButton}
              onPress={() => startTopic(topic)}
            >
              <View style={styles.topicButtonContent}>
                <Text style={styles.topicButtonText}>{topic}</Text>
                <Text style={styles.topicButtonCount}>{count} exercises</Text>
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
    const percentage =
      totalExercises > 0
        ? Math.round((correctCount / totalExercises) * 100)
        : 0;

    // Pick an emoji based on score
    const scoreEmoji =
      percentage === 100 ? '🏆' :
      percentage >= 80   ? '🎉' :
      percentage >= 60   ? '👍' : '📚';

    const scoreMessage =
      percentage === 100 ? 'Perfect score!' :
      percentage >= 80   ? 'Great job!' :
      percentage >= 60   ? 'Good effort!' : 'Keep practising!';

    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.doneEmoji}>{scoreEmoji}</Text>
        <Text style={styles.doneTitle}>{scoreMessage}</Text>
        <Text style={styles.doneSubtitle}>
          {selectedTopic ?? 'All Topics'}
        </Text>

        {/* Score circle */}
        <View style={styles.scoreCircle}>
          <Text style={styles.scorePercentage}>{percentage}%</Text>
          <Text style={styles.scoreDetail}>
            {correctCount} / {totalExercises} correct
          </Text>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={retry}>
          <Text style={styles.primaryButtonText}>Try Again</Text>
        </TouchableOpacity>

        {/* Generate More — calls Gemini for 5 fresh exercises */}
        <TouchableOpacity
          style={[styles.generateButton, isGenerating && styles.generateButtonDisabled]}
          onPress={handleGenerateMore}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.generateButtonText}>✨ Generate More Exercises</Text>
          )}
        </TouchableOpacity>

        {/* Error message if Gemini fails */}
        {generateError && (
          <Text style={styles.generateError}>{generateError}</Text>
        )}

        <TouchableOpacity style={styles.secondaryButton} onPress={goToTopicSelect}>
          <Text style={styles.secondaryButtonText}>Choose Another Topic</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ─── Exercise screen ──────────────────────────────────────────────────────
  // Progress 0.0 → 1.0 based on how many exercises are completed (not including current)
  const progress = totalExercises > 0 ? currentIndex / totalExercises : 0;

  return (
    <ScrollView contentContainerStyle={styles.exerciseContainer}>

      {/* ── Header: back button + topic name ── */}
      <View style={styles.exerciseHeader}>
        <TouchableOpacity onPress={goToTopicSelect} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Topics</Text>
        </TouchableOpacity>
        <Text style={styles.exerciseTopicName} numberOfLines={1}>
          {selectedTopic ?? 'All Topics'}
        </Text>
      </View>

      {/* ── Progress bar ──
          Shows how far through the exercise set the user is.
          Left: "X / Y"   Right: "✓ N correct" */}
      <View style={styles.progressContainer}>
        <View style={styles.progressRow}>
          <Text style={styles.progressText}>
            {currentIndex + 1} / {totalExercises}
          </Text>
          <Text style={styles.scoreText}>
            ✓ {correctCount} correct
          </Text>
        </View>
        <View style={styles.progressBarBackground}>
          <View
            style={[styles.progressBarFill, { width: `${progress * 100}%` }]}
          />
        </View>
      </View>

      {/* ── Exercise card ──
          key={exercise.id} remounts ExerciseCard on every new exercise,
          resetting the input and result state cleanly. */}
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

  // ── Shared ──
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: '#f5f5f5',
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
    color: '#888888',
    textAlign: 'center',
    lineHeight: 22,
  },

  // ── Topic selector ──
  topicContainer: {
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  topicScreenTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 6,
  },
  topicScreenSubtitle: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 24,
    lineHeight: 20,
  },
  topicButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: '#eeeeee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  topicButtonAll: {
    borderColor: '#4fc3f7',
    backgroundColor: '#e1f5fe',
    marginBottom: 20,
  },
  topicButtonContent: {
    flex: 1,
  },
  topicButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  topicButtonAllText: {
    fontSize: 16,
  },
  topicButtonCount: {
    fontSize: 12,
    color: '#aaaaaa',
  },
  topicArrow: {
    fontSize: 18,
    color: '#aaaaaa',
    marginLeft: 8,
  },

  // ── Exercise screen ──
  exerciseContainer: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 480,
    marginBottom: 20,
    gap: 12,
  },
  backButton: {
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  backButtonText: {
    fontSize: 14,
    color: '#4fc3f7',
    fontWeight: '600',
  },
  exerciseTopicName: {
    flex: 1,
    fontSize: 13,
    color: '#888888',
    fontWeight: '500',
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
    color: '#888888',
  },
  scoreText: {
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
    backgroundColor: '#4fc3f7',
    borderRadius: 2,
  },
  cardWrapper: {
    width: '100%',
    maxWidth: 480,
  },

  // ── Done screen ──
  doneEmoji: { fontSize: 56, marginBottom: 12 },
  doneTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  doneSubtitle: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 28,
    textAlign: 'center',
  },
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#ffffff',
    borderWidth: 4,
    borderColor: '#4fc3f7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  scorePercentage: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  scoreDetail: {
    fontSize: 12,
    color: '#888888',
    marginTop: 2,
  },
  primaryButton: {
    backgroundColor: '#1a1a2e',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 12,
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  secondaryButtonText: {
    color: '#4fc3f7',
    fontSize: 15,
    fontWeight: '600',
  },
  generateButton: {
    backgroundColor: '#7c4dff',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 8,
    minWidth: 220,
    alignItems: 'center',
  },
  generateButtonDisabled: {
    backgroundColor: '#b39ddb',
  },
  generateButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  generateError: {
    fontSize: 13,
    color: '#d32f2f',
    marginBottom: 8,
    textAlign: 'center',
  },
});