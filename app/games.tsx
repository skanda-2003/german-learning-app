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
import {
  colors, font, fontSize, spacing, radius,
  labelStyle,
} from '../src/styles/theme';

// ─── Types ─────────────────────────────────────────────────────────────────────

type GameId = 'word-match' | 'gender-battle' | 'listening-quiz';

type GameCard = {
  id: GameId | null;
  title: string;
  description: string;
  available: boolean;
};

const GAMES: GameCard[] = [
  {
    id: 'word-match',
    title: 'Word Match',
    description: 'Match 6 German words to their English meanings.',
    available: true,
  },
  {
    id: 'gender-battle',
    title: 'Gender Battle',
    description: 'Pick der, die, or das for each noun. 10 rounds.',
    available: true,
  },
  {
    id: 'listening-quiz',
    title: 'Listening Quiz',
    description: 'Hear a German word, pick the correct meaning. 10 rounds.',
    available: true,
  },
  {
    id: null,
    title: 'Fill in the Blank',
    description: 'Complete sentences with the correct German word.',
    available: false,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function GamesScreen() {
  const level = useLevelStore((state) => state.level);
  const words = VOCABULARY[level];

  const [activeGame, setActiveGame] = useState<GameId | null>(null);

  // ── Active game screens ──
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
      <Text style={styles.pageTitle}>Mini Games</Text>
      <Text style={styles.pageSubtitle}>Practice German through play.</Text>

      <Text style={[labelStyle, styles.sectionLabel]}>AVAILABLE</Text>

      {GAMES.filter(g => g.available).map((game) => (
        <TouchableOpacity
          key={game.id}
          style={styles.gameRow}
          onPress={() => game.id && setActiveGame(game.id)}
          activeOpacity={0.7}
        >
          <View style={styles.gameRowLeft}>
            <Text style={styles.gameTitle}>{game.title}</Text>
            <Text style={styles.gameDescription}>{game.description}</Text>
          </View>
          <Text style={styles.gameArrow}>→</Text>
        </TouchableOpacity>
      ))}

      <Text style={[labelStyle, styles.sectionLabel]}>COMING SOON</Text>

      {GAMES.filter(g => !g.available).map((game, i) => (
        <View key={i} style={[styles.gameRow, styles.gameRowDisabled]}>
          <View style={styles.gameRowLeft}>
            <Text style={[styles.gameTitle, styles.gameTitleDisabled]}>{game.title}</Text>
            <Text style={styles.gameDescription}>{game.description}</Text>
          </View>
          <View style={styles.soonBadge}>
            <Text style={styles.soonText}>SOON</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    padding: spacing.xxl,
    backgroundColor: colors.background,
  },

  pageTitle: {
    fontFamily: font.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  pageSubtitle: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xxl,
  },

  sectionLabel: {
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },

  // ── Game row ──
  gameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  gameRowDisabled: {
    opacity: 0.5,
  },
  gameRowLeft: {
    flex: 1,
    marginRight: spacing.md,
  },
  gameTitle: {
    fontFamily: font.semiBold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    marginBottom: 3,
  },
  gameTitleDisabled: {
    color: colors.textSecondary,
  },
  gameDescription: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  gameArrow: {
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textMuted,
  },

  // ── Soon badge ──
  soonBadge: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
  },
  soonText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.xxs,
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
});