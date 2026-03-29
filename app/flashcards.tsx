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

// ─── Category definitions ──────────────────────────────────────────────────────

type CategoryId = 'All' | 'Nouns' | 'Verbs' | 'Adjectives' | 'Prepositions' | 'Other';

// Filter a word list to those matching a given category
function filterByCategory(words: Word[], category: CategoryId): Word[] {
  switch (category) {
    case 'All':          return words;
    case 'Nouns':        return words.filter(w => w.partOfSpeech === 'noun');
    case 'Verbs':        return words.filter(w => w.partOfSpeech === 'verb');
    case 'Adjectives':   return words.filter(w => w.partOfSpeech === 'adjective');
    case 'Prepositions': return words.filter(w => w.partOfSpeech === 'preposition');
    case 'Other':
      // Everything that isn't covered by the four named categories above
      return words.filter(w =>
        !['noun', 'verb', 'adjective', 'preposition'].includes(w.partOfSpeech)
      );
  }
}

const CATEGORIES: CategoryId[] = ['All', 'Nouns', 'Verbs', 'Adjectives', 'Prepositions', 'Other'];

// ─── FlashcardDeck sub-component ──────────────────────────────────────────────
// Holds all the study logic (hook + card + buttons + done screen).
// It lives here rather than in its own file because it's only ever used by
// FlashcardsScreen.
//
// IMPORTANT: FlashcardsScreen renders this with key={selectedCategory}.
// When the category changes, React unmounts and remounts this component,
// which reinitialises useSpacedRepetition with the new word list cleanly.

type DeckProps = {
  studyWords: Word[];   // pre-filtered and mastery-filtered list to study
  totalWords: number;   // total words in the level (for progress bar denominator)
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
        <Text style={styles.doneEmoji}>🎉</Text>
        <Text style={styles.doneTitle}>All Done!</Text>
        <Text style={styles.doneSubtitle}>
          You cleared all {studyWords.length} words.
        </Text>

        <View style={styles.summaryRow}>
          <View style={[styles.summaryBox, styles.knownBox]}>
            <Text style={styles.summaryCount}>{knownCount}</Text>
            <Text style={styles.summaryLabel}>Known</Text>
          </View>
          <View style={[styles.summaryBox, styles.unknownBox]}>
            <Text style={styles.summaryCount}>{unknownCount}</Text>
            <Text style={styles.summaryLabel}>Revisited</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.restartButton} onPress={restart}>
          <Text style={styles.restartButtonText}>Study Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Study view ──
  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Progress bar — based on total level words, not just filtered set */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {remaining} word{remaining !== 1 ? 's' : ''} remaining
        </Text>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${((totalWords - remaining) / totalWords) * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* The card */}
      <View style={styles.cardContainer}>
        {currentWord && (
          <FlashCard key={currentWord.id} word={currentWord} />
        )}
      </View>

      {/* Known / Unknown buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.unknownButton]} onPress={handleUnknown}>
          <Text style={styles.buttonIcon}>✗</Text>
          <Text style={styles.buttonLabel}>Unknown</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.knownButton]} onPress={handleKnown}>
          <Text style={styles.buttonIcon}>✓</Text>
          <Text style={styles.buttonLabel}>Known</Text>
        </TouchableOpacity>
      </View>

      {/* Session tally */}
      <View style={styles.tallyRow}>
        <Text style={styles.tallyText}>✓ {knownCount} cleared</Text>
        <Text style={styles.tallyDivider}>·</Text>
        <Text style={styles.tallyText}>↺ {unknownCount} revisited</Text>
      </View>

    </ScrollView>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function FlashcardsScreen() {
  const level = useLevelStore((state) => state.level);
  const words = VOCABULARY[level];

  // Mastery data loaded from Supabase
  const [masteryMap, setMasteryMap] = useState<MasteryMap>(new Set());
  const [masteryLoading, setMasteryLoading] = useState(true);

  // Currently selected category — 'All' by default
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('All');

  useEffect(() => {
    setMasteryLoading(true);
    loadMastery().then((map) => {
      setMasteryMap(map);
      setMasteryLoading(false);
    });
  }, [level]);

  // Words the user hasn't mastered yet
  const unstudiedWords = words.filter((w) => !masteryMap.has(w.id));

  // Further filtered by the selected category
  const studyWords = filterByCategory(unstudiedWords, selectedCategory);

  // ── Loading state ──
  if (masteryLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#4fc3f7" />
        <Text style={styles.loadingText}>Loading your progress...</Text>
      </View>
    );
  }

  // ── Empty state (level has no words yet) ──
  if (words.length === 0) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.emptyEmoji}>🚧</Text>
        <Text style={styles.emptyTitle}>{level} Vocabulary Coming Soon</Text>
        <Text style={styles.emptySubtitle}>
          Switch to A1 using the level toggle at the top to start practising.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.outerContainer}>

      {/* ── Category pill row ──
          Scrollable horizontally so all 6 pills fit on narrow screens.
          Each pill shows the category name and the count from the full word list
          (not mastery-filtered) so the numbers stay stable as you study. */}
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

      {/* ── Flashcard deck ──
          key={selectedCategory} causes a full remount when the category changes,
          which reinitialises the spaced-repetition queue with the new word list. */}
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

  // ── Outer container (wraps pill row + deck) ──
  outerContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  // ── Category pills ──
  pillRow: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 8,
    flexDirection: 'row',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
  },
  pillSelected: {
    backgroundColor: '#1a1a2e',
    borderColor: '#1a1a2e',
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },
  pillTextSelected: {
    color: '#fff',
  },
  pillCount: {
    fontSize: 12,
    color: '#aaa',
    fontWeight: '500',
  },
  pillCountSelected: {
    color: '#aaa',
  },

  // ── Deck (study view) ──
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },

  // ── Progress ──
  progressContainer: {
    width: '100%',
    maxWidth: 380,
    marginBottom: 32,
  },
  progressText: {
    fontSize: 13,
    color: '#888888',
    textAlign: 'right',
    marginBottom: 6,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4fc3f7',
    borderRadius: 2,
  },

  // ── Card area ──
  cardContainer: {
    width: '100%',
    maxWidth: 380,
    height: 260,
    marginBottom: 40,
  },

  // ── Buttons ──
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    maxWidth: 160,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  unknownButton: {
    backgroundColor: '#ffebee',
    borderWidth: 1.5,
    borderColor: '#ef9a9a',
  },
  knownButton: {
    backgroundColor: '#e8f5e9',
    borderWidth: 1.5,
    borderColor: '#a5d6a7',
  },
  buttonIcon: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
  },

  // ── Session tally ──
  tallyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tallyText: {
    fontSize: 13,
    color: '#aaaaaa',
  },
  tallyDivider: {
    fontSize: 13,
    color: '#cccccc',
  },

  // ── Empty / done / loading states ──
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#888888',
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 22,
  },
  doneEmoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  doneTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  doneSubtitle: {
    fontSize: 15,
    color: '#888888',
    marginBottom: 32,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  summaryBox: {
    width: 110,
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  knownBox: {
    backgroundColor: '#e8f5e9',
    borderWidth: 1.5,
    borderColor: '#a5d6a7',
  },
  unknownBox: {
    backgroundColor: '#ffebee',
    borderWidth: 1.5,
    borderColor: '#ef9a9a',
  },
  summaryCount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  summaryLabel: {
    fontSize: 13,
    color: '#888888',
    marginTop: 4,
  },
  restartButton: {
    backgroundColor: '#1a1a2e',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  restartButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});