// lesson.tsx — Lesson detail screen
//
// Reads ?topic= and ?level= query params from the URL.
// Marks the lesson as viewed in AsyncStorage on mount (stores ISO timestamp).
// Sections: Header → Building On (if present) → Explanation → Key Rules →
//           Examples → Common Mistake → "Practice This Topic" button.

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LESSONS } from '../src/data/lessons/index';
import type { Level } from '../src/store/useLevelStore';

// ─── Component ────────────────────────────────────────────────────────────────

export default function LessonScreen() {
  const router = useRouter();
  const { topic: rawTopic, level: rawLevel } = useLocalSearchParams<{
    topic?: string;
    level?: string;
  }>();

  // Decode URL-encoded topic (topics contain colons, slashes, spaces)
  const topic = rawTopic ? decodeURIComponent(rawTopic) : '';
  const level = (rawLevel as Level) ?? 'A1';

  // Find the lesson in the data
  const lesson = LESSONS[level]?.find((l) => l.topic === topic) ?? null;

  // ── Mark lesson as viewed on mount ──
  // Stores a Record<topic, ISO timestamp string> in AsyncStorage.
  // This powers the green dot and "last studied X days ago" in the selector.
  useEffect(() => {
    if (!lesson) return;
    const storageKey = `lessons_viewed_${lesson.level}`;
    AsyncStorage.getItem(storageKey).then((raw) => {
      const viewed: Record<string, string> = raw ? JSON.parse(raw) : {};
      // Always update the timestamp (so "last studied" is accurate on revisit)
      viewed[lesson.topic] = new Date().toISOString();
      AsyncStorage.setItem(storageKey, JSON.stringify(viewed));
    });
  }, [lesson?.topic, lesson?.level]);

  // ── Go back to the lessons selector ──
  function goBack() {
    router.push('/lessons' as any);
  }

  // ── Navigate to grammar screen with this topic pre-selected ──
  function goToPractice() {
    if (!lesson) return;
    router.push(`/grammar?topic=${encodeURIComponent(lesson.topic)}` as any);
  }

  // ── Not found ──
  if (!lesson) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Lesson not found.</Text>
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.backLink}>← Back to Lessons</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Split explanation into paragraphs ──
  const paragraphs = lesson.explanation.split('\n\n');

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ── 1. Header ── */}
      <TouchableOpacity onPress={goBack} style={styles.backRow}>
        <Text style={styles.backLink}>← Lessons</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{lesson.title}</Text>

      {/* Level badge */}
      <View style={styles.levelBadge}>
        <Text style={styles.levelBadgeText}>{lesson.level}</Text>
      </View>

      {/* ── 2. Building On banner (A2 Reflexive verbs only) ── */}
      {lesson.buildingOn ? (
        <View style={styles.buildingOnBox}>
          <Text style={styles.buildingOnText}>
            Builds on: {lesson.buildingOn}
          </Text>
        </View>
      ) : null}

      {/* ── 3. Explanation ── */}
      <Text style={styles.sectionLabel}>EXPLANATION</Text>
      {paragraphs.map((para, i) => (
        <Text key={i} style={styles.explanationText}>
          {para}
        </Text>
      ))}

      {/* ── 4. Key Rules ── */}
      <Text style={[styles.sectionLabel, styles.sectionLabelSpacing]}>KEY RULES</Text>
      {lesson.keyPoints.map((point, i) => (
        <Text key={i} style={styles.keyPoint}>
          — {point}
        </Text>
      ))}

      {/* ── 5. Examples ── */}
      <Text style={[styles.sectionLabel, styles.sectionLabelSpacing]}>EXAMPLES</Text>
      {lesson.examples.map((ex, i) => (
        <View key={i} style={styles.exampleCard}>
          <Text style={styles.exampleGerman}>{ex.german}</Text>
          <Text style={styles.exampleEnglish}>{ex.english}</Text>
          {ex.note ? <Text style={styles.exampleNote}>{ex.note}</Text> : null}
        </View>
      ))}

      {/* ── 6. Common Mistake ── */}
      <Text style={[styles.sectionLabel, styles.sectionLabelSpacing]}>COMMON MISTAKE</Text>
      <View style={styles.mistakeBox}>
        <Text style={styles.mistakeText}>{lesson.commonMistake}</Text>
      </View>

      {/* ── 7. Practice button ── */}
      <TouchableOpacity style={styles.practiceButton} onPress={goToPractice} activeOpacity={0.8}>
        <Text style={styles.practiceButtonText}>PRACTICE THIS TOPIC</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  scroll: {
    flex:            1,
    backgroundColor: '#fafafa',
  },
  content: {
    padding:       20,
    paddingBottom: 48,
  },

  // ── Header ──
  backRow: {
    marginBottom: 12,
  },
  backLink: {
    fontFamily: 'IBMPlexMono_400Regular',
    fontSize:   13,
    color:      '#2563eb',
  },
  title: {
    fontFamily:   'IBMPlexMono_700Bold',
    fontSize:     20,
    color:        '#111111',
    marginBottom: 10,
    lineHeight:   28,
  },
  levelBadge: {
    alignSelf:       'flex-start',
    backgroundColor: '#eff6ff',
    borderWidth:     1,
    borderColor:     '#bfdbfe',
    borderRadius:    4,
    paddingHorizontal: 8,
    paddingVertical:   3,
    marginBottom:    20,
  },
  levelBadgeText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize:   11,
    color:      '#2563eb',
  },

  // ── Building On banner ──
  buildingOnBox: {
    backgroundColor: '#eff6ff',
    borderWidth:     1,
    borderColor:     '#2563eb',
    borderRadius:    4,
    padding:         12,
    marginBottom:    20,
  },
  buildingOnText: {
    fontFamily: 'Inter_400Regular',
    fontSize:   13,
    color:      '#2563eb',
  },

  // ── Section labels ──
  sectionLabel: {
    fontFamily:    'Inter_600SemiBold',
    fontSize:      11,
    color:         '#888888',
    letterSpacing: 0.08 * 11,
    marginBottom:  10,
  },
  sectionLabelSpacing: {
    marginTop: 24,
  },

  // ── Explanation ──
  explanationText: {
    fontFamily:   'Inter_400Regular',
    fontSize:     14,
    color:        '#333333',
    lineHeight:   22,
    marginBottom: 12,
  },

  // ── Key rules ──
  keyPoint: {
    fontFamily:   'Inter_400Regular',
    fontSize:     13,
    color:        '#333333',
    lineHeight:   20,
    marginBottom: 6,
    paddingLeft:  4,
  },

  // ── Examples ──
  exampleCard: {
    backgroundColor: '#ffffff',
    borderWidth:     1,
    borderColor:     '#e0e0e0',
    borderRadius:    4,
    padding:         16,
    marginBottom:    8,
  },
  exampleGerman: {
    fontFamily:   'IBMPlexMono_600SemiBold',
    fontSize:     14,
    color:        '#111111',
    marginBottom: 4,
  },
  exampleEnglish: {
    fontFamily:   'Inter_400Regular',
    fontSize:     12,
    color:        '#888888',
    marginBottom: 2,
  },
  exampleNote: {
    fontFamily: 'Inter_400Regular',
    fontSize:   11,
    color:      '#2563eb',
    marginTop:  4,
  },

  // ── Common mistake ──
  mistakeBox: {
    borderLeftWidth:  3,
    borderLeftColor:  '#dc2626',
    backgroundColor:  '#fef2f2',
    paddingHorizontal: 14,
    paddingVertical:   12,
    borderRadius:     4,
  },
  mistakeText: {
    fontFamily: 'IBMPlexMono_400Regular',
    fontSize:   13,
    color:      '#111111',
    lineHeight: 20,
  },

  // ── Practice button ──
  practiceButton: {
    backgroundColor: '#111111',
    borderRadius:    4,
    paddingVertical: 14,
    alignItems:      'center',
    marginTop:       28,
  },
  practiceButtonText: {
    fontFamily:    'IBMPlexMono_600SemiBold',
    fontSize:      13,
    color:         '#ffffff',
    letterSpacing: 0.5,
  },

  // ── Error ──
  errorContainer: {
    flex:            1,
    backgroundColor: '#fafafa',
    alignItems:      'center',
    justifyContent:  'center',
    padding:         32,
  },
  errorText: {
    fontFamily:   'IBMPlexMono_600SemiBold',
    fontSize:     15,
    color:        '#111111',
    marginBottom: 12,
  },
});
