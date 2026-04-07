// lessons.tsx — Lesson selector screen
//
// Shows a 2-column card grid of lessons for the current level.
// Each card displays the lesson title, an estimated read time, a colour-coded
// viewed dot, and a "Last studied X days ago" timestamp.
//
// Viewed state is stored in Supabase (lesson_progress table) via lessonProgressService.
// useFocusEffect reloads the viewed map every time the user returns from a
// detail screen so the dot and timestamp update immediately.

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import useLevelStore from '../src/store/useLevelStore';
import { LESSONS } from '../src/data/lessons/index';
import { loadViewedMap } from '../src/lib/lessonProgressService';
import { getTodayString } from '../src/lib/dateUtils';

// ─── Component ────────────────────────────────────────────────────────────────

export default function LessonsScreen() {
  const level  = useLevelStore((state) => state.level);
  const router = useRouter();

  // Map of topic → ISO timestamp string for lessons the user has viewed
  const [viewedMap, setViewedMap] = useState<Record<string, string>>({});

  const lessons = LESSONS[level];

  // ── Reload viewed state every time we return to this screen ──
  // Reads from Supabase so viewed dots and timestamps stay in sync across devices.
  useFocusEffect(
    useCallback(() => {
      loadViewedMap(level).then(setViewedMap);
    }, [level])
  );

  // ── How many lessons have been viewed ──
  const viewedCount = Object.keys(viewedMap).length;

  // ── Navigate to detail screen ──
  function openLesson(topic: string) {
    router.push(`/lesson?topic=${encodeURIComponent(topic)}&level=${level}` as any);
  }

  // ── Build the "last studied" label for a card ──
  function lastStudiedLabel(topic: string): string | null {
    const timestamp = viewedMap[topic];
    if (!timestamp) return null;

    const studiedDate = timestamp.slice(0, 10); // YYYY-MM-DD
    const today       = getTodayString();

    if (studiedDate === today) return 'Last studied today';

    // Calculate the difference in days
    const msPerDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(
      (new Date(today).getTime() - new Date(studiedDate).getTime()) / msPerDay
    );
    if (diffDays === 1) return 'Last studied yesterday';
    return `Last studied ${diffDays} days ago`;
  }

  // ── B2 empty state ──
  if (lessons.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>
          {level === 'B2' ? 'B2 lessons coming soon.' : `No ${level} lessons yet.`}
        </Text>
        <Text style={styles.emptySubtitle}>Switch to A1, A2, or B1 to study.</Text>
      </View>
    );
  }

  // ── Render ──
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Page header */}
      <View style={styles.header}>
        <Text style={styles.title}>Lessons</Text>
        <Text style={styles.subtitle}>Grammar explanations for {level}</Text>
      </View>

      {/* Progress line */}
      <Text style={styles.progressLabel}>
        {viewedCount} / {lessons.length} LESSONS READ
      </Text>

      {/* 2-column card grid */}
      <View style={styles.grid}>
        {lessons.map((lesson, index) => {
          const isViewed    = !!viewedMap[lesson.topic];
          const label       = lastStudiedLabel(lesson.topic);
          const lessonNumber = String(index + 1).padStart(2, '0');

          return (
            <TouchableOpacity
              key={lesson.topic}
              style={styles.card}
              onPress={() => openLesson(lesson.topic)}
              activeOpacity={0.75}
            >
              {/* Lesson number — top left */}
              <Text style={styles.lessonNumber}>{lessonNumber}</Text>

              {/* Top row: title (left) + read time (right) */}
              <View style={styles.cardTopRow}>
                <Text style={styles.cardTitle} numberOfLines={2}>
                  {lesson.title}
                </Text>
                <Text style={styles.readTime}>~3 min</Text>
              </View>

              {/* Bottom row: checkmark (viewed) or dot (unread) + timestamp */}
              <View style={styles.cardFooter}>
                {isViewed
                  ? <Feather name="check" size={14} color="#16a34a" />
                  : <View style={styles.dot} />
                }
                {label ? (
                  <Text style={styles.timestamp}>{label}</Text>
                ) : null}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
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
    padding:      20,
    paddingBottom: 40,
  },

  // ── Header ──
  header: {
    marginBottom: 4,
  },
  title: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize:   22,
    color:      '#111111',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize:   13,
    color:      '#888888',
  },

  // ── Progress label ──
  progressLabel: {
    fontFamily:    'Inter_600SemiBold',
    fontSize:      11,
    color:         '#888888',
    letterSpacing: 0.08 * 11,
    marginTop:     16,
    marginBottom:  16,
  },

  // ── Card grid ──
  grid: {
    flexDirection:  'row',
    flexWrap:       'wrap',
    gap:            12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderWidth:     1,
    borderColor:     '#e0e0e0',
    borderRadius:    4,
    padding:         14,
    // 2-column layout: each card takes just under half the width minus gap
    width:           Platform.OS === 'web' ? 'calc(50% - 6px)' as any : '48%',
    minHeight:       110,
    justifyContent:  'space-between',
  },

  // ── Card contents ──
  lessonNumber: {
    fontFamily:   'IBMPlexMono_400Regular',
    fontSize:     10,
    color:        '#888888',
    marginBottom: 6,
  },
  cardTopRow: {
    flexDirection:  'row',
    alignItems:     'flex-start',
    justifyContent: 'space-between',
    gap:            6,
    marginBottom:   12,
  },
  cardTitle: {
    fontFamily: 'IBMPlexMono_600SemiBold',
    fontSize:   13,
    color:      '#111111',
    lineHeight: 18,
    flex:       1,
  },
  readTime: {
    fontFamily:  'Inter_400Regular',
    fontSize:    11,
    color:       '#888888',
    marginTop:   1, // nudge down slightly to align with first line of title
    flexShrink:  0,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           6,
  },
  dot: {
    width:           8,
    height:          8,
    borderRadius:    4,
    backgroundColor: '#e0e0e0',  // always grey — only shown when unread
  },
  timestamp: {
    fontFamily: 'Inter_400Regular',
    fontSize:   11,
    color:      '#888888',
    flex:       1,
  },

  // ── Empty state ──
  emptyContainer: {
    flex:            1,
    backgroundColor: '#fafafa',
    alignItems:      'center',
    justifyContent:  'center',
    padding:         32,
  },
  emptyTitle: {
    fontFamily:  'IBMPlexMono_600SemiBold',
    fontSize:    15,
    color:       '#111111',
    textAlign:   'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize:   13,
    color:      '#888888',
    textAlign:  'center',
  },
});
