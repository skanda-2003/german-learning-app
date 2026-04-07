// SentenceBuilderGame.tsx — Sentence Builder mini game
//
// Flow:
//   0. Difficulty picker — user chooses Simple / Medium / Complex / All.
//   1. The English translation is shown as the prompt.
//   2. German word tiles are displayed in a shuffled "bank" below.
//   3. User taps tiles to build the sentence in the answer area (top).
//   4. Tapping a placed tile removes it back to the bank.
//   5. User submits — green flash for correct, red for wrong (correct shown).
//   6. Grammar note revealed after each submission.
//   7. After all rounds → done screen with score.

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
import { SENTENCE_BUILDER_DATA, SentenceEntry, Difficulty } from '../../data/sentenceBuilder';
import useLevelStore from '../../store/useLevelStore';

// ─── Props ─────────────────────────────────────────────────────────────────────

type Props = {
  words: Word[];   // vocabulary list (required by all games — not used directly here)
  onExit: () => void;
};

// ─── Constants ─────────────────────────────────────────────────────────────────

const MAX_ROUNDS = 10;

// ─── Types ─────────────────────────────────────────────────────────────────────

// Each tile carries its original position so duplicate words can be distinguished.
type WordTile = {
  word: string;
  originalIndex: number;
};

// The difficulty the user picks on the pre-game screen.
// 'all' means no filtering — mix every sentence in the pool.
type PickedDifficulty = Difficulty | 'all';

// ─── Difficulty config ─────────────────────────────────────────────────────────

