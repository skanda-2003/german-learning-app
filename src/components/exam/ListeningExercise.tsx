// ListeningExercise.tsx — Exam Prep: Listening sub-section
//
// Flow:
//   1. User taps "Generate Passage" → Gemini creates a German text + 3 questions
//   2. The passage is NOT shown — the user must listen to it
//   3. Play / Pause / Replay buttons using the browser's built-in text-to-speech (Web Speech API)
//   4. Once they've listened at least once, "Answer Questions" button appears
//   5. Same multiple-choice question flow as Reading
//   6. Done screen shows score + reveals the passage text for review

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { generateReadingPassage, ReadingQuestion } from '../../lib/gemini';
import useLevelStore from '../../store/useLevelStore';
import { saveScore } from '../../lib/scoresService';
import { colors, font, fontSize, spacing, radius } from '../../styles/theme';

// Topics to rotate through
const TOPICS = [
  'a day at school in Germany',
  'shopping at a German supermarket',
  'a phone call between friends',
  'asking for directions in a German city',
  'ordering food at a German restaurant',
  'a family weekend trip',
  'the morning routine of a student',
  'a visit to the doctor',
];

// ─── Speech helpers (web only) ────────────────────────────────────────────────

// Check if the browser supports speech synthesis
function speechAvailable(): boolean {
  return Platform.OS === 'web' && typeof window !== 'undefined' && 'speechSynthesis' in window;
}

// Speak a German text aloud. Returns the utterance so we can cancel it later.
function speakGerman(
  text: string,
  onEnd: () => void
): SpeechSynthesisUtterance | null {
  if (!speechAvailable()) return null;

  window.speechSynthesis.cancel(); // stop anything currently speaking

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'de-DE';  // German voice
  utterance.rate = 0.85;     // slightly slower so learners can follow along
  utterance.onend = onEnd;
  window.speechSynthesis.speak(utterance);
  return utterance;
}

function pauseSpeech() {
  if (speechAvailable()) window.speechSynthesis.pause();
}

function resumeSpeech() {
  if (speechAvailable()) window.speechSynthesis.resume();
}

