// flashcards.tsx — Flashcards screen
//
// Uses the useSpacedRepetition hook to manage the study queue.
// Unknown words are recycled back into the deck until the user knows them.
// Session ends only when every word has been marked as known.
// Mastery (known/unknown per word) is saved to Supabase so progress persists.
//
// Category filter: the user can narrow the deck to a part of speech.
// Changing the category remounts FlashcardDeck (via key=) which reinitialises
// the spaced-repetition queue cleanly with the new filtered word list.

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import useLevelStore from '../src/store/useLevelStore';
import { VOCABULARY, Word } from '../src/data/vocabulary';
import FlashCard from '../src/components/FlashCard';
import { useSpacedRepetition } from '../src/hooks/useSpacedRepetition';
import { loadMastery, saveMastery, MasteryMap } from '../src/lib/masteryService';
import {
  colors, font, fontSize, spacing, radius,
  cardStyle, labelStyle, progressTrackStyle,
} from '../src/styles/theme';

// ─── Category definitions ──────────────────────────────────────────────────────

type CategoryId = 'All' | 'Nouns' | 'Verbs' | 'Adjectives' | 'Prepositions' | 'Other';

function filterByCategory(words: Word[], category: CategoryId): Word[] {
  switch (category) {
    case 'All':          return words;
    case 'Nouns':        return words.filter(w => w.partOfSpeech === 'noun');
    case 'Verbs':        return words.filter(w => w.partOfSpeech === 'verb');
    case 'Adjectives':   return words.filter(w => w.partOfSpeech === 'adjective');
    case 'Prepositions': return words.filter(w => w.partOfSpeech === 'preposition');
    case 'Other':
      return words.filter(w =>
        !['noun', 'verb', 'adjective', 'preposition'].includes(w.partOfSpeech)
      );
  }
}

const CATEGORIES: CategoryId[] = ['All', 'Nouns', 'Verbs', 'Adjectives', 'Prepositions', 'Other'];

// ─── FlashcardDeck sub-component ──────────────────────────────────────────────
// Remounted via key={selectedCategory} when the category changes.

type DeckProps = {
  studyWords: Word[];
  totalWords: number;
};

