// WordMatchGame.tsx — Word Match mini game
//
// Flow:
//   1. 6 random words are picked from the vocabulary
//   2. German words shown on the left, English meanings on the right (different order)
//   3. Click a German word to select it (blue highlight)
//   4. Click an English meaning to attempt a match
//      - Correct → both turn green and are locked as matched
//      - Wrong   → both flash red for 600ms, then deselect
//   5. All 6 matched → done screen with Play Again button

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Word } from '../../data/vocabulary';
import { saveCompletion } from '../../lib/scoresService';
import { colors, font, fontSize, spacing, radius } from '../../styles/theme';

// ─── Props ─────────────────────────────────────────────────────────────────────

type Props = {
  words: Word[];       // full vocabulary for the current level
  onExit: () => void;  // go back to the game selector
};

// ─── Helpers ───────────────────────────────────────────────────────────────────

const ROUND_SIZE = 6;

// Pick `count` random items from an array
function pickRandom<T>(arr: T[], count: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, count);
}

// Return a shuffled copy of an array
function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// One round = same 6 words in two different shuffled orders
type Round = {
  germanOrder: Word[];   // left column
  englishOrder: Word[];  // right column (same 6 words, different order)
};

function newRound(allWords: Word[]): Round {
  const picked = pickRandom(allWords, ROUND_SIZE);
  return {
    germanOrder: shuffle(picked),
    englishOrder: shuffle(picked),
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function WordMatchGame({ words, onExit }: Props) {
  // Current round data
  const [round, setRound] = useState<Round>(() => newRound(words));

  // ID of the currently selected German word (null = nothing selected)
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // IDs of correctly matched words — they turn green and can no longer be tapped
  const [matchedIds, setMatchedIds] = useState<string[]>([]);

  // IDs currently flashing red (wrong match attempt) — cleared after 600ms
  const [wrongIds, setWrongIds] = useState<string[]>([]);

  // True while a wrong-flash timeout is running — prevents double-tapping
  const isLocked = wrongIds.length > 0;

  // True when all 6 pairs have been matched
  const isDone = matchedIds.length === ROUND_SIZE;

  // ── Tap a German word ──
  function handleGermanPress(id: string) {
    if (isLocked || matchedIds.includes(id)) return;
    // Tapping the already-selected word deselects it
    setSelectedId(prev => (prev === id ? null : id));
  }

  // ── Tap an English meaning ──
  function handleEnglishPress(id: string) {
    if (isLocked || !selectedId || matchedIds.includes(id)) return;

    if (selectedId === id) {
      // Correct — same word ID on both sides
      const updated = [...matchedIds, id];
      setMatchedIds(updated);
      setSelectedId(null);
      // All pairs matched — save completion
      if (updated.length === ROUND_SIZE) saveCompletion('game_word_match');
    } else {
      // Wrong — flash both red for 600ms
      setWrongIds([selectedId, id]);
      setTimeout(() => {
        setWrongIds([]);
        setSelectedId(null);
      }, 600);
    }
  }

  // ── Start a new round ──
  function playAgain() {
    setRound(newRound(words));
    setSelectedId(null);
    setMatchedIds([]);
    setWrongIds([]);
  }

  // ── Determine button style for a German word ──
  function germanStyle(id: string) {
    if (matchedIds.includes(id)) return [styles.wordButton, styles.wordMatched];
    if (wrongIds.includes(id))   return [styles.wordButton, styles.wordWrong];
    if (selectedId === id)       return [styles.wordButton, styles.wordSelected];
    return [styles.wordButton];
  }

  // ── Determine button style for an English meaning ──
  function englishStyle(id: string) {
    if (matchedIds.includes(id)) return [styles.wordButton, styles.wordMatched];
    if (wrongIds.includes(id))   return [styles.wordButton, styles.wordWrong];
    return [styles.wordButton];
  }

  // ─── Done screen ─────────────────────────────────────────────────────────────
  if (isDone) {
    return (
      <View style={styles.doneContainer}>
        <Text style={styles.doneEmoji}>🎉</Text>
        <Text style={styles.doneTitle}>All matched!</Text>
        <Text style={styles.doneSubtitle}>You matched all 6 pairs correctly.</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={playAgain}>
          <Text style={styles.primaryButtonText}>Play Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={onExit}>
          <Text style={styles.secondaryButtonText}>← Back to Games</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ─── Game screen ─────────────────────────────────────────────────────────────
  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onExit}>
          <Text style={styles.backText}>← Games</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Word Match</Text>
        <Text style={styles.headerProgress}>{matchedIds.length} / {ROUND_SIZE}</Text>
      </View>

      <Text style={styles.instruction}>
        Select a German word, then tap its English meaning.
      </Text>

      {/* Two-column layout */}
      <View style={styles.columns}>

        {/* Left column — German */}
        <View style={styles.column}>
          <Text style={styles.columnLabel}>German</Text>
          {round.germanOrder.map(word => (
            <TouchableOpacity
              key={word.id}
              style={germanStyle(word.id)}
              onPress={() => handleGermanPress(word.id)}
              disabled={isLocked || matchedIds.includes(word.id)}
            >
              <Text style={[
                styles.wordText,
                matchedIds.includes(word.id) && styles.wordTextMatched,
                wrongIds.includes(word.id)   && styles.wordTextWrong,
                selectedId === word.id       && styles.wordTextSelected,
              ]}>
                {word.german}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Right column — English */}
        <View style={styles.column}>
          <Text style={styles.columnLabel}>English</Text>
          {round.englishOrder.map(word => (
            <TouchableOpacity
              key={word.id}
              style={englishStyle(word.id)}
              onPress={() => handleEnglishPress(word.id)}
              disabled={isLocked || matchedIds.includes(word.id)}
            >
              <Text style={[
                styles.wordText,
                matchedIds.includes(word.id) && styles.wordTextMatched,
                wrongIds.includes(word.id)   && styles.wordTextWrong,
              ]}>
                {word.english}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

      </View>
    </ScrollView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: spacing.xxl, backgroundColor: colors.background },

  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.sm },
  backText: { fontFamily: font.semiBold, fontSize: fontSize.sm, color: colors.accent },
  headerTitle: { fontFamily: font.bold, fontSize: fontSize.lg, color: colors.textPrimary },
  headerProgress: { fontFamily: font.semiBold, fontSize: fontSize.sm, color: colors.textMuted },

  instruction: { fontFamily: font.regular, fontSize: fontSize.xs, color: colors.textMuted, textAlign: 'center', marginBottom: spacing.xxl },

  columns: { flexDirection: 'row', gap: spacing.md },
  column: { flex: 1, gap: spacing.sm },
  columnLabel: {
    fontFamily: font.semiBold, fontSize: fontSize.xxs, color: colors.textMuted,
    textTransform: 'uppercase', letterSpacing: 0.9, marginBottom: spacing.xs, textAlign: 'center',
  },

  wordButton: {
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.md,
    paddingVertical: spacing.md, paddingHorizontal: spacing.sm,
    backgroundColor: colors.background, minHeight: 48, justifyContent: 'center',
  },
  wordSelected: { borderColor: colors.accent, backgroundColor: colors.accentLight },
  wordMatched: { borderColor: colors.success, backgroundColor: colors.successLight },
  wordWrong: { borderColor: colors.error, backgroundColor: colors.errorLight },
  wordText: { fontFamily: font.regular, fontSize: fontSize.sm, color: colors.textPrimary, textAlign: 'center' },
  wordTextSelected: { fontFamily: font.semiBold, color: colors.accent },
  wordTextMatched: { fontFamily: font.semiBold, color: colors.success },
  wordTextWrong: { color: colors.error },

  doneContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xxxl, backgroundColor: colors.background },
  doneEmoji: { fontSize: 48, marginBottom: spacing.md },
  doneTitle: { fontFamily: font.bold, fontSize: fontSize.xl, color: colors.textPrimary, marginBottom: spacing.xs },
  doneSubtitle: { fontFamily: font.regular, fontSize: fontSize.sm, color: colors.textSecondary, marginBottom: spacing.xxxl },
  primaryButton: {
    backgroundColor: colors.textPrimary, paddingVertical: spacing.lg,
    paddingHorizontal: spacing.hero, borderRadius: radius.md, marginBottom: spacing.md,
  },
  primaryButtonText: { fontFamily: font.semiBold, color: colors.background, fontSize: fontSize.md },
  secondaryButton: { paddingVertical: spacing.sm },
  secondaryButtonText: { fontFamily: font.semiBold, fontSize: fontSize.md, color: colors.accent },
});