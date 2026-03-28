// exam.tsx — Exam Prep screen
//
// Shows 4 sub-section cards: Reading, Listening, Writing, Speaking.
// Tapping a card opens that sub-section.
// Reading is fully implemented. The others show "coming soon" until built.

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

// ─── Sub-section definitions ──────────────────────────────────────────────────

type SubSection = 'reading' | 'listening' | 'writing' | 'speaking';

type SubSectionCard = {
  id: SubSection;
  emoji: string;
  title: string;
  description: string;
  available: boolean; // false = show "coming soon"
};

const SUB_SECTIONS: SubSectionCard[] = [
  {
    id: 'reading',
    emoji: '📖',
    title: 'Reading',
    description: 'Read a short German passage and answer comprehension questions.',
    available: true,
  },
  {
    id: 'listening',
    emoji: '🎧',
    title: 'Listening',
    description: 'Listen to a German passage read aloud and answer questions.',
    available: true,
  },
  {
    id: 'writing',
    emoji: '✍️',
    title: 'Writing',
    description: 'Write a short response to a prompt and get AI feedback.',
    available: true,
  },
  {
    id: 'speaking',
    emoji: '🎤',
    title: 'Speaking',
    description: 'Speak or type a response and get AI pronunciation feedback.',
    available: true,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ExamScreen() {
  // null = show the selector | a SubSection value = show that sub-section
  const [activeSection, setActiveSection] = useState<SubSection | null>(null);

  // ─── Sub-section views ─────────────────────────────────────────────────────
  if (activeSection === 'reading') {
    return (
      <ScrollView style={styles.subSectionContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setActiveSection(null)}
        >
          <Text style={styles.backButtonText}>← Exam Prep</Text>
        </TouchableOpacity>
        <ReadingExercise />
      </ScrollView>
    );
  }

  if (activeSection === 'listening') {
    return (
      <View style={styles.subSectionContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setActiveSection(null)}
        >
          <Text style={styles.backButtonText}>← Exam Prep</Text>
        </TouchableOpacity>
        <ListeningExercise />
      </View>
    );
  }

  if (activeSection === 'writing') {
    return (
      <View style={styles.subSectionContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setActiveSection(null)}
        >
          <Text style={styles.backButtonText}>← Exam Prep</Text>
        </TouchableOpacity>
        <WritingExercise />
      </View>
    );
  }

  if (activeSection === 'speaking') {
    return (
      <View style={styles.subSectionContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setActiveSection(null)}
        >
          <Text style={styles.backButtonText}>← Exam Prep</Text>
        </TouchableOpacity>
        <SpeakingExercise />
      </View>
    );
  }

  // ─── Selector screen ───────────────────────────────────────────────────────
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.screenTitle}>Exam Prep</Text>
      <Text style={styles.screenSubtitle}>
        Practise the four skills tested in the Goethe Institut A1 exam.
      </Text>

      {SUB_SECTIONS.map((section) => (
        <TouchableOpacity
          key={section.id}
          style={[styles.card, !section.available && styles.cardDisabled]}
          onPress={() => section.available && setActiveSection(section.id)}
          disabled={!section.available}
        >
          <Text style={styles.cardEmoji}>{section.emoji}</Text>
          <View style={styles.cardContent}>
            <View style={styles.cardTitleRow}>
              <Text style={[styles.cardTitle, !section.available && styles.cardTitleDisabled]}>
                {section.title}
              </Text>
              {!section.available && (
                <View style={styles.comingSoonBadge}>
                  <Text style={styles.comingSoonText}>Soon</Text>
                </View>
              )}
            </View>
            <Text style={styles.cardDescription}>{section.description}</Text>
          </View>
          {section.available && <Text style={styles.cardArrow}>→</Text>}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // ── Selector ──
  container: {
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 6,
  },
  screenSubtitle: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 28,
    lineHeight: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: '#eeeeee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    gap: 14,
  },
  cardDisabled: {
    opacity: 0.55,
  },
  cardEmoji: {
    fontSize: 32,
  },
  cardContent: {
    flex: 1,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  cardTitleDisabled: {
    color: '#aaaaaa',
  },
  cardDescription: {
    fontSize: 13,
    color: '#888888',
    lineHeight: 18,
  },
  cardArrow: {
    fontSize: 18,
    color: '#aaaaaa',
  },
  comingSoonBadge: {
    backgroundColor: '#eeeeee',
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  comingSoonText: {
    fontSize: 10,
    color: '#aaaaaa',
    fontWeight: '600',
  },

  // ── Sub-section wrapper ──
  subSectionContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButtonText: {
    fontSize: 14,
    color: '#4fc3f7',
    fontWeight: '600',
  },
});