function FlashcardDeck({ studyWords, totalWords }: DeckProps) {
  const {
    currentWord,
    remaining,
    knownCount,
    unknownCount,
    isDone,
    markKnown,
    markUnknown,
    restart,
  } = useSpacedRepetition(studyWords);

  function handleKnown() {
    if (!currentWord) return;
    saveMastery(currentWord.id, true);
    markKnown();
  }

  function handleUnknown() {
    if (!currentWord) return;
    saveMastery(currentWord.id, false);
    markUnknown();
  }

  // ── Done state ──
  if (isDone) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.doneTitle}>All Done</Text>
        <Text style={styles.doneSubtitle}>
          You cleared all {studyWords.length} words in this set.
        </Text>

        <View style={styles.summaryRow}>
          <View style={[styles.summaryBox, styles.knownBox]}>
            <Text style={styles.summaryCount}>{knownCount}</Text>
            <Text style={styles.summaryLabel}>KNOWN</Text>
          </View>
          <View style={[styles.summaryBox, styles.unknownBox]}>
            <Text style={styles.summaryCount}>{unknownCount}</Text>
            <Text style={styles.summaryLabel}>REVISITED</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={restart}>
          <Text style={styles.primaryButtonText}>Study Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const progressPct = totalWords > 0
    ? ((totalWords - remaining) / totalWords) * 100
    : 0;

  // ── Study view ──
  return (
    <ScrollView contentContainerStyle={styles.deckContainer}>

      {/* Progress */}
      <View style={styles.progressBlock}>
        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>{remaining} remaining</Text>
          <Text style={styles.progressLabel}>{Math.round(progressPct)}% done</Text>
        </View>
        <View style={[progressTrackStyle, { width: '100%', maxWidth: 480 } as any]}>
          <View style={[styles.progressFill, { width: `${progressPct}%` as any }]} />
        </View>
      </View>

      {/* Card */}
      <View style={styles.cardContainer}>
        {currentWord && <FlashCard key={currentWord.id} word={currentWord} />}
      </View>

      {/* Known / Unknown buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.actionButton, styles.unknownButton]} onPress={handleUnknown}>
          <Text style={styles.unknownButtonText}>✗  Unknown</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.knownButton]} onPress={handleKnown}>
          <Text style={styles.knownButtonText}>✓  Known</Text>
        </TouchableOpacity>
      </View>

      {/* Tally */}
      <Text style={styles.tallyText}>
        {knownCount} cleared · {unknownCount} revisited
      </Text>

    </ScrollView>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function FlashcardsScreen() {
  const level = useLevelStore((state) => state.level);
  const words = VOCABULARY[level];

  const [masteryMap, setMasteryMap] = useState<MasteryMap>(new Set());
  const [masteryLoading, setMasteryLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('All');

  useEffect(() => {
    setMasteryLoading(true);
    loadMastery().then((map) => {
      setMasteryMap(map);
      setMasteryLoading(false);
    });
  }, [level]);

  const unstudiedWords = words.filter((w) => !masteryMap.has(w.id));
  const studyWords = filterByCategory(unstudiedWords, selectedCategory);

  if (masteryLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="small" color={colors.accent} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (words.length === 0) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.emptyTitle}>{level} vocabulary coming soon.</Text>
        <Text style={styles.emptySubtitle}>Switch to A1 to start practising.</Text>
      </View>
    );
  }

  return (
    <View style={styles.outerContainer}>

      {/* Category pill row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillRow}
      >
        {CATEGORIES.map((cat) => {
          const count = filterByCategory(words, cat).length;
          const isSelected = cat === selectedCategory;
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.pill, isSelected && styles.pillSelected]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.pillText, isSelected && styles.pillTextSelected]}>
                {cat}
              </Text>
              <Text style={[styles.pillCount, isSelected && styles.pillCountSelected]}>
                {count}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Deck — remounts on category change */}
      <FlashcardDeck
        key={selectedCategory}
        studyWords={studyWords}
        totalWords={words.length}
      />

    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // ── Category pills ──
  pillRow: {
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    gap: spacing.sm,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  pillSelected: {
    backgroundColor: colors.textPrimary,
    borderColor: colors.textPrimary,
  },
  pillText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  pillTextSelected: {
    color: colors.background,
  },
  pillCount: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  pillCountSelected: {
    color: colors.textMuted,
  },

  // ── Deck ──
  deckContainer: {
    flexGrow: 1,
    padding: spacing.xxl,
    backgroundColor: colors.background,
    alignItems: 'center',
  },

  // ── Progress ──
  progressBlock: {
    width: '100%',
    maxWidth: 480,
    marginBottom: spacing.xxxl,
    alignItems: 'center',
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 480,
    marginBottom: spacing.sm,
  },
  progressLabel: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  progressFill: {
    height: '100%' as any,
    backgroundColor: colors.accent,
    borderRadius: 2,
  },

  // ── Card ──
  cardContainer: {
    width: '100%',
    maxWidth: 380,
    height: 260,
    marginBottom: spacing.xxxl,
  },

  // ── Buttons ──
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
    width: '100%',
    maxWidth: 380,
  },
  actionButton: {
    flex: 1,
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
    borderWidth: 1,
  },
  unknownButton: {
    borderColor: colors.error,
    backgroundColor: colors.errorLight,
  },
  knownButton: {
    borderColor: colors.success,
    backgroundColor: colors.successLight,
  },
  unknownButtonText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.md,
    color: colors.error,
  },
  knownButtonText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.md,
    color: colors.success,
  },

  // ── Tally ──
  tallyText: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },

  // ── Done state ──
  doneTitle: {
    fontFamily: font.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  doneSubtitle: {
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.xxxl,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xxxl,
  },
  summaryBox: {
    ...cardStyle,
    width: 120,
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  knownBox: {
    borderColor: colors.success,
    backgroundColor: colors.successLight,
  },
  unknownBox: {
    borderColor: colors.error,
    backgroundColor: colors.errorLight,
  },
  summaryCount: {
    fontFamily: font.bold,
    fontSize: fontSize.xxl,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  summaryLabel: {
    ...labelStyle,
  },
  primaryButton: {
    backgroundColor: colors.textPrimary,
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.hero,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.md,
    color: colors.background,
  },

  // ── Shared centered states ──
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxxl,
    backgroundColor: colors.background,
  },
  loadingText: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  emptyTitle: {
    fontFamily: font.semiBold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});