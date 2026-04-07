// GenderBattleGame.tsx — Gender Battle mini game
//
// Flow:
//   1. Nouns are filtered from the vocabulary (only words with a gender)
//   2. A noun is shown WITHOUT its article — the user must pick der / die / das
//   3. Correct → green flash, score increments, next word
//   4. Wrong   → red flash, correct article shown, next word
//   5. After 10 rounds → done screen with score

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Word } from '../../data/vocabulary';
import { saveScore } from '../../lib/scoresService';
import { saveMistake } from '../../lib/mistakeService';
import { colors, font, fontSize, spacing, radius } from '../../styles/theme';

// ─── Props ─────────────────────────────────────────────────────────────────────

type Props = {
  words: Word[];
  onExit: () => void;
};

// ─── Constants ─────────────────────────────────────────────────────────────────

const TOTAL_ROUNDS = 10;
const RESULT_DISPLAY_MS = 900; // how long to show correct/wrong before moving on

// ─── Helpers ───────────────────────────────────────────────────────────────────

// Remove the leading article ("der ", "die ", "das ") from a German noun
// so we can show just the noun for the user to guess the gender
function stripArticle(german: string): string {
  return german.replace(/^(der|die|das)\s+/i, '').trim();
}

// Return a shuffled copy of an array
function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function GenderBattleGame({ words, onExit }: Props) {
  // Filter to only nouns that have a gender assigned
  const nouns = words.filter(w => w.partOfSpeech === 'noun' && w.gender !== null);

  // Pick 10 random nouns for this game session
  const [roundNouns] = useState<Word[]>(() => shuffle(nouns).slice(0, TOTAL_ROUNDS));

  // Which noun we're currently on (0-9)
  const [currentIndex, setCurrentIndex] = useState(0);

  // How many the user got right
  const [correctCount, setCorrectCount] = useState(0);

  // 'correct' | 'wrong' | null — shown briefly after each guess
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);

  // The gender the user tapped (used to highlight the button they picked)
  const [pickedGender, setPickedGender] = useState<string | null>(null);

  // True when all 10 rounds are done
  const isDone = currentIndex >= TOTAL_ROUNDS;

  const currentNoun = roundNouns[currentIndex] ?? null;

  // ── After showing result, auto-advance after RESULT_DISPLAY_MS ──
  useEffect(() => {
    if (result === null) return;

    const timer = setTimeout(() => {
      const nextIndex = currentIndex + 1;
      if (nextIndex >= TOTAL_ROUNDS) {
        saveScore('game_gender_battle', correctCount, TOTAL_ROUNDS);
      }
      setCurrentIndex(nextIndex);
      setResult(null);
      setPickedGender(null);
    }, RESULT_DISPLAY_MS);

    return () => clearTimeout(timer);
  }, [result]);

  // ── User taps a gender button ──
  function handleGenderPick(gender: string) {
    if (result !== null) return; // already answered, waiting to advance

    setPickedGender(gender);
    if (gender === currentNoun?.gender) {
      setCorrectCount(prev => prev + 1);
      setResult('correct');
    } else {
      // Log the mistake so the Insights "GENDER ERRORS" section can analyse it.
      // question = the noun shown, correctAnswer = the right gender.
      saveMistake(
        'game_gender_battle',
        stripArticle(currentNoun.german),
        gender,
        currentNoun.gender ?? ''
      );
      setResult('wrong');
    }
  }

  // ── Get style for each gender button after answering ──
  function buttonStyle(gender: string) {
    if (result === null) return styles.genderButton;
    if (gender === currentNoun?.gender) return [styles.genderButton, styles.genderCorrect];
    if (gender === pickedGender)        return [styles.genderButton, styles.genderWrong];
    return [styles.genderButton, styles.genderDimmed];
  }

  function buttonTextStyle(gender: string) {
    if (result === null) return styles.genderButtonText;
    if (gender === currentNoun?.gender) return [styles.genderButtonText, styles.textCorrect];
    if (gender === pickedGender)        return [styles.genderButtonText, styles.textWrong];
    return [styles.genderButtonText, styles.textDimmed];
  }

  // ─── Done screen ─────────────────────────────────────────────────────────────
  if (isDone || !currentNoun) {
    const percentage = Math.round((correctCount / TOTAL_ROUNDS) * 100);
    const emoji =
      percentage === 100 ? '🏆' :
      percentage >= 80   ? '🎉' :
      percentage >= 60   ? '👍' : '📚';
    const message =
      percentage === 100 ? 'Perfect!' :
      percentage >= 80   ? 'Great job!' :
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
            setCurrentIndex(0);
            setCorrectCount(0);
            setResult(null);
            setPickedGender(null);
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
        <Text style={styles.headerTitle}>Gender Battle</Text>
        <Text style={styles.headerProgress}>{currentIndex + 1} / {TOTAL_ROUNDS}</Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progress * 100}%` as any }]} />
      </View>

      {/* Score */}
      <Text style={styles.scoreLabel}>✓ {correctCount} correct</Text>

      {/* Noun to guess */}
      <View style={styles.nounCard}>
        <Text style={styles.nounText}>{stripArticle(currentNoun.german)}</Text>
        <Text style={styles.nounEnglish}>{currentNoun.english}</Text>
        {/* Plural form shown below in grey — always visible as extra vocab info */}
        {currentNoun.plural && (
          <Text style={styles.pluralHint}>pl. {currentNoun.plural}</Text>
        )}
      </View>

      {/* Result feedback */}
      {result !== null && (
        <Text style={[styles.resultText, result === 'correct' ? styles.textCorrect : styles.textWrong]}>
          {result === 'correct'
            ? '✓ Correct!'
            : `✗ It's ${currentNoun.gender} — ${currentNoun.german}`}
        </Text>
      )}

      {/* Gender buttons */}
      <View style={styles.genderRow}>
        {['der', 'die', 'das'].map(gender => (
          <TouchableOpacity
            key={gender}
            style={buttonStyle(gender)}
            onPress={() => handleGenderPick(gender)}
            disabled={result !== null}
          >
            <Text style={buttonTextStyle(gender)}>{gender}</Text>
          </TouchableOpacity>
        ))}
      </View>

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
    marginBottom: spacing.xxxl,
    textAlign: 'right',
  },

  // ── Noun card ──
  nounCard: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.xxl,
    alignItems: 'center',
    width: '100%',
    maxWidth: 380,
    marginBottom: spacing.lg,
  },
  nounText: {
    fontFamily: font.bold,
    fontSize: fontSize.xxxl,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  nounEnglish: {
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  pluralHint: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: spacing.sm,
    letterSpacing: 0.3,
  },

  // ── Result feedback ──
  resultText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.md,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },

  // ── Gender buttons ──
  genderRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
    width: '100%',
    maxWidth: 380,
  },
  genderButton: {
    flex: 1,
    paddingVertical: spacing.xl,
    borderRadius: radius.md,
    backgroundColor: colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderCorrect: {
    backgroundColor: colors.success,
  },
  genderWrong: {
    backgroundColor: colors.error,
  },
  genderDimmed: {
    backgroundColor: colors.borderStrong,
  },
  genderButtonText: {
    fontFamily: font.bold,
    color: colors.background,
    fontSize: fontSize.xl,
    letterSpacing: 0.5,
  },

  // ── Shared text colours ──
  textCorrect: { color: colors.success },
  textWrong:   { color: colors.error },
  textDimmed:  { color: colors.textMuted },

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