function stopSpeech() {
  if (speechAvailable()) window.speechSynthesis.cancel();
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ListeningExercise() {
  const level = useLevelStore((state) => state.level);

  // ── State ──
  const [passage, setPassage] = useState<string | null>(null);
  const [questions, setQuestions] = useState<ReadingQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasListened, setHasListened] = useState(false); // unlocks "Answer Questions"

  // Whether the user has moved past the audio screen to the questions
  const [showingQuestions, setShowingQuestions] = useState(false);

  // Question state
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>([]);

  const isDone = questions.length > 0 && questionIndex >= questions.length;

  // ── Generate passage ──
  async function handleGenerate() {
    stopSpeech();
    setIsLoading(true);
    setError(null);
    setPassage(null);
    setQuestions([]);
    setIsPlaying(false);
    setHasListened(false);
    setShowingQuestions(false);
    setQuestionIndex(0);
    setSelectedAnswers([]);

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

  // ── Play ──
  function handlePlay() {
    if (!passage) return;
    speakGerman(passage, () => {
      setIsPlaying(false);
      setHasListened(true);
    });
    setIsPlaying(true);
    setHasListened(true); // mark as listened as soon as they press play
  }

  // ── Pause / Resume ──
  function handlePauseResume() {
    if (isPlaying) {
      pauseSpeech();
      setIsPlaying(false);
    } else {
      resumeSpeech();
      setIsPlaying(true);
    }
  }

  // ── Replay ──
  function handleReplay() {
    if (!passage) return;
    speakGerman(passage, () => {
      setIsPlaying(false);
    });
    setIsPlaying(true);
  }

  // ── Answer a question ──
  function handleAnswer(option: string) {
    setSelectedAnswers((prev) => {
      const updated = [...prev];
      updated[questionIndex] = option;
      return updated;
    });
  }

  function handleNext() {
    const nextIndex = questionIndex + 1;
    if (nextIndex >= questions.length) {
      saveScore('exam_listening', score, questions.length);
    }
    setQuestionIndex(nextIndex);
  }

  const currentQuestion = questions[questionIndex] ?? null;
  const currentAnswer = selectedAnswers[questionIndex] ?? null;
  const isAnswered = currentAnswer !== null;

  const score = questions.reduce((count, q, i) => {
    return selectedAnswers[i] === q.answer ? count + 1 : count;
  }, 0);

  // ─── Start screen ─────────────────────────────────────────────────────────
  if (!passage && !isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.sectionEmoji}>🎧</Text>
        <Text style={styles.sectionTitle}>Listening</Text>
        <Text style={styles.sectionSubtitle}>
          A short German passage will be read aloud. Listen carefully, then
          answer 3 comprehension questions.
        </Text>
        {!speechAvailable() && (
          <Text style={styles.warningText}>
            ⚠️ Your browser does not support text-to-speech. Try Chrome or Edge.
          </Text>
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}
        <TouchableOpacity style={styles.generateButton} onPress={handleGenerate}>
          <Text style={styles.generateButtonText}>Generate Passage</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ─── Loading ──────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#4fc3f7" />
        <Text style={styles.loadingText}>Generating your passage...</Text>
      </View>
    );
  }

  // ─── Done screen ──────────────────────────────────────────────────────────
  if (isDone) {
    stopSpeech();
    const percentage = Math.round((score / questions.length) * 100);
    const emoji = percentage === 100 ? '🏆' : percentage >= 67 ? '🎉' : '📚';

    return (
      <ScrollView contentContainerStyle={styles.doneContainer}>
        <Text style={styles.doneEmoji}>{emoji}</Text>
        <Text style={styles.doneTitle}>
          {score} / {questions.length} correct
        </Text>
        <Text style={styles.doneSubtitle}>{percentage}%</Text>

        {/* Reveal the passage text for review */}
        <View style={styles.passageReveal}>
          <Text style={styles.passageRevealLabel}>THE PASSAGE</Text>
          <Text style={styles.passageRevealText}>{passage}</Text>
        </View>

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

  // ─── Question screen ──────────────────────────────────────────────────────
  if (showingQuestions && currentQuestion) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* Replay button — still accessible during questions */}
        <TouchableOpacity style={styles.replayMini} onPress={handleReplay}>
          <Text style={styles.replayMiniText}>▶ Replay passage</Text>
        </TouchableOpacity>

        <Text style={styles.questionProgress}>
          Question {questionIndex + 1} of {questions.length}
        </Text>

        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>

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

          {isAnswered && (
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>
                {questionIndex + 1 < questions.length ? 'Next →' : 'See Results →'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    );
  }

  // ─── Audio controls screen ────────────────────────────────────────────────
  return (
    <View style={styles.audioContainer}>
      <Text style={styles.audioTitle}>Listen to the passage</Text>
      <Text style={styles.audioSubtitle}>
        Press play and listen carefully. You can replay as many times as you need.
      </Text>

      {/* Big play button */}
      <TouchableOpacity
        style={styles.playButton}
        onPress={isPlaying ? handlePauseResume : handlePlay}
      >
        <Text style={styles.playButtonIcon}>{isPlaying ? '⏸' : '▶'}</Text>
      </TouchableOpacity>

      <Text style={styles.audioStatus}>
        {isPlaying ? 'Playing...' : hasListened ? 'Paused — press ▶ to resume or replay' : 'Press ▶ to start'}
      </Text>

      {/* Replay button — shown after first listen */}
      {hasListened && !isPlaying && (
        <TouchableOpacity style={styles.replayButton} onPress={handleReplay}>
          <Text style={styles.replayButtonText}>↺ Replay</Text>
        </TouchableOpacity>
      )}

      {/* Answer Questions button — unlocked after first play */}
      {hasListened && (
        <TouchableOpacity
          style={styles.answerButton}
          onPress={() => {
            stopSpeech();
            setIsPlaying(false);
            setShowingQuestions(true);
          }}
        >
          <Text style={styles.answerButtonText}>Answer Questions →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    padding: spacing.xxxl, backgroundColor: colors.background,
  },
  container: { padding: spacing.xxl, paddingBottom: 40, backgroundColor: colors.background },

  sectionEmoji: { fontSize: 40, marginBottom: spacing.lg },
  sectionTitle: { fontFamily: font.bold, fontSize: fontSize.xl, color: colors.textPrimary, marginBottom: spacing.sm },
  sectionSubtitle: {
    fontFamily: font.regular, fontSize: fontSize.sm, color: colors.textSecondary,
    textAlign: 'center', lineHeight: 20, marginBottom: spacing.xl,
  },
  warningText: {
    fontFamily: font.regular, fontSize: fontSize.sm, color: colors.error,
    textAlign: 'center', marginBottom: spacing.lg, lineHeight: 18,
  },
  errorText: { fontFamily: font.regular, fontSize: fontSize.sm, color: colors.error, marginBottom: spacing.lg, textAlign: 'center' },
  generateButton: { backgroundColor: colors.textPrimary, paddingVertical: spacing.lg, paddingHorizontal: spacing.hero, borderRadius: radius.md },
  generateButtonText: { fontFamily: font.semiBold, color: colors.background, fontSize: fontSize.md },

  loadingText: { fontFamily: font.regular, marginTop: spacing.lg, fontSize: fontSize.sm, color: colors.textSecondary },

  audioContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xxxl, gap: spacing.lg },
  audioTitle: { fontFamily: font.bold, fontSize: fontSize.lg, color: colors.textPrimary },
  audioSubtitle: { fontFamily: font.regular, fontSize: fontSize.sm, color: colors.textSecondary, textAlign: 'center', lineHeight: 20 },
  playButton: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: colors.textPrimary,
    alignItems: 'center', justifyContent: 'center', marginVertical: spacing.sm,
  },
  playButtonIcon: { fontSize: 32, color: colors.background },
  audioStatus: { fontFamily: font.regular, fontSize: fontSize.sm, color: colors.textMuted },
  replayButton: {
    paddingVertical: spacing.sm, paddingHorizontal: spacing.xxl,
    borderRadius: radius.md, borderWidth: 1, borderColor: colors.border,
  },
  replayButtonText: { fontFamily: font.semiBold, fontSize: fontSize.sm, color: colors.textPrimary },
  answerButton: {
    backgroundColor: colors.accent, paddingVertical: spacing.lg,
    paddingHorizontal: spacing.hero, borderRadius: radius.md, marginTop: spacing.sm,
  },
  answerButtonText: { fontFamily: font.semiBold, color: colors.background, fontSize: fontSize.md },

  replayMini: {
    alignSelf: 'flex-start', marginBottom: spacing.lg,
    paddingVertical: spacing.xs, paddingHorizontal: spacing.md,
    borderRadius: radius.md, borderWidth: 1, borderColor: colors.border,
  },
  replayMiniText: { fontFamily: font.regular, fontSize: fontSize.sm, color: colors.textSecondary },
  questionProgress: { fontFamily: font.regular, fontSize: fontSize.xs, color: colors.textMuted, marginBottom: spacing.sm },
  questionCard: {
    backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md, padding: spacing.xl,
  },
  questionText: { fontFamily: font.semiBold, fontSize: fontSize.md, color: colors.textPrimary, marginBottom: spacing.lg, lineHeight: 24 },
  optionsContainer: { gap: spacing.sm },
  optionButton: {
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.md,
    paddingVertical: spacing.md, paddingHorizontal: spacing.lg, backgroundColor: colors.background,
  },
  optionCorrect: { borderColor: colors.success, backgroundColor: colors.successLight },
  optionIncorrect: { borderColor: colors.error, backgroundColor: colors.errorLight },
  optionText: { fontFamily: font.regular, fontSize: fontSize.md, color: colors.textPrimary },
  correctText: { color: colors.success, fontFamily: font.semiBold },
  incorrectText: { color: colors.error },
  nextButton: {
    alignSelf: 'flex-end', marginTop: spacing.lg,
    backgroundColor: colors.textPrimary, paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl, borderRadius: radius.md,
  },
  nextButtonText: { fontFamily: font.semiBold, color: colors.background, fontSize: fontSize.sm },

  doneContainer: { padding: spacing.xxl, paddingBottom: 40, alignItems: 'center', backgroundColor: colors.background },
  doneEmoji: { fontSize: 40, marginBottom: spacing.lg },
  doneTitle: { fontFamily: font.bold, fontSize: fontSize.xxl, color: colors.textPrimary, marginBottom: spacing.xs },
  doneSubtitle: { fontFamily: font.regular, fontSize: fontSize.md, color: colors.textSecondary, marginBottom: spacing.xxl },
  passageReveal: {
    width: '100%', backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md, padding: spacing.lg, marginBottom: spacing.xl,
    borderWidth: 1, borderColor: colors.border,
  },
  passageRevealLabel: {
    fontFamily: font.semiBold, fontSize: fontSize.xxs, color: colors.textMuted,
    letterSpacing: 0.9, textTransform: 'uppercase', marginBottom: spacing.sm,
  },
  passageRevealText: { fontFamily: font.regular, fontSize: fontSize.md, color: colors.textPrimary, lineHeight: 24 },
  reviewCard: { width: '100%', borderRadius: radius.md, padding: spacing.lg, marginBottom: spacing.sm, borderWidth: 1 },
  reviewCorrect: { backgroundColor: colors.successLight, borderColor: colors.success },
  reviewIncorrect: { backgroundColor: colors.errorLight, borderColor: colors.error },
  reviewQuestion: { fontFamily: font.semiBold, fontSize: fontSize.sm, color: colors.textPrimary, marginBottom: spacing.xs },
  reviewAnswer: { fontFamily: font.regular, fontSize: fontSize.sm },
  reviewCorrectAnswer: { fontFamily: font.regular, fontSize: fontSize.sm, color: colors.success, marginTop: spacing.xs },
});
