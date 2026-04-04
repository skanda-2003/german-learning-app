// exam.tsx — Exam Prep screen
//
// Card grid of exam skills (reading, comprehension, listening, writing, speaking).
// Each card shows the skill name, description, and last score if attempted.
// Tapping a card opens that sub-section.

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import ReadingExercise from '../src/components/exam/ReadingExercise';
import ListeningExercise from '../src/components/exam/ListeningExercise';
import WritingExercise from '../src/components/exam/WritingExercise';
import SpeakingExercise from '../src/components/exam/SpeakingExercise';
import ComprehensionExercise from '../src/components/exam/ComprehensionExercise';
import { loadAllScores } from '../src/lib/scoresService';
import { colors, font, fontSize, spacing, radius, labelStyle } from '../src/styles/theme';

// ─── Types ─────────────────────────────────────────────────────────────────────

type SubSection = 'reading' | 'listening' | 'writing' | 'speaking' | 'comprehension';

type SubSectionDef = {
  id: SubSection;
  scoreKey: string;
  title: string;
  description: string;
  // 'percent' sections show a best %; 'count' sections show sessions completed
  scoreType: 'percent' | 'count';
};

const SUB_SECTIONS: SubSectionDef[] = [
  {
    id: 'reading',
    scoreKey: 'exam_reading',
    title: 'Reading',
    description: 'Read a short German passage and answer comprehension questions.',
    scoreType: 'percent',
  },
  {
    id: 'comprehension',
    scoreKey: 'exam_comprehension',
    title: 'Comprehension',
    description: 'Read a notice, ad, or short text and answer in German with AI feedback.',
    scoreType: 'count',
  },
  {
    id: 'listening',
    scoreKey: 'exam_listening',
    title: 'Listening',
    description: 'Listen to a passage read aloud and answer questions.',
    scoreType: 'percent',
  },
  {
    id: 'writing',
    scoreKey: 'exam_writing',
    title: 'Writing',
    description: 'Write a response to a prompt and get AI feedback.',
    scoreType: 'count',
  },
  {
    id: 'speaking',
    scoreKey: 'exam_speaking',
    title: 'Speaking',
    description: 'Speak or type a response and get AI feedback.',
    scoreType: 'count',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ExamScreen() {
  const [activeSection, setActiveSection] = useState<SubSection | null>(null);

  type ScoreMap = Record<string, { bestScore: number; bestTotal: number; sessionsCompleted: number }>;
  const [scores, setScores] = useState<ScoreMap>({});

  useFocusEffect(
    useCallback(() => {
      loadAllScores().then(setScores);
    }, [])
  );

  // ── Back button shown inside each sub-section ──
  const backButton = (
    <TouchableOpacity style={styles.backButton} onPress={() => setActiveSection(null)}>
      <Text style={styles.backText}>← Exam Prep</Text>
    </TouchableOpacity>
  );

  if (activeSection === 'reading') {
    return (
      <ScrollView style={styles.subContainer}>
        {backButton}
        <ReadingExercise />
      </ScrollView>
    );
  }
  if (activeSection === 'comprehension') {
    return (
      <View style={styles.subContainer}>
        {backButton}
        <ComprehensionExercise />
      </View>
    );
  }
  if (activeSection === 'listening') {
    return (
      <View style={styles.subContainer}>
        {backButton}
        <ListeningExercise />
      </View>
    );
  }
  if (activeSection === 'writing') {
    return (
      <View style={styles.subContainer}>
        {backButton}
        <WritingExercise />
      </View>
    );
  }
  if (activeSection === 'speaking') {
    return (
      <View style={styles.subContainer}>
        {backButton}
        <SpeakingExercise />
      </View>
    );
  }
  // ─── Selector ─────────────────────────────────────────────────────────────
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>Exam Prep</Text>
      <Text style={styles.pageSubtitle}>
        Practise reading, listening, writing, speaking, and real-world text comprehension.
      </Text>

      <Text style={[labelStyle, styles.gridLabel]}>EXAM SKILLS</Text>

      {/* Card grid (wraps to multiple rows) */}
      <View style={styles.grid}>
        {SUB_SECTIONS.map((section) => {
          const s = scores[section.scoreKey];

          // Build the score badge string
          let scoreBadge: string | null = null;
          if (s) {
            if (section.scoreType === 'percent' && s.bestTotal > 0) {
              scoreBadge = `${Math.round((s.bestScore / s.bestTotal) * 100)}%`;
            } else if (section.scoreType === 'count' && s.sessionsCompleted > 0) {
              scoreBadge = `${s.sessionsCompleted} session${s.sessionsCompleted === 1 ? '' : 's'}`;
            }
          }

          return (
            <TouchableOpacity
              key={section.id}
              style={styles.card}
              onPress={() => setActiveSection(section.id)}
              activeOpacity={0.75}
            >
              {/* Top row: title + score badge */}
              <View style={styles.cardTopRow}>
                <Text style={styles.cardTitle}>{section.title}</Text>
                {scoreBadge && (
                  <Text style={styles.scoreBadge}>{scoreBadge}</Text>
                )}
              </View>
              <Text style={styles.cardDescription}>{section.description}</Text>
            </TouchableOpacity>
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
    lineHeight: 20,
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
    width: '47%' as any,
    minWidth: 140,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.lg,
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
  cardDescription: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    lineHeight: 17,
  },

  // Score shown top-right of card (blue for %, muted for count)
  scoreBadge: {
    fontFamily: font.semiBold,
    fontSize: fontSize.xs,
    color: colors.accent,
  },

  // ── Sub-section wrapper ──
  subContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backButton: {
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.accent,
  },
});