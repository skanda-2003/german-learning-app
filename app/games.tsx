// games.tsx — Mini Games screen
//
// Shows a 2-column card grid of available games.
// Each card shows the game name, description, and best score if played.
//
// Active games:
//   Word Match       — match 6 German words to their English meanings
//   Gender Battle    — pick der / die / das for a noun, 10 rounds
//   Listening Quiz   — hear a German word, pick the correct meaning, 10 rounds
//   Sentence Builder — arrange word tiles into the correct German sentence, 10 rounds
//   Fill in the Blank — Gemini generates a sentence with a blank; type the missing word, 10 rounds

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import useLevelStore from '../src/store/useLevelStore';
import { VOCABULARY } from '../src/data/vocabulary';
import { loadAllScores } from '../src/lib/scoresService';
import WordMatchGame from '../src/components/games/WordMatchGame';
import GenderBattleGame from '../src/components/games/GenderBattleGame';
import ListeningQuizGame from '../src/components/games/ListeningQuizGame';
import SentenceBuilderGame from '../src/components/games/SentenceBuilderGame';
import FillInBlankGame from '../src/components/games/FillInBlankGame';
import { colors, font, fontSize, spacing, radius, labelStyle } from '../src/styles/theme';

// ─── Types ─────────────────────────────────────────────────────────────────────

type GameId = 'word-match' | 'gender-battle' | 'listening-quiz' | 'sentence-builder' | 'fill-in-blank';

type GameDef = {
  id: GameId | null;
  scoreKey: string | null;  // key in loadAllScores result
  title: string;
  description: string;
  available: boolean;
};

const GAMES: GameDef[] = [
  {
    id: 'word-match',
    scoreKey: 'game_word_match',
    title: 'Word Match',
    description: 'Match 6 German words to their English meanings.',
    available: true,
  },
  {
    id: 'gender-battle',
    scoreKey: 'game_gender_battle',
    title: 'Gender Battle',
    description: 'Pick der, die, or das for each noun. 10 rounds.',
    available: true,
  },
  {
    id: 'listening-quiz',
    scoreKey: 'game_listening_quiz',
    title: 'Listening Quiz',
    description: 'Hear a German word, pick the correct meaning. 10 rounds.',
    available: true,
  },
  {
    id: 'sentence-builder',
    scoreKey: 'game_sentence_builder',
    title: 'Sentence Builder',
    description: 'Arrange German word tiles into the correct sentence. 10 rounds.',
    available: true,
  },
  {
    id: 'fill-in-blank',
    scoreKey: 'game_fill_in_blank',
    title: 'Fill in the Blank',
    description: 'Complete Gemini-generated sentences with the correct German word.',
    available: true,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function GamesScreen() {
  const level = useLevelStore((state) => state.level);
  const words = VOCABULARY[level];

  const [activeGame, setActiveGame] = useState<GameId | null>(null);

  // Best % per game — loaded from Supabase on focus
  type ScoreMap = Record<string, { bestScore: number; bestTotal: number; sessionsCompleted: number }>;
  const [scores, setScores] = useState<ScoreMap>({});

  useFocusEffect(
    useCallback(() => {
      loadAllScores().then(setScores);
    }, [])
  );

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
  if (activeGame === 'sentence-builder') {
    return <SentenceBuilderGame words={words} onExit={() => setActiveGame(null)} />;
  }
  if (activeGame === 'fill-in-blank') {
    return <FillInBlankGame words={words} level={level} onExit={() => setActiveGame(null)} />;
  }

  // ── Selector screen ──
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>Mini Games</Text>
      <Text style={styles.pageSubtitle}>Practise German through play.</Text>

      <Text style={[labelStyle, styles.gridLabel]}>GAMES</Text>

      {/* 2-column card grid */}
      <View style={styles.grid}>
        {GAMES.map((game, i) => {
          // Work out the best score string to show in the top-right corner
          let scoreBadge: string | null = null;
          if (game.scoreKey) {
            const s = scores[game.scoreKey];
            if (s && s.bestTotal > 0) {
              scoreBadge = `${Math.round((s.bestScore / s.bestTotal) * 100)}%`;
            } else if (s && s.sessionsCompleted > 0) {
              // word match uses sessionsCompleted (no score %)
              scoreBadge = `${s.sessionsCompleted}×`;
            }
          }

          if (game.available) {
            return (
              <TouchableOpacity
                key={game.id ?? i}
                style={styles.card}
                onPress={() => game.id && setActiveGame(game.id)}
                activeOpacity={0.75}
              >
                {/* Top row: title + score badge */}
                <View style={styles.cardTopRow}>
                  <Text style={styles.cardTitle}>{game.title}</Text>
                  {scoreBadge && (
                    <Text style={styles.scoreBadge}>{scoreBadge}</Text>
                  )}
                </View>
                <Text style={styles.cardDescription}>{game.description}</Text>
              </TouchableOpacity>
            );
          }

          // Unavailable game card
          return (
            <View key={i} style={[styles.card, styles.cardDisabled]}>
              <View style={styles.cardTopRow}>
                <Text style={[styles.cardTitle, styles.cardTitleDisabled]}>{game.title}</Text>
                <View style={styles.soonBadge}>
                  <Text style={styles.soonText}>SOON</Text>
                </View>
              </View>
              <Text style={styles.cardDescription}>{game.description}</Text>
            </View>
          );
        })}
      </View>
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

  gridLabel: {
    marginBottom: spacing.md,
  },

  // ── Card grid ──
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  card: {
    // Each card takes ~half the width minus half the gap
    width: '47%' as any,
    minWidth: 140,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.lg,
  },
  cardDisabled: {
    opacity: 0.45,
  },

  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
    gap: spacing.xs,
  },
  cardTitle: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    flex: 1,
  },
  cardTitleDisabled: {
    color: colors.textSecondary,
  },
  cardDescription: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    lineHeight: 17,
  },

  // Best score shown top-right
  scoreBadge: {
    fontFamily: font.semiBold,
    fontSize: fontSize.xs,
    color: colors.accent,
  },

  // "SOON" badge for unavailable games
  soonBadge: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingVertical: 1,
    paddingHorizontal: spacing.xs,
  },
  soonText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.xxs,
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
});