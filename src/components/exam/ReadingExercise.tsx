// ReadingExercise.tsx — Exam Prep: Reading sub-section
//
// Flow:
//   1. User taps "Generate Passage" → Gemini creates a German text + 3 questions
//   2. Passage is displayed, then questions one at a time
//   3. Each question has 4 tappable options — tap to answer
//   4. After all 3 questions: score screen with option to generate a new passage

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { generateReadingPassage, ReadingQuestion } from '../../lib/gemini';
import useLevelStore from '../../store/useLevelStore';
import { saveScore } from '../../lib/scoresService';
import { colors, font, fontSize, spacing, radius } from '../../styles/theme';


// A few simple topics rotated on each generation so the passage is never the same
const TOPICS = [
  'daily routine in Germany',
  'a visit to a German market',
  'a family dinner',
  'the weather in Germany',
  'a typical German school day',
  'a trip to Berlin',
  'shopping for groceries',
  'a birthday party',
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ReadingExercise() {
  const level = useLevelStore((state) => state.level);

  // ── State ──
  const [passage, setPassage] = useState<string | null>(null);
  const [questions, setQuestions] = useState<ReadingQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Which question the user is currently on (0, 1, 2)
  const [questionIndex, setQuestionIndex] = useState(0);

  // The option the user selected for each question — index matches questions array
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>([]);

  // True once all questions have been answered
  const isDone = questions.length > 0 && questionIndex >= questions.length;

  // ── Generate a new passage ──
  async function handleGenerate() {
    setIsLoading(true);
    setError(null);
    setPassage(null);
    setQuestions([]);
    setQuestionIndex(0);
    setSelectedAnswers([]);

    // Pick a random topic each time
    const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    const result = await generateReadingPassage(topic, level);

    if (!result.passage || result.questions.length === 0) {
      setError('Could not generate a passage right now. Please try again.');
      setIsLoading(false);
      return;
    }

    setPassage(result.passage);
    setQuestions(result.questions);
    setSelectedAnswers(new Array(result.questions.length).fill(null));
    setIsLoading(false);
  }

  // ── Answer a question ──
  function handleAnswer(option: string) {
    // Save this answer in the array
    setSelectedAnswers((prev) => {
      const updated = [...prev];
      updated[questionIndex] = option;
      return updated;
    });
  }

  // ── Move to the next question ──
  function handleNext() {
    const nextIndex = questionIndex + 1;
    if (nextIndex >= questions.length) {
      // About to show done screen — save score (fire and forget)
      saveScore('exam_reading', score, questions.length);
    }
    setQuestionIndex(nextIndex);
  }

  const currentQuestion = questions[questionIndex] ?? null;
  const currentAnswer = selectedAnswers[questionIndex] ?? null;
  const isAnswered = currentAnswer !== null;

  // Score = number of correct answers
  const score = questions.reduce((count, q, i) => {
    return selectedAnswers[i] === q.answer ? count + 1 : count;
  }, 0);

  // ─── Start screen (before generating) ────────────────────────────────────
  if (!passage && !isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.sectionEmoji}>📖</Text>
        <Text style={styles.sectionTitle}>Reading</Text>
        <Text style={styles.sectionSubtitle}>
          Gemini will generate a short German passage for you to read, then ask
          you 3 comprehension questions.
        </Text>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <TouchableOpacity style={styles.generateButton} onPress={handleGenerate}>
          <Text style={styles.generateButtonText}>Generate Passage</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ─── Loading state ────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#4fc3f7" />
        <Text style={styles.loadingText}>Generating your passage...</Text>
      </View>
    );
  }

  // ─── Done screen (all questions answered) ─────────────────────────────────
  if (isDone) {
    const percentage = Math.round((score / questions.length) * 100);
    const emoji = percentage === 100 ? '🏆' : percentage >= 67 ? '🎉' : '📚';

    return (
      <ScrollView contentContainerStyle={styles.doneContainer}>
        <Text style={styles.doneEmoji}>{emoji}</Text>
        <Text style={styles.doneTitle}>
          {score} / {questions.length} correct
        </Text>
        <Text style={styles.doneSubtitle}>{percentage}%</Text>

        {/* Review each question */}
        {questions.map((q, i) => {
          const wasCorrect = selectedAnswers[i] === q.answer;
          return (
            <View
              key={i}
              style={[
                styles.reviewCard,
                wasCorrect ? styles.reviewCorrect : styles.reviewIncorrect,
              ]}
            >
              <Text style={styles.reviewQuestion}>{q.question}</Text>
              <Text style={[styles.reviewAnswer, wasCorrect ? styles.correctText : styles.incorrectText]}>
                {wasCorrect ? '✓' : '✗'} Your answer: {selectedAnswers[i]}
              </Text>
              {!wasCorrect && (
                <Text style={styles.reviewCorrectAnswer}>
                  Correct: {q.answer}
                </Text>
              )}
            </View>
          );
        })}

        <TouchableOpacity style={styles.generateButton} onPress={handleGenerate}>
          <Text style={styles.generateButtonText}>New Passage</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // ─── Main exercise view ───────────────────────────────────────────────────
  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* ── Passage ── */}
      <View style={styles.passageCard}>
        <Text style={styles.passageLabel}>READ</Text>
        <Text style={styles.passageText}>{passage}</Text>
      </View>

      {/* ── Question progress ── */}
      <Text style={styles.questionProgress}>
        Question {questionIndex + 1} of {questions.length}
      </Text>

      {/* ── Current question ── */}
      {currentQuestion && (
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>

          {/* Answer options */}
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  isAnswered && option === currentQuestion.answer && styles.optionCorrect,
                  isAnswered && option === currentAnswer && option !== currentQuestion.answer && styles.optionIncorrect,
                ]}
                onPress={() => !isAnswered && handleAnswer(option)}
                disabled={isAnswered}
              >
                <Text style={[
                  styles.optionText,
                  isAnswered && option === currentQuestion.answer && styles.correctText,
                  isAnswered && option === currentAnswer && option !== currentQuestion.answer && styles.incorrectText,
                ]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Next button — shown after answering */}
          {isAnswered && (
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>
                {questionIndex + 1 < questions.length ? 'Next →' : 'See Results →'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
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
  container: {
    padding: spacing.xxl,
    paddingBottom: 40,
    backgroundColor: colors.background,
  },

  sectionEmoji: { fontSize: 40, marginBottom: spacing.lg },
  sectionTitle: {
    fontFamily: font.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  sectionSubtitle: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.xxl,
  },
  errorText: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.error,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  generateButton: {
    backgroundColor: colors.textPrimary,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.hero,
    borderRadius: radius.md,
  },
  generateButtonText: {
    fontFamily: font.semiBold,
    color: colors.background,
    fontSize: fontSize.md,
  },

  loadingText: {
    fontFamily: font.regular,
    marginTop: spacing.lg,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },

  passageCard: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.xl,
    marginBottom: spacing.xxl,
  },
  passageLabel: {
    fontFamily: font.semiBold,
    fontSize: fontSize.xxs,
    color: colors.textMuted,
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  passageText: {
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    lineHeight: 26,
  },

  questionProgress: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  questionCard: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.xl,
  },
  questionText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
    lineHeight: 24,
  },
  optionsContainer: { gap: spacing.sm },
  optionButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
  },
  optionCorrect: {
    borderColor: colors.success,
    backgroundColor: colors.successLight,
  },
  optionIncorrect: {
    borderColor: colors.error,
    backgroundColor: colors.errorLight,
  },
  optionText: {
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  correctText: { color: colors.success, fontFamily: font.semiBold },
  incorrectText: { color: colors.error },

  nextButton: {
    alignSelf: 'flex-end',
    marginTop: spacing.lg,
    backgroundColor: colors.textPrimary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.md,
  },
  nextButtonText: {
    fontFamily: font.semiBold,
    color: colors.background,
    fontSize: fontSize.sm,
  },

  doneEmoji: { fontSize: 40, marginBottom: spacing.lg },
  doneContainer: {
    padding: spacing.xxl,
    paddingBottom: 40,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  doneTitle: {
    fontFamily: font.bold,
    fontSize: fontSize.xxl,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  doneSubtitle: {
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.xxl,
  },
  reviewCard: {
    width: '100%',
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    borderWidth: 1,
  },
  reviewCorrect: {
    backgroundColor: colors.successLight,
    borderColor: colors.success,
  },
  reviewIncorrect: {
    backgroundColor: colors.errorLight,
    borderColor: colors.error,
  },
  reviewQuestion: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  reviewAnswer: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
  },
  reviewCorrectAnswer: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.success,
    marginTop: spacing.xs,
  },
});
