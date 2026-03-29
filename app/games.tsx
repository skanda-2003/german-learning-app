// games.tsx — Mini Games screen
//
// Shows 4 game cards. Tapping a card opens that game.
// Fill in the Blank is marked "Coming Soon" (requires Gemini — deferred to Phase 10).
//
// Active games:
//   Word Match     — match 6 German words to their English meanings
//   Gender Battle  — pick der / die / das for a noun, 10 rounds
//   Listening Quiz — hear a German word, pick the correct meaning, 10 rounds

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import useLevelStore from '../src/store/useLevelStore';
import { VOCABULARY } from '../src/data/vocabulary';
import WordMatchGame from '../src/components/games/WordMatchGame';
import GenderBattleGame from '../src/components/games/GenderBattleGame';
import ListeningQuizGame from '../src/components/games/ListeningQuizGame';

// ─── Types ─────────────────────────────────────────────────────────────────────

type GameId = 'word-match' | 'gender-battle' | 'listening-quiz';

type GameCard = {
  id: GameId | null;  // null = not yet available
  emoji: string;
  title: string;
  description: string;
  available: boolean;
};

// ─── Game card definitions ─────────────────────────────────────────────────────

const GAMES: GameCard[] = [
  {
    id: 'word-match',
    emoji: '🔗',
    title: 'Word Match',
    description: 'Select a German word, then tap its English meaning. Match all 6 pairs.',
    available: true,
  },
  {
    id: 'gender-battle',
    emoji: '⚔️',
    title: 'Gender Battle',
    description: 'A noun appears — pick der, die, or das as fast as you can. 10 rounds.',
    available: true,
  },
  {
    id: 'listening-quiz',
    emoji: '🎧',
    title: 'Listening Quiz',
    description: 'A German word is spoken aloud. Pick the correct English meaning. 10 rounds.',
    available: true,
  },
  {
    id: null,
    emoji: '✏️',
    title: 'Fill in the Blank',
    description: 'Complete a sentence with the missing German word. Powered by AI.',
    available: false, // requires Gemini — coming in Phase 10
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function GamesScreen() {
  const level = useLevelStore(state => state.level);
  const words = VOCABULARY[level];

  // null = show the selector | GameId = show that game
  const [activeGame, setActiveGame] = useState<GameId | null>(null);

  // ── Empty state (no vocabulary for this level yet) ──
  if (words.length === 0) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.emptyEmoji}>🚧</Text>
        <Text style={styles.emptyTitle}>{level} Games Coming Soon</Text>
        <Text style={styles.emptySubtitle}>
          Switch to A1 using the level toggle at the top to start playing.
        </Text>
      </View>
    );
  }

  // ── Active game views ──
  if (activeGame === 'word-match') {
    return <WordMatchGame words={words} onExit={() => setActiveGame(null)} />;
  }
  if (activeGame === 'gender-battle') {
    return <GenderBattleGame words={words} onExit={() => setActiveGame(null)} />;
  }
  if (activeGame === 'listening-quiz') {
    return <ListeningQuizGame words={words} onExit={() => setActiveGame(null)} />;
  }

  // ── Selector screen ──
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.screenTitle}>Mini Games</Text>
      <Text style={styles.screenSubtitle}>
        Practice your German with quick, fun games.
      </Text>

      {GAMES.map((game, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.gameCard, !game.available && styles.gameCardDisabled]}
          onPress={() => game.available && game.id && setActiveGame(game.id)}
          disabled={!game.available}
        >
          <View style={styles.gameCardLeft}>
            <Text style={styles.gameEmoji}>{game.emoji}</Text>
          </View>
          <View style={styles.gameCardContent}>
            <View style={styles.gameTitleRow}>
              <Text style={[styles.gameTitle, !game.available && styles.gameTitleDisabled]}>
                {game.title}
              </Text>
              {!game.available && (
                <View style={styles.comingSoonBadge}>
                  <Text style={styles.comingSoonText}>Soon</Text>
                </View>
              )}
            </View>
            <Text style={[styles.gameDescription, !game.available && styles.gameDescriptionDisabled]}>
              {game.description}
            </Text>
          </View>
          {game.available && <Text style={styles.arrow}>→</Text>}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f5f5f5',
  },

  // ── Empty state ──
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: '#f5f5f5',
  },
  emptyEmoji: { fontSize: 48, marginBottom: 16 },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
  },

  // ── Selector ──
  screenTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 6,
  },
  screenSubtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 28,
    lineHeight: 20,
  },

  // ── Game cards ──
  gameCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  gameCardDisabled: {
    opacity: 0.5,
  },
  gameCardLeft: {
    marginRight: 14,
  },
  gameEmoji: {
    fontSize: 32,
  },
  gameCardContent: {
    flex: 1,
  },
  gameTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  gameTitleDisabled: {
    color: '#aaa',
  },
  gameDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  gameDescriptionDisabled: {
    color: '#bbb',
  },
  arrow: {
    fontSize: 18,
    color: '#aaa',
    marginLeft: 8,
  },
  comingSoonBadge: {
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  comingSoonText: {
    fontSize: 11,
    color: '#888',
    fontWeight: '600',
  },
});