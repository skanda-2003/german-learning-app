// exam.tsx — Exam Prep screen
//
// Shows 4 sub-section cards: Reading, Listening, Writing, Speaking.
// Tapping a card opens that sub-section.

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ReadingExercise from '../src/components/exam/ReadingExercise';
import ListeningExercise from '../src/components/exam/ListeningExercise';
import WritingExercise from '../src/components/exam/WritingExercise';
import SpeakingExercise from '../src/components/exam/SpeakingExercise';
import {
  colors, font, fontSize, spacing,
  labelStyle,
} from '../src/styles/theme';

// ─── Types ─────────────────────────────────────────────────────────────────────

type SubSection = 'reading' | 'listening' | 'writing' | 'speaking';

type SubSectionCard = {
  id: SubSection;
  title: string;
  description: string;
};

const SUB_SECTIONS: SubSectionCard[] = [
  {
    id: 'reading',
    title: 'Reading',
    description: 'Read a short German passage and answer comprehension questions.',
  },
  {
    id: 'listening',
    title: 'Listening',
    description: 'Listen to a German passage read aloud and answer questions.',
  },
  {
    id: 'writing',
    title: 'Writing',
    description: 'Write a short response to a prompt and get AI feedback.',
  },
  {
    id: 'speaking',
    title: 'Speaking',
    description: 'Speak or type a response and get AI pronunciation feedback.',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ExamScreen() {
  const [activeSection, setActiveSection] = useState<SubSection | null>(null);

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
        Practise the four skills tested in the Goethe Institut A1 exam.
      </Text>

      <Text style={[labelStyle, styles.sectionLabel]}>FOUR SKILLS</Text>

      {SUB_SECTIONS.map((section) => (
        <TouchableOpacity
          key={section.id}
          style={styles.row}
          onPress={() => setActiveSection(section.id)}
          activeOpacity={0.7}
        >
          <View style={styles.rowLeft}>
            <Text style={styles.rowTitle}>{section.title}</Text>
            <Text style={styles.rowDescription}>{section.description}</Text>
          </View>
          <Text style={styles.rowArrow}>→</Text>
        </TouchableOpacity>
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
    lineHeight: 20,
  },

  sectionLabel: {
    marginBottom: spacing.sm,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowLeft: {
    flex: 1,
    marginRight: spacing.md,
  },
  rowTitle: {
    fontFamily: font.semiBold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    marginBottom: 3,
  },
  rowDescription: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  rowArrow: {
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textMuted,
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