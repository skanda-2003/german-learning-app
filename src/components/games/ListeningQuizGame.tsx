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
import { saveScore } from '../../lib/scoresService';
import { colors, font, fontSize, spacing, radius } from '../../styles/theme';

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
    if (nextIndex >= TOTAL_ROUNDS) {
      saveScore('game_listening_quiz', correctCount, TOTAL_ROUNDS);
    }
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

      {/* Word reveal + extra info — shown after answering */}
      {isAnswered && currentWord && (
        <View style={styles.revealBox}>
          <Text style={styles.revealedWord}>{currentWord.german}</Text>
          {/* Plural shown below for nouns */}
          {currentWord.plural && (
            <Text style={styles.pluralInfo}>pl. {currentWord.plural}</Text>
          )}
          {/* Conjugations shown below for verbs */}
          {currentWord.conjugations && (
            <View style={styles.conjGrid}>
              {(
                [
                  ['ich', currentWord.conjugations.ich],
                  ['du',  currentWord.conjugations.du],
                  ['er/sie/es', currentWord.conjugations.er],
                  ['wir', currentWord.conjugations.wir],
                  ['ihr', currentWord.conjugations.ihr],
                  ['sie/Sie', currentWord.conjugations.sie],
                ] as [string, string][]
              ).map(([pronoun, form]) => (
                <View key={pronoun} style={styles.conjRow}>
                  <Text style={styles.conjPronoun}>{pronoun}</Text>
                  <Text style={styles.conjForm}>{form}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}

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
    padding: spacing.xxl,
    backgroundColor: colors.background,
    alignItems: 'center',
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 480,
    marginBottom: spacing.md,
  },
  backText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.accent,
  },
  headerTitle: {
    fontFamily: font.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
  },
  headerProgress: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },

  // ── Progress bar ──
  progressBarBackground: {
    width: '100%',
    maxWidth: 480,
    height: 3,
    backgroundColor: colors.border,
    borderRadius: radius.sm,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: radius.sm,
  },

  scoreLabel: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.success,
    alignSelf: 'flex-end',
    width: '100%',
    maxWidth: 480,
    marginBottom: spacing.xxl,
    textAlign: 'right',
  },

  // ── Speaker card ──
  speakerCard: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.xxl,
    alignItems: 'center',
    width: '100%',
    maxWidth: 380,
    marginBottom: spacing.xxl,
  },
  speakerHint: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  speakerButton: {
    alignItems: 'center',
  },
  speakerIcon: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  speakerLabel: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.accent,
  },

  // ── Options ──
  optionsContainer: {
    width: '100%',
    maxWidth: 480,
    gap: spacing.sm,
  },
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
  optionWrong: {
    borderColor: colors.error,
    backgroundColor: colors.errorLight,
  },
  optionText: {
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  textCorrect: {
    fontFamily: font.semiBold,
    color: colors.success,
  },
  textWrong: {
    color: colors.error,
  },

  // ── Next button ──
  nextButton: {
    marginTop: spacing.lg,
    backgroundColor: colors.textPrimary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxxl,
    borderRadius: radius.md,
  },
  nextButtonText: {
    fontFamily: font.semiBold,
    color: colors.background,
    fontSize: fontSize.sm,
  },

  // ── Word reveal box (shown after answering) ──
  revealBox: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  revealedWord: {
    fontFamily: font.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  conjGrid: {
    width: '100%',
    marginTop: spacing.xs,
  },
  conjRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  conjPronoun: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
    width: 72,
  },
  pluralInfo: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  conjForm: {
    fontFamily: font.semiBold,
    fontSize: fontSize.xs,
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'right',
  },

  // ── Done screen ──
  doneContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxxl,
    backgroundColor: colors.background,
  },
  doneEmoji: { fontSize: 48, marginBottom: spacing.md },
  doneTitle: {
    fontFamily: font.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginBottom: spacing.xxl,
  },
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxxl,
  },
  scorePercentage: {
    fontFamily: font.bold,
    fontSize: fontSize.xxl,
    color: colors.textPrimary,
  },
  scoreDetail: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  primaryButton: {
    backgroundColor: colors.textPrimary,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.hero,
    borderRadius: radius.md,
    marginBottom: spacing.md,
  },
  primaryButtonText: {
    fontFamily: font.semiBold,
    color: colors.background,
    fontSize: fontSize.md,
  },
  secondaryButton: {
    paddingVertical: spacing.sm,
  },
  secondaryButtonText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.md,
    color: colors.accent,
  },
});