// SentenceBuilderGame.tsx — Sentence Builder mini game
//
// Flow:
//   1. The English translation is shown as the prompt.
//   2. German word tiles are displayed in a shuffled "bank" below.
//   3. User taps tiles to build the sentence in the answer area (top).
//   4. Tapping a placed tile removes it back to the bank.
//   5. User submits — green flash for correct, red for wrong (correct shown).
//   6. Grammar note revealed after each submission.
//   7. After 10 rounds → done screen with score.

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Word } from '../../data/vocabulary';
import { saveScore } from '../../lib/scoresService';
import { colors, font, fontSize, spacing, radius } from '../../styles/theme';
import { SENTENCE_BUILDER_DATA, SentenceEntry } from '../../data/sentenceBuilder';
import useLevelStore from '../../store/useLevelStore';

// ─── Props ─────────────────────────────────────────────────────────────────────

type Props = {
  words: Word[];   // vocabulary list (required by all games — not used directly here)
  onExit: () => void;
};

// ─── Constants ─────────────────────────────────────────────────────────────────

const TOTAL_ROUNDS = 10;

// ─── Types ─────────────────────────────────────────────────────────────────────

// Each tile carries its original position so duplicate words can be distinguished.
type WordTile = {
  word: string;
  originalIndex: number;
};

// ─── Helpers ───────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// Pick TOTAL_ROUNDS random entries from the level's pool (no repeats within a session).
// Falls back to A1 if the selected level has no sentences yet (B1/B2).
function pickEntries(pool: SentenceEntry[]): SentenceEntry[] {
  const source = pool.length > 0 ? pool : SENTENCE_BUILDER_DATA['A1'];
  return shuffle([...source]).slice(0, TOTAL_ROUNDS);
}

