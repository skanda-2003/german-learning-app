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
            {currentQuestion.options.map((option) => {
              let optionStyle = styles.optionButton;
              let textStyle = styles.optionText;

              if (isAnswered) {
                if (option === currentQuestion.answer) {
                  optionStyle = { ...styles.optionButton, ...styles.optionCorrect };
                  textStyle = { ...styles.optionText, ...styles.correctText };
                } else if (option === currentAnswer) {
                  optionStyle = { ...styles.optionButton, ...styles.optionIncorrect };
                  textStyle = { ...styles.optionText, ...styles.incorrectText };
                }
              }

              return (
                <TouchableOpacity
                  key={option}
                  style={optionStyle}
                  onPress={() => !isAnswered && handleAnswer(option)}
                  disabled={isAnswered}
                >
                  <Text style={textStyle}>{option}</Text>
                </TouchableOpacity>
              );
            })}
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
    padding: 32,
  },
  container: {
    padding: 24,
    paddingBottom: 40,
  },

  // ── Start screen ──
  sectionEmoji: { fontSize: 48, marginBottom: 16 },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 28,
  },
  errorText: {
    fontSize: 13,
    color: '#d32f2f',
    marginBottom: 16,
    textAlign: 'center',
  },
  generateButton: {
    backgroundColor: '#1a1a2e',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  generateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  // ── Loading ──
  loadingText: {
    marginTop: 16,
    fontSize: 14,
    color: '#888888',
  },

  // ── Passage ──
  passageCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  passageLabel: {
    fontSize: 11,
    color: '#4fc3f7',
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 10,
  },
  passageText: {
    fontSize: 16,
    color: '#1a1a2e',
    lineHeight: 26,
  },

  // ── Question ──
  questionProgress: {
    fontSize: 12,
    color: '#aaaaaa',
    marginBottom: 10,
  },
  questionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 16,
    lineHeight: 24,
  },
  optionsContainer: {
    gap: 10,
  },
  optionButton: {
    borderWidth: 1.5,
    borderColor: '#dddddd',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fafafa',
  },
  optionCorrect: {
    borderColor: '#a5d6a7',
    backgroundColor: '#e8f5e9',
  },
  optionIncorrect: {
    borderColor: '#ef9a9a',
    backgroundColor: '#ffebee',
  },
  optionText: {
    fontSize: 15,
    color: '#1a1a2e',
  },
  correctText: { color: '#388e3c' },
  incorrectText: { color: '#d32f2f' },

  nextButton: {
    alignSelf: 'flex-end',
    marginTop: 16,
    backgroundColor: '#1a1a2e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },

  // ── Done screen ──
  doneContainer: {
    padding: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  doneEmoji: { fontSize: 52, marginBottom: 12 },
  doneTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  doneSubtitle: {
    fontSize: 15,
    color: '#888888',
    marginBottom: 28,
  },
  reviewCard: {
    width: '100%',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1.5,
  },
  reviewCorrect: {
    backgroundColor: '#e8f5e9',
    borderColor: '#a5d6a7',
  },
  reviewIncorrect: {
    backgroundColor: '#ffebee',
    borderColor: '#ef9a9a',
  },
  reviewQuestion: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 6,
  },
  reviewAnswer: {
    fontSize: 13,
  },
  reviewCorrectAnswer: {
    fontSize: 13,
    color: '#388e3c',
    marginTop: 4,
  },
});
