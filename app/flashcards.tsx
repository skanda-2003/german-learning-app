// flashcards.tsx — Flashcards screen
//
// Phase 10c additions:
//   - THREE mastery states: Known (green) / Shaky (amber) / Unknown (red)
//   - Shaky words re-insert 8–12 cards ahead; Unknown re-inserts 3–5 cards ahead
//   - Word search bar — filters the deck by German word or English translation
//   - Session summary screen shows known / shaky / unknown counts
//   - "Study Again" now restarts with all words in the category (not just unstudied)
//   - Category pills show word counts
//   - Mastery persists to Supabase using the new 3-state mastery column

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import useLevelStore from '../src/store/useLevelStore';
import { VOCABULARY, Word } from '../src/data/vocabulary';
import FlashCard from '../src/components/FlashCard';
import { useSpacedRepetition } from '../src/hooks/useSpacedRepetition';
import { loadMastery, saveMastery, MasteryMap } from '../src/lib/masteryService';
import {
  colors, font, fontSize, spacing, radius,
  cardStyle, labelStyle,
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
// Remounted via key= when the category or search query changes.

type DeckProps = {
  studyWords: Word[];      // words to study this session (mastery-filtered + search-filtered)
  allCategoryWords: Word[]; // all words in this category — used for "Study Again"
};

function FlashcardDeck({ studyWords, allCategoryWords }: DeckProps) {
  const {
    currentWord,
    remaining,
    knownCount,
    shakyCount,
    unknownCount,
    isDone,
    weakWords,
    markKnown,
    markShaky,
    markUnknown,
    restart,
    restartWeak,
  } = useSpacedRepetition(studyWords, allCategoryWords);

  function handleKnown() {
    if (!currentWord) return;
    saveMastery(currentWord.id, 'known');
    markKnown();
  }

  function handleShaky() {
    if (!currentWord) return;
    saveMastery(currentWord.id, 'shaky');
    markShaky();
  }

  function handleUnknown() {
    if (!currentWord) return;
    saveMastery(currentWord.id, 'unknown');
    markUnknown();
  }


  // Total cards reviewed = known + shaky + all unknown actions
  // (unknownCount can exceed word count since a card can be marked unknown multiple times)
  const totalReviewed = knownCount + shakyCount;

  // ── Done state — session summary ──
  if (isDone) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.doneTitle}>Session Complete</Text>
        <Text style={styles.doneSubtitle}>
          {totalReviewed} {totalReviewed === 1 ? 'word' : 'words'} reviewed
        </Text>

        {/* Three summary boxes */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryBox, styles.knownBox]}>
            <Text style={styles.summaryCount}>{knownCount}</Text>
            <Text style={[styles.summaryLabel, { color: colors.success }]}>KNOWN</Text>
          </View>
          <View style={[styles.summaryBox, styles.shakyBox]}>
            <Text style={styles.summaryCount}>{shakyCount}</Text>
            <Text style={[styles.summaryLabel, { color: colors.amber }]}>SHAKY</Text>
          </View>
          <View style={[styles.summaryBox, styles.unknownBox]}>
            <Text style={styles.summaryCount}>{unknownCount}</Text>
            <Text style={[styles.summaryLabel, { color: colors.error }]}>UNKNOWN</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={restart}>
          <Text style={styles.primaryButtonText}>Study Again</Text>
        </TouchableOpacity>

        {/* Only show Study Weak if there were any shaky/unknown words this session */}
        {weakWords.length > 0 && (
          <TouchableOpacity style={styles.weakButton} onPress={restartWeak}>
            <Text style={styles.weakButtonText}>
              Study Weak ({weakWords.length})
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  // Progress: based on how many words have been marked known or shaky
  // (they won't appear again until restart)
  const progressPct = allCategoryWords.length > 0
    ? ((knownCount + shakyCount) / allCategoryWords.length) * 100
    : 0;

  // ── Study view ──
  return (
    <ScrollView contentContainerStyle={styles.deckContainer}>

      {/* Progress counters */}
      <View style={styles.progressBlock}>
        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>{remaining} remaining</Text>
          <Text style={styles.progressLabel}>{knownCount} cleared</Text>
        </View>
      </View>

      {/* Card */}
      <View style={styles.cardContainer}>
        {currentWord && <FlashCard key={currentWord.id} word={currentWord} />}
      </View>

      {/* Always-visible info panel — shows plural / conjugations / comparative */}
      {currentWord && (currentWord.plural || currentWord.conjugations || currentWord.comparative) && (
        <View style={styles.infoPanel}>

          {/* Noun: plural form */}
          {currentWord.plural && (
            <View style={styles.infoRow}>
              <Text style={styles.infoPanelLabel}>PLURAL</Text>
              <Text style={styles.infoPanelValue}>{currentWord.plural}</Text>
            </View>
          )}

          {/* Adjective: comparative form */}
          {currentWord.comparative && (
            <View style={styles.infoRow}>
              <Text style={styles.infoPanelLabel}>COMPARATIVE</Text>
              <Text style={styles.infoPanelValue}>{currentWord.comparative}</Text>
            </View>
          )}

          {/* Verb: conjugation table in a compact 2-column grid */}
          {currentWord.conjugations && (
            <>
              <Text style={styles.infoPanelLabel}>CONJUGATION</Text>
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
            </>
          )}

        </View>
      )}

      {/* Three action buttons: Unknown / Shaky / Known */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.actionButton, styles.unknownButton]} onPress={handleUnknown}>
          <Text style={styles.unknownButtonText}>Unknown</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.shakyButton]} onPress={handleShaky}>
          <Text style={styles.shakyButtonText}>Shaky</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.knownButton]} onPress={handleKnown}>
          <Text style={styles.knownButtonText}>Known</Text>
        </TouchableOpacity>
      </View>

      {/* Small tally below buttons */}
      <Text style={styles.tallyText}>
        {knownCount} known · {shakyCount} shaky · {unknownCount} unknown
      </Text>

    </ScrollView>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function FlashcardsScreen() {
  const level = useLevelStore((state) => state.level);
  const words = VOCABULARY[level];

  const [masteryMap, setMasteryMap]       = useState<MasteryMap>(new Map());
  const [masteryLoading, setMasteryLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('All');
  const [searchQuery, setSearchQuery]     = useState('');

  // Load mastery from Supabase when the level changes
  useEffect(() => {
    setMasteryLoading(true);
    loadMastery().then((map) => {
      setMasteryMap(map);
      setMasteryLoading(false);
    });
  }, [level]);

  // All words in the selected category (used for pill counts + Study Again)
  const allCategoryWords = filterByCategory(words, selectedCategory);

  // Words that aren't already marked 'known' — shaky/unknown/new all go in the deck
  const unstudiedWords = allCategoryWords.filter(
    (w) => masteryMap.get(w.id) !== 'known'
  );

  // Apply search filter on top (searches German word and English translation)
  const trimmedQuery = searchQuery.trim().toLowerCase();
  const studyWords = trimmedQuery
    ? unstudiedWords.filter(
        (w) =>
          w.german.toLowerCase().includes(trimmedQuery) ||
          w.english.toLowerCase().includes(trimmedQuery)
      )
    : unstudiedWords;

  // Key for the deck — remounts when category or search query changes
  const deckKey = `${selectedCategory}:${trimmedQuery}`;

  // ── Loading state ──
  if (masteryLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="small" color={colors.accent} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // ── Empty level state ──
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

      {/* ── Search bar ── */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search words..."
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="while-editing"
        />
        {/* Clear button for Android / web (iOS uses clearButtonMode) */}
        {searchQuery.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={() => setSearchQuery('')}>
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ── Category pills ── */}
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

      {/* ── Deck — remounts on category or search change ── */}
      <FlashcardDeck
        key={deckKey}
        studyWords={studyWords}
        allCategoryWords={allCategoryWords}
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

  // ── Search bar ──
  searchContainer: {
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 38,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  clearButton: {
    position: 'absolute',
    right: spacing.xxl + spacing.md,
    padding: spacing.sm,
  },
  clearButtonText: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },

  // ── Category pills ──
  pillRow: {
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    gap: spacing.sm,
    flexDirection: 'row',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    height: 30,
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
    color: '#888888',
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
  // ── Card ──
  cardContainer: {
    width: '100%',
    maxWidth: 380,
    height: 260,
    marginBottom: spacing.lg,
  },

  // ── Always-visible info panel (below card) ──
  infoPanel: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoPanelLabel: {
    fontFamily: font.semiBold,
    fontSize: 10,
    letterSpacing: 0.08 * 10,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  infoPanelValue: {
    fontFamily: font.semiBold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
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
  conjForm: {
    fontFamily: font.semiBold,
    fontSize: fontSize.xs,
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'right',
  },

  // ── Three action buttons ──
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
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
  shakyButton: {
    borderColor: colors.amber,
    backgroundColor: colors.amberLight,
  },
  knownButton: {
    borderColor: colors.success,
    backgroundColor: colors.successLight,
  },
  unknownButtonText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.error,
  },
  shakyButtonText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.amber,
  },
  knownButtonText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.success,
  },

  // ── Tally ──
  tallyText: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },

  // ── Done / session summary ──
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
    width: 90,
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.sm,
  },
  knownBox: {
    borderColor: colors.success,
    backgroundColor: colors.successLight,
  },
  shakyBox: {
    borderColor: colors.amber,
    backgroundColor: colors.amberLight,
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
  weakButton: {
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.amber,
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.hero,
    alignItems: 'center',
    backgroundColor: colors.amberLight,
  },
  weakButtonText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.md,
    color: colors.amber,
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