// Convert a SentenceEntry's words into a shuffled tile array for the bank.
function makeBankTiles(entry: SentenceEntry): WordTile[] {
  return shuffle(entry.words.map((word, i) => ({ word, originalIndex: i })));
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SentenceBuilderGame({ onExit }: Props) {
  const level = useLevelStore(state => state.level);
  const levelPool = SENTENCE_BUILDER_DATA[level];

  // ── Session state (stays for the whole game) ──────────────────────────────
  const [entries, setEntries] = useState<SentenceEntry[]>(() => pickEntries(levelPool));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // ── Round state (resets each round) ──────────────────────────────────────
  // bankTiles: tiles available to place (start shuffled, shrinks as user places tiles)
  const [bankTiles, setBankTiles] = useState<WordTile[]>(() => makeBankTiles(entries[0]));
  // answerTiles: tiles placed by the user, in order
  const [answerTiles, setAnswerTiles] = useState<WordTile[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const entry = entries[currentIndex];
  const progress = currentIndex / TOTAL_ROUNDS;

  // ── Tile interaction ──────────────────────────────────────────────────────

  // Move a tile from the bank into the answer area.
  function placeTile(tile: WordTile) {
    if (submitted) return;
    setBankTiles(prev => prev.filter(t => t.originalIndex !== tile.originalIndex));
    setAnswerTiles(prev => [...prev, tile]);
  }

  // Move a tile from the answer area back into the bank.
  function removeTile(tile: WordTile) {
    if (submitted) return;
    setAnswerTiles(prev => prev.filter(t => t.originalIndex !== tile.originalIndex));
    setBankTiles(prev => [...prev, tile]);
  }

  // ── Submit ────────────────────────────────────────────────────────────────

  function handleSubmit() {
    if (submitted) return;

    // Compare the user's word order against the correct order.
    const userAnswer = answerTiles.map(t => t.word).join(' ');
    const correctAnswer = entry.words.join(' ');
    const wasCorrect = userAnswer === correctAnswer;

    setIsCorrect(wasCorrect);
    setSubmitted(true);

    // Increment correct count here; React batches this so it's ready before Next.
    if (wasCorrect) {
      setCorrectCount(prev => prev + 1);
    }
  }

  // ── Next round / finish ───────────────────────────────────────────────────

  function handleNext() {
    const nextIndex = currentIndex + 1;

    if (nextIndex >= TOTAL_ROUNDS) {
      // Use the score as it will be after this round.
      // correctCount has already been updated by handleSubmit (separate render cycle).
      saveScore('game_sentence_builder', correctCount, TOTAL_ROUNDS);
      setIsDone(true);
    } else {
      setCurrentIndex(nextIndex);
      setBankTiles(makeBankTiles(entries[nextIndex]));
      setAnswerTiles([]);
      setSubmitted(false);
      setIsCorrect(false);
    }
  }

  // ── Reset / Play Again ────────────────────────────────────────────────────

  // Play Again — called from the done screen. We need to force new entries.
  // We keep entries as const, so we use a key trick via a wrapper component.
  // Instead, we just reset all state by reloading a new session key.
  // Simplest: accept that entries don't change on Play Again (shuffle is random anyway).
  // For a proper shuffle, the parent could unmount/remount us — for now we just reset state.
  function handlePlayAgain() {
    const newEntries = pickEntries(levelPool);
    setEntries(newEntries);
    setCurrentIndex(0);
    setCorrectCount(0);
    setIsDone(false);
    setBankTiles(makeBankTiles(newEntries[0]));
    setAnswerTiles([]);
    setSubmitted(false);
    setIsCorrect(false);
  }

  // ─── Done screen ─────────────────────────────────────────────────────────────

  if (isDone) {
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

        <TouchableOpacity style={styles.primaryButton} onPress={handlePlayAgain}>
          <Text style={styles.primaryButtonText}>Play Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={onExit}>
          <Text style={styles.secondaryButtonText}>← Back to Games</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ─── Game screen ─────────────────────────────────────────────────────────────

  // Determine the colour of the answer area border after submission.
  const answerBorderColor =
    !submitted ? colors.border :
    isCorrect  ? colors.success : colors.error;

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onExit}>
          <Text style={styles.backText}>← Games</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sentence Builder</Text>
        <Text style={styles.headerProgress}>{currentIndex + 1} / {TOTAL_ROUNDS}</Text>
      </View>

      {/* ── Progress bar ── */}
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progress * 100}%` as any }]} />
      </View>

      {/* ── Score counter ── */}
      <Text style={styles.scoreLabel}>✓ {correctCount} correct</Text>

      {/* ── English prompt ── */}
      <View style={styles.promptCard}>
        <Text style={styles.promptLabel}>TRANSLATE INTO GERMAN</Text>
        <Text style={styles.promptText}>{entry.english}</Text>
      </View>

      {/* ── Answer area ── */}
      <Text style={styles.sectionLabel}>YOUR ANSWER</Text>
      <View style={[styles.answerArea, { borderColor: answerBorderColor }]}>
        {answerTiles.length === 0 ? (
          <Text style={styles.placeholderText}>Tap words below to build the sentence.</Text>
        ) : (
          <View style={styles.tileRow}>
            {answerTiles.map(tile => (
              <TouchableOpacity
                key={tile.originalIndex}
                style={styles.answerTile}
                onPress={() => removeTile(tile)}
                disabled={submitted}
                activeOpacity={0.7}
              >
                <Text style={styles.answerTileText}>{tile.word}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* ── Result feedback (shown after submit) ── */}
      {submitted && (
        <View style={styles.feedbackBox}>
          <Text style={[styles.feedbackResult, isCorrect ? styles.textCorrect : styles.textWrong]}>
            {isCorrect ? '✓ Correct!' : `✗ Incorrect — ${entry.words.join(' ')}`}
          </Text>
          <Text style={styles.grammarNote}>{entry.grammarNote}</Text>
        </View>
      )}

      {/* ── Word bank ── */}
      <Text style={styles.sectionLabel}>WORD BANK</Text>
      <View style={styles.bankArea}>
        {bankTiles.length === 0 && !submitted ? (
          <Text style={styles.placeholderText}>All words placed — submit or remove tiles.</Text>
        ) : (
          <View style={styles.tileRow}>
            {bankTiles.map(tile => (
              <TouchableOpacity
                key={tile.originalIndex}
                style={styles.bankTile}
                onPress={() => placeTile(tile)}
                disabled={submitted}
                activeOpacity={0.7}
              >
                <Text style={styles.bankTileText}>{tile.word}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* ── Action button ── */}
      {!submitted ? (
        <TouchableOpacity
          style={[styles.primaryButton, answerTiles.length === 0 && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={answerTiles.length === 0}
        >
          <Text style={styles.primaryButtonText}>Submit</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
          <Text style={styles.primaryButtonText}>
            {currentIndex + 1 >= TOTAL_ROUNDS ? 'See Results' : 'Next →'}
          </Text>
        </TouchableOpacity>
      )}

    </ScrollView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
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
    maxWidth: 560,
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
    maxWidth: 560,
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

  // ── Score counter ──
  scoreLabel: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.success,
    alignSelf: 'flex-end',
    width: '100%',
    maxWidth: 560,
    textAlign: 'right',
    marginBottom: spacing.xl,
  },

  // ── English prompt card ──
  promptCard: {
    width: '100%',
    maxWidth: 560,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.xl,
    marginBottom: spacing.xxl,
  },
  promptLabel: {
    fontFamily: font.semiBold,
    fontSize: 11,
    letterSpacing: 0.08 * 11,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  promptText: {
    fontFamily: font.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    lineHeight: 28,
  },

  // ── Section labels ──
  sectionLabel: {
    fontFamily: font.semiBold,
    fontSize: 11,
    letterSpacing: 0.08 * 11,
    color: colors.textSecondary,
    alignSelf: 'flex-start',
    width: '100%',
    maxWidth: 560,
    marginBottom: spacing.sm,
  },

  // ── Answer area ──
  answerArea: {
    width: '100%',
    maxWidth: 560,
    minHeight: 64,
    borderWidth: 1,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
    marginBottom: spacing.md,
    justifyContent: 'center',
  },
  placeholderText: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textMuted,
    textAlign: 'center',
    paddingVertical: spacing.sm,
  },

  // ── Tile rows ──
  tileRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },

  // Answer tiles: filled (black bg, white text) — tap to remove
  answerTile: {
    backgroundColor: colors.textPrimary,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  answerTileText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.md,
    color: colors.surface,
  },

  // ── Feedback box (shown after submit) ──
  feedbackBox: {
    width: '100%',
    maxWidth: 560,
    marginBottom: spacing.lg,
  },
  feedbackResult: {
    fontFamily: font.semiBold,
    fontSize: fontSize.md,
    marginBottom: spacing.sm,
  },
  grammarNote: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },

  // ── Word bank area ──
  bankArea: {
    width: '100%',
    maxWidth: 560,
    minHeight: 64,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    padding: spacing.md,
    marginBottom: spacing.xxl,
    justifyContent: 'center',
  },

  // Bank tiles: outlined (border, white bg, black text) — tap to place
  bankTile: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  bankTileText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },

  // ── Buttons ──
  primaryButton: {
    backgroundColor: colors.textPrimary,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.hero,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    minWidth: 160,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.35,
  },
  primaryButtonText: {
    fontFamily: font.semiBold,
    color: colors.surface,
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

  // ── Shared text colours ──
  textCorrect: { color: colors.success },
  textWrong:   { color: colors.error },

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
});