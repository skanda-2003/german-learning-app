// ListeningQuizGame.tsx — Listening Quiz mini game
//
// Flow:
//   1. 10 random words are picked from the vocabulary
//   2. The German word is spoken aloud using the browser's text-to-speech
//   3. The user sees 4 English options (1 correct + 3 random)
//   4. Tapping the correct one turns it green; wrong turns red (correct also revealed)
//   5. "Next" button advances; after 10 rounds → done screen

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Word } from '../../data/vocabulary';

// ─── Props ─────────────────────────────────────────────────────────────────────

type Props = {
  words: Word[];
  onExit: () => void;
};

// ─── Constants ─────────────────────────────────────────────────────────────────

const TOTAL_ROUNDS = 10;

// ─── Helpers ───────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// Build 4 answer options: 1 correct + 3 random wrong ones from the vocabulary
function buildOptions(correct: Word, allWords: Word[]): Word[] {
  const wrong = shuffle(allWords.filter(w => w.id !== correct.id)).slice(0, 3);
  return shuffle([correct, ...wrong]);
}

// Speak a German word using the browser's built-in text-to-speech
function speakGerman(text: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel(); // stop anything currently playing
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'de-DE';
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ListeningQuizGame({ words, onExit }: Props) {
  // Pick 10 random words for this session
  const [roundWords] = useState<Word[]>(() => shuffle(words).slice(0, TOTAL_ROUNDS));

  // Which round we're on (0–9)
  const [currentIndex, setCurrentIndex] = useState(0);

  // The 4 answer options for the current word
  const [options, setOptions] = useState<Word[]>(() =>
    buildOptions(roundWords[0], words)
  );

  // ID of the option the user tapped (null = not yet answered)
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // How many the user got right
  const [correctCount, setCorrectCount] = useState(0);

  const isDone = currentIndex >= TOTAL_ROUNDS;
  const currentWord = roundWords[currentIndex] ?? null;
  const isAnswered = selectedId !== null;

  // ── Speak the word whenever the current word changes ──
  useEffect(() => {
    if (currentWord) speakGerman(currentWord.german);
  }, [currentIndex]);

  // ── User taps an option ──
  function handleOptionPress(word: Word) {
    if (isAnswered) return;
    if (word.id === currentWord?.id) setCorrectCount(prev => prev + 1);
    setSelectedId(word.id);
  }

  // ── Advance to next round ──
  function handleNext() {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setSelectedId(null);
    if (nextIndex < TOTAL_ROUNDS) {
      setOptions(buildOptions(roundWords[nextIndex], words));
    }
  }

  // ── Option button style ──
  function optionStyle(word: Word) {
    if (!isAnswered) return styles.optionButton;
    if (word.id === currentWord?.id)                      return [styles.optionButton, styles.optionCorrect];
    if (word.id === selectedId && word.id !== currentWord?.id) return [styles.optionButton, styles.optionWrong];
    return styles.optionButton;
  }

  function optionTextStyle(word: Word) {
    if (!isAnswered) return styles.optionText;
    if (word.id === currentWord?.id) return [styles.optionText, styles.textCorrect];
    if (word.id === selectedId)      return [styles.optionText, styles.textWrong];
    return styles.optionText;
  }

  // ─── Done screen ─────────────────────────────────────────────────────────────
  if (isDone || !currentWord) {
    const percentage = Math.round((correctCount / TOTAL_ROUNDS) * 100);
    const emoji =
      percentage === 100 ? '🏆' :
      percentage >= 80   ? '🎉' :
      percentage >= 60   ? '👍' : '📚';
    const message =
      percentage === 100 ? 'Perfect!' :
      percentage >= 80   ? 'Great listening!' :
      percentage >= 60   ? 'Good effort!' : 'Keep practising!';

    return (
      <View style={styles.doneContainer}>
        <Text style={styles.doneEmoji}>{emoji}</Text>
        <Text style={styles.doneTitle}>{message}</Text>

        <View style={styles.scoreCircle}>
          <Text style={styles.scorePercentage}>{percentage}%</Text>
          <Text style={styles.scoreDetail}>{correctCount} / {TOTAL_ROUNDS} correct</Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => {
            const fresh = shuffle(words).slice(0, TOTAL_ROUNDS);
            setCurrentIndex(0);
            setSelectedId(null);
            setCorrectCount(0);
            setOptions(buildOptions(fresh[0], words));
          }}
        >
          <Text style={styles.primaryButtonText}>Play Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={onExit}>
          <Text style={styles.secondaryButtonText}>← Back to Games</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ─── Game screen ─────────────────────────────────────────────────────────────
  const progress = currentIndex / TOTAL_ROUNDS;

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onExit}>
          <Text style={styles.backText}>← Games</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Listening Quiz</Text>
        <Text style={styles.headerProgress}>{currentIndex + 1} / {TOTAL_ROUNDS}</Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progress * 100}%` as any }]} />
      </View>

      <Text style={styles.scoreLabel}>✓ {correctCount} correct</Text>

      {/* Speaker card — tap to replay the word */}
      <View style={styles.speakerCard}>
        <Text style={styles.speakerHint}>What does this word mean?</Text>
        <TouchableOpacity
          style={styles.speakerButton}
          onPress={() => speakGerman(currentWord.german)}
        >
          <Text style={styles.speakerIcon}>🔊</Text>
          <Text style={styles.speakerLabel}>Tap to replay</Text>
        </TouchableOpacity>
      </View>

      {/* Answer options */}
      <View style={styles.optionsContainer}>
        {options.map(word => (
          <TouchableOpacity
            key={word.id}
            style={optionStyle(word)}
            onPress={() => handleOptionPress(word)}
            disabled={isAnswered}
          >
            <Text style={optionTextStyle(word)}>{word.english}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Next button — only shown after answering */}
      {isAnswered && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentIndex + 1 < TOTAL_ROUNDS ? 'Next →' : 'See Results'}
          </Text>
        </TouchableOpacity>
      )}

    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 480,
    marginBottom: 12,
  },
  backText: {
    fontSize: 14,
    color: '#4fc3f7',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  headerProgress: {
    fontSize: 14,
    color: '#888',
    fontWeight: '600',
  },

  // ── Progress bar ──
  progressBarBackground: {
    width: '100%',
    maxWidth: 480,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4fc3f7',
    borderRadius: 2,
  },

  scoreLabel: {
    fontSize: 13,
    color: '#4caf50',
    fontWeight: '600',
    alignSelf: 'flex-end',
    width: '100%',
    maxWidth: 480,
    marginBottom: 24,
    textAlign: 'right',
  },

  // ── Speaker card ──
  speakerCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 380,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  speakerHint: {
    fontSize: 13,
    color: '#aaa',
    marginBottom: 16,
  },
  speakerButton: {
    alignItems: 'center',
  },
  speakerIcon: {
    fontSize: 52,
    marginBottom: 8,
  },
  speakerLabel: {
    fontSize: 13,
    color: '#4fc3f7',
    fontWeight: '600',
  },

  // ── Options ──
  optionsContainer: {
    width: '100%',
    maxWidth: 480,
    gap: 10,
  },
  optionButton: {
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  optionCorrect: {
    borderColor: '#a5d6a7',
    backgroundColor: '#e8f5e9',
  },
  optionWrong: {
    borderColor: '#ef9a9a',
    backgroundColor: '#ffebee',
  },
  optionText: {
    fontSize: 15,
    color: '#1a1a2e',
    textAlign: 'center',
  },
  textCorrect: {
    color: '#388e3c',
    fontWeight: '600',
  },
  textWrong: {
    color: '#d32f2f',
  },

  // ── Next button ──
  nextButton: {
    marginTop: 16,
    backgroundColor: '#1a1a2e',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },

  // ── Done screen ──
  doneContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: '#f5f5f5',
  },
  doneEmoji: { fontSize: 56, marginBottom: 12 },
  doneTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 28,
  },
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#fff',
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
    color: '#888',
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
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 10,
  },
  secondaryButtonText: {
    color: '#4fc3f7',
    fontSize: 15,
    fontWeight: '600',
  },
});