const DIFFICULTY_OPTIONS: { value: PickedDifficulty; label: string; description: string }[] = [
  { value: 'all',     label: 'All',     description: 'Mix of all difficulties' },
  { value: 'simple',  label: 'Simple',  description: 'Short sentences, basic sein / haben' },
  { value: 'medium',  label: 'Medium',  description: 'Irregular verbs, separable verbs, negation' },
  { value: 'complex', label: 'Complex', description: 'Modal verbs, subordinate clauses, dative' },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// Pick up to MAX_ROUNDS entries from the pool filtered by difficulty.
// Falls back to A1 if the selected level has no sentences yet.
function pickEntries(pool: SentenceEntry[], picked: PickedDifficulty): SentenceEntry[] {
  const source = pool.length > 0 ? pool : SENTENCE_BUILDER_DATA['A1'];
  const filtered = picked === 'all' ? source : source.filter(e => e.difficulty === picked);
  // If a difficulty has fewer than MAX_ROUNDS entries, use all of them.
  return shuffle([...filtered]).slice(0, MAX_ROUNDS);
}

// Convert a SentenceEntry's words into a shuffled tile array for the bank.
function makeBankTiles(entry: SentenceEntry): WordTile[] {
  return shuffle(entry.words.map((word, i) => ({ word, originalIndex: i })));
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SentenceBuilderGame({ onExit }: Props) {
  const level = useLevelStore(state => state.level);
  const levelPool = SENTENCE_BUILDER_DATA[level];

  // ── Pre-game: difficulty picker ───────────────────────────────────────────
  const [pickedDifficulty, setPickedDifficulty] = useState<PickedDifficulty | null>(null);

  // ── Session state (stays for the whole game) ──────────────────────────────
  const [entries, setEntries] = useState<SentenceEntry[]>([]);
  const [totalRounds, setTotalRounds] = useState(MAX_ROUNDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // ── Round state (resets each round) ──────────────────────────────────────
  const [bankTiles, setBankTiles] = useState<WordTile[]>([]);
  const [answerTiles, setAnswerTiles] = useState<WordTile[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // ── Start session after difficulty is chosen ──────────────────────────────

  function startSession(difficulty: PickedDifficulty) {
    const newEntries = pickEntries(levelPool, difficulty);
    const rounds = newEntries.length;
    setPickedDifficulty(difficulty);
    setEntries(newEntries);
    setTotalRounds(rounds);
    setCurrentIndex(0);
    setCorrectCount(0);
    setIsDone(false);
    setBankTiles(makeBankTiles(newEntries[0]));
    setAnswerTiles([]);
    setSubmitted(false);
    setIsCorrect(false);
  }

  // ── Tile interaction ──────────────────────────────────────────────────────

  function placeTile(tile: WordTile) {
    if (submitted) return;
    setBankTiles(prev => prev.filter(t => t.originalIndex !== tile.originalIndex));
    setAnswerTiles(prev => [...prev, tile]);
  }

  function removeTile(tile: WordTile) {
    if (submitted) return;
    setAnswerTiles(prev => prev.filter(t => t.originalIndex !== tile.originalIndex));
    setBankTiles(prev => [...prev, tile]);
  }

  // ── Submit ────────────────────────────────────────────────────────────────

  function handleSubmit() {
    if (submitted || entries.length === 0) return;

    const entry = entries[currentIndex];
    const userAnswer = answerTiles.map(t => t.word).join(' ');
    const correctAnswer = entry.words.join(' ');
    const wasCorrect = userAnswer === correctAnswer;

    setIsCorrect(wasCorrect);
    setSubmitted(true);

    if (wasCorrect) {
      setCorrectCount(prev => prev + 1);
    }
  }

  // ── Next round / finish ───────────────────────────────────────────────────

  function handleNext() {
    const nextIndex = currentIndex + 1;

    if (nextIndex >= totalRounds) {
      saveScore('game_sentence_builder', correctCount, totalRounds);
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

  function handlePlayAgain() {
    // Go back to difficulty picker so user can change or replay same.
    setPickedDifficulty(null);
    setEntries([]);
    setCurrentIndex(0);
    setCorrectCount(0);
    setIsDone(false);
    setBankTiles([]);
    setAnswerTiles([]);
    setSubmitted(false);
    setIsCorrect(false);
  }

  // ─── Difficulty picker screen ─────────────────────────────────────────────────

  if (pickedDifficulty === null) {
    // Count how many sentences are available per difficulty at this level.
    const source = levelPool.length > 0 ? levelPool : SENTENCE_BUILDER_DATA['A1'];
    const counts: Record<PickedDifficulty, number> = {
      all:     source.length,
      simple:  source.filter(e => e.difficulty === 'simple').length,
      medium:  source.filter(e => e.difficulty === 'medium').length,
      complex: source.filter(e => e.difficulty === 'complex').length,
    };

    return (
      <ScrollView contentContainerStyle={styles.pickerContainer}>
        <View style={styles.pickerHeader}>
          <TouchableOpacity onPress={onExit}>
            <Text style={styles.backText}>← Games</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sentence Builder</Text>
          <View style={{ width: 60 }} />
        </View>

        <Text style={styles.pickerPromptLabel}>CHOOSE DIFFICULTY</Text>
        <Text style={styles.pickerPromptSub}>
          Select a level to filter the sentences, or pick All to mix everything.
        </Text>

        {DIFFICULTY_OPTIONS.map(opt => {
          const count = counts[opt.value];
          const rounds = Math.min(count, MAX_ROUNDS);
          return (
            <TouchableOpacity
              key={opt.value}
              style={styles.difficultyCard}
              onPress={() => startSession(opt.value)}
              activeOpacity={0.75}
            >
              <View style={styles.difficultyCardLeft}>
                <Text style={styles.difficultyLabel}>{opt.label}</Text>
                <Text style={styles.difficultyDesc}>{opt.description}</Text>
              </View>
              <Text style={styles.difficultyCount}>{rounds} rounds</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }

  // ─── Done screen ─────────────────────────────────────────────────────────────

  if (isDone) {
    const percentage = Math.round((correctCount / totalRounds) * 100);
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
          <Text style={styles.scoreDetail}>{correctCount} / {totalRounds} correct</Text>
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

  // Guard: entries may be empty if session hasn't started (shouldn't happen, but safe).
  if (entries.length === 0) return null;

  const entry = entries[currentIndex];
  const progress = currentIndex / totalRounds;

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
        <Text style={styles.headerProgress}>{currentIndex + 1} / {totalRounds}</Text>
      </View>

      {/* ── Progress bar ── */}
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progress * 100}%` as any }]} />
      </View>

      {/* ── Score + difficulty badge ── */}
      <View style={styles.metaRow}>
        <Text style={styles.difficultyBadge}>
          {pickedDifficulty === 'all' ? 'ALL' : pickedDifficulty.toUpperCase()}
        </Text>
        <Text style={styles.scoreLabel}>✓ {correctCount} correct</Text>
      </View>

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
            {currentIndex + 1 >= totalRounds ? 'See Results' : 'Next →'}
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

  // ── Difficulty picker ──
  pickerContainer: {
    padding: spacing.xxl,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  pickerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 560,
    marginBottom: spacing.xxl,
  },
  pickerPromptLabel: {
    fontFamily: font.semiBold,
    fontSize: 11,
    letterSpacing: 0.08 * 11,
    color: colors.textSecondary,
    alignSelf: 'flex-start',
    width: '100%',
    maxWidth: 560,
    marginBottom: spacing.sm,
  },
  pickerPromptSub: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textMuted,
    alignSelf: 'flex-start',
    width: '100%',
    maxWidth: 560,
    marginBottom: spacing.xl,
    lineHeight: 20,
  },
  difficultyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 560,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.xl,
    marginBottom: spacing.md,
  },
  difficultyCardLeft: {
    flex: 1,
    marginRight: spacing.md,
  },
  difficultyLabel: {
    fontFamily: font.bold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  difficultyDesc: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  difficultyCount: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
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

  // ── Meta row (difficulty badge + score) ──
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 560,
    marginBottom: spacing.xl,
  },
  difficultyBadge: {
    fontFamily: font.semiBold,
    fontSize: 10,
    letterSpacing: 0.08 * 10,
    color: colors.accent,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: radius.sm,
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
  },
  scoreLabel: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.success,
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
