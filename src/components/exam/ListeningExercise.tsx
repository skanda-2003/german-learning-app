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
  sectionTitle: { fontSize: 24, fontWeight: 'bold', color: '#1a1a2e', marginBottom: 10 },
  sectionSubtitle: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  warningText: {
    fontSize: 13,
    color: '#e65100',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 18,
  },
  errorText: { fontSize: 13, color: '#d32f2f', marginBottom: 16, textAlign: 'center' },
  generateButton: {
    backgroundColor: '#1a1a2e',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  generateButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },

  // ── Loading ──
  loadingText: { marginTop: 16, fontSize: 14, color: '#888888' },

  // ── Audio controls ──
  audioContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 16,
  },
  audioTitle: { fontSize: 20, fontWeight: 'bold', color: '#1a1a2e' },
  audioSubtitle: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 20,
  },
  playButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  playButtonIcon: { fontSize: 36, color: '#ffffff' },
  audioStatus: { fontSize: 13, color: '#aaaaaa' },
  replayButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#cccccc',
  },
  replayButtonText: { fontSize: 14, color: '#555555', fontWeight: '600' },
  answerButton: {
    backgroundColor: '#4fc3f7',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 8,
  },
  answerButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },

  // ── Questions ──
  replayMini: {
    alignSelf: 'flex-start',
    marginBottom: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dddddd',
    backgroundColor: '#ffffff',
  },
  replayMiniText: { fontSize: 13, color: '#555555' },
  questionProgress: { fontSize: 12, color: '#aaaaaa', marginBottom: 10 },
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
  optionsContainer: { gap: 10 },
  optionButton: {
    borderWidth: 1.5,
    borderColor: '#dddddd',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fafafa',
  },
  optionCorrect: { borderColor: '#a5d6a7', backgroundColor: '#e8f5e9' },
  optionIncorrect: { borderColor: '#ef9a9a', backgroundColor: '#ffebee' },
  optionText: { fontSize: 15, color: '#1a1a2e' },
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
  nextButtonText: { color: '#ffffff', fontSize: 14, fontWeight: '600' },

  // ── Done screen ──
  doneContainer: { padding: 24, paddingBottom: 40, alignItems: 'center' },
  doneEmoji: { fontSize: 52, marginBottom: 12 },
  doneTitle: { fontSize: 26, fontWeight: 'bold', color: '#1a1a2e', marginBottom: 4 },
  doneSubtitle: { fontSize: 15, color: '#888888', marginBottom: 24 },
  passageReveal: {
    width: '100%',
    backgroundColor: '#f0f4ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#c5cae9',
  },
  passageRevealLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#7986cb',
    letterSpacing: 1,
    marginBottom: 8,
  },
  passageRevealText: { fontSize: 15, color: '#1a1a2e', lineHeight: 24 },
  reviewCard: {
    width: '100%',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1.5,
  },
  reviewCorrect: { backgroundColor: '#e8f5e9', borderColor: '#a5d6a7' },
  reviewIncorrect: { backgroundColor: '#ffebee', borderColor: '#ef9a9a' },
  reviewQuestion: { fontSize: 14, fontWeight: '600', color: '#1a1a2e', marginBottom: 6 },
  reviewAnswer: { fontSize: 13 },
  reviewCorrectAnswer: { fontSize: 13, color: '#388e3c', marginTop: 4 },
});
