// flashcards.tsx — Flashcards screen
//
// Uses the useSpacedRepetition hook to manage the study queue.
// Unknown words are recycled back into the deck until the user knows them.
// Session ends only when every word has been marked as known.

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import useLevelStore from '../src/store/useLevelStore';
import { VOCABULARY } from '../src/data/vocabulary';
import FlashCard from '../src/components/FlashCard';
import { useSpacedRepetition } from '../src/hooks/useSpacedRepetition';

export default function FlashcardsScreen() {
  // Get the currently selected level from global state
  const level = useLevelStore((state) => state.level);

  // Get the word list for this level
  const words = VOCABULARY[level];

  // All queue logic is handled by this hook
  const {
    currentWord,
    remaining,
    knownCount,
    unknownCount,
    isDone,
    markKnown,
    markUnknown,
    restart,
  } = useSpacedRepetition(words);

  // ─── Empty state (level has no words yet) ─────────────────────────────────
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

  // ─── Done state (queue is empty — every word has been marked known) ────────
  if (isDone) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.doneEmoji}>🎉</Text>
        <Text style={styles.doneTitle}>All Done!</Text>
        <Text style={styles.doneSubtitle}>
          You cleared all {words.length} words.
        </Text>

        {/* Summary row */}
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

  // ─── Main study view ───────────────────────────────────────────────────────
  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* ── Progress bar ──
          Shows how many words are left to clear, not a simple counter.
          The bar fills as the queue shrinks. */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {remaining} word{remaining !== 1 ? 's' : ''} remaining
        </Text>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              // Fill = how much of the original list has been cleared
              { width: `${((words.length - remaining) / words.length) * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* ── The card ──
          key={currentWord.id} remounts FlashCard on every new word,
          resetting the flip animation back to the front face. */}
      <View style={styles.cardContainer}>
        {currentWord && (
          <FlashCard key={currentWord.id} word={currentWord} />
        )}
      </View>

      {/* ── Known / Unknown buttons ── */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.unknownButton]} onPress={markUnknown}>
          <Text style={styles.buttonIcon}>✗</Text>
          <Text style={styles.buttonLabel}>Unknown</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.knownButton]} onPress={markKnown}>
          <Text style={styles.buttonIcon}>✓</Text>
          <Text style={styles.buttonLabel}>Known</Text>
        </TouchableOpacity>
      </View>

      {/* ── Session tally ── */}
      <View style={styles.tallyRow}>
        <Text style={styles.tallyText}>✓ {knownCount} cleared</Text>
        <Text style={styles.tallyDivider}>·</Text>
        <Text style={styles.tallyText}>↺ {unknownCount} revisited</Text>
      </View>

    </ScrollView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
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

  // ── Empty / done states ──
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: '#f5f5f5',
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
