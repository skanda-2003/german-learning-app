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
      setCurrentIndex(prev => prev + 1);
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
    marginBottom: 32,
    textAlign: 'right',
  },

  // ── Noun card ──
  nounCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 380,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  nounText: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  nounEnglish: {
    fontSize: 16,
    color: '#888',
  },

  // ── Result feedback ──
  resultText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },

  // ── Gender buttons ──
  genderRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 8,
    width: '100%',
    maxWidth: 380,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 22,
    borderRadius: 16,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  genderCorrect: {
    backgroundColor: '#388e3c',
  },
  genderWrong: {
    backgroundColor: '#d32f2f',
  },
  genderDimmed: {
    backgroundColor: '#b0b0b0',
  },
  genderButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },

  // ── Shared text colours ──
  textCorrect: { color: '#388e3c' },
  textWrong:   { color: '#d32f2f' },
  textDimmed:  { color: '#aaa' },

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