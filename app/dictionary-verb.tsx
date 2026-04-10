// dictionary-verb.tsx — Full-screen verb detail for the Dictionary
//
// Opened from dictionary.tsx when the user taps a verb row.
// Reads ?id= from the URL to look up the word in ALL_WORDS.
//
// Shows:
//   - Back link + verb header with speaker + level badge
//   - Separable verb banner (if applicable)
//   - Present tense conjugation table (if data is available)
//   - Example sentence
//
// Does NOT show a Perfekt card — that data is not in the vocabulary files.

import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

import { A1_WORDS } from '../src/data/vocabulary/a1';
import { A2_WORDS } from '../src/data/vocabulary/a2';
import { B1_WORDS } from '../src/data/vocabulary/b1';
import { B2_WORDS } from '../src/data/vocabulary/b2';
import type { Word } from '../src/data/vocabulary/types';
import {
  colors, spacing, radius,
} from '../src/styles/theme';
import type { Level } from '../src/store/useLevelStore';

// Local copy of WordWithLevel — same definition as in dictionary.tsx
type WordWithLevel = Word & { level: Level };

// ─── Module-level word list ────────────────────────────────────────────────────
// Same construction as dictionary.tsx — built once at module level.

const ALL_WORDS: WordWithLevel[] = [
  ...A1_WORDS.map(w => ({ ...w, level: 'A1' as Level })),
  ...A2_WORDS.map(w => ({ ...w, level: 'A2' as Level })),
  ...B1_WORDS.map(w => ({ ...w, level: 'B1' as Level })),
  ...B2_WORDS.map(w => ({ ...w, level: 'B2' as Level })),
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Web Speech API — speaks text in German. No-op without speech support.
function speakGerman(text: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'de-DE';
  u.rate = 0.85;
  window.speechSynthesis.speak(u);
}

// True if the verb's ich-form contains a space: "rufe an" → separable
function isSeparable(word: Word): boolean {
  return !!word.conjugations?.ich?.includes(' ');
}

// Extract the separable particle from the ich-form.
// "rufe an" → "an", "fahre ab" → "ab"
function getParticle(word: Word): string {
  return word.conjugations?.ich?.split(' ')[1] ?? '';
}

// Level badge colours
const LEVEL_STYLE: Record<Level, { bg: string; text: string }> = {
  A1: { bg: '#f0fdf4', text: '#16a34a' },
  A2: { bg: '#eff6ff', text: '#2563eb' },
  B1: { bg: '#fffbeb', text: '#f59e0b' },
  B2: { bg: '#fef2f2', text: '#dc2626' },
};

// Pronoun display strings for the conjugation table
const PRONOUNS = [
  { key: 'ich', label: 'ich' },
  { key: 'du',  label: 'du' },
  { key: 'er',  label: 'er · sie · es' },
  { key: 'wir', label: 'wir' },
  { key: 'ihr', label: 'ihr' },
  { key: 'sie', label: 'sie · Sie' },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function DictionaryVerbScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();

  // Look up the word by id
  const word = id ? ALL_WORDS.find(w => w.id === id) : undefined;

  // Navigate back to the dictionary
  function goBack() {
    router.push('/dictionary' as any);
  }

  // ── Not found ──
  if (!word) {
    return (
      <View style={styles.errorContainer}>
        <TouchableOpacity onPress={goBack} style={styles.backLink}>
          <Feather name="arrow-left" size={16} color={colors.accent} />
          <Text style={styles.backLinkText}>Dictionary</Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>Word not found.</Text>
      </View>
    );
  }

  const separable = isSeparable(word);
  const particle  = separable ? getParticle(word) : '';
  const levelStyle = LEVEL_STYLE[word.level];

  // For the separable split example: strip particle from the er-form
  // e.g. word.german = "anrufen", conjugations.er = "ruft an"
  // → display "anrufen → ruft ... an"
  const erForm = word.conjugations?.er ?? '';
  const erStem = separable && erForm.includes(' ')
    ? erForm.split(' ')[0]
    : erForm;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>

      {/* ── Back link ── */}
      <TouchableOpacity onPress={goBack} style={styles.backLink} activeOpacity={0.7}>
        <Feather name="arrow-left" size={16} color={colors.accent} />
        <Text style={styles.backLinkText}>Dictionary</Text>
      </TouchableOpacity>

      {/* ── Verb header ── */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Text style={styles.verbTitle}>{word.german}</Text>
          <Text style={styles.verbEnglish}>{word.english}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={() => speakGerman(word.german)}
            style={styles.speakerBtn}
            activeOpacity={0.7}
          >
            <Feather name="volume-2" size={20} color={colors.accent} />
          </TouchableOpacity>
          {/* Level badge */}
          <View style={[styles.levelBadge, { backgroundColor: levelStyle.bg }]}>
            <Text style={[styles.levelBadgeText, { color: levelStyle.text }]}>
              {word.level}
            </Text>
          </View>
        </View>
      </View>

      {/* ── Separable verb banner ── */}
      {separable && (
        <View style={styles.separableBanner}>
          <Feather name="scissors" size={13} color={colors.accent} style={{ marginRight: 8 }} />
          <View>
            <Text style={styles.separableTitle}>Separable verb</Text>
            {erStem ? (
              <Text style={styles.separableExample}>
                {word.german} → {erStem} ... {particle}
              </Text>
            ) : null}
          </View>
        </View>
      )}

      {/* ── Conjugation table (Präsens) ── */}
      {word.conjugations ? (
        <View style={[styles.card, { marginTop: spacing.xl }]}>
          {/* Table header */}
          <View style={[styles.tableRow, styles.tableHeaderRow]}>
            <Text style={[styles.tablePronoun, styles.tableHeaderText]}>Pronoun</Text>
            <Text style={[styles.tableForm, styles.tableHeaderText]}>Präsens</Text>
          </View>
          {PRONOUNS.map(({ key, label }, i) => {
            // key is 'ich'|'du'|'er'|'wir'|'ihr'|'sie' (from const PRONOUNS as const)
            const conj = word.conjugations!;
            const form = conj[key] ?? '—';
            return (
              <View
                key={key}
                style={[
                  styles.tableRow,
                  // Alternate row background for readability
                  i % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
                ]}
              >
                <Text style={styles.tablePronoun}>{label}</Text>
                <Text style={styles.tableForm}>{form}</Text>
              </View>
            );
          })}
        </View>
      ) : (
        // No conjugation data available — show a soft message
        <View style={[styles.card, { marginTop: spacing.xl }]}>
          <Text style={styles.noConjNote}>
            Conjugation data not available for this verb.
          </Text>
        </View>
      )}

      {/* ── Example sentence ── */}
      {(word.exampleDe || word.exampleEn) && (
        <View style={{ marginTop: spacing.xl }}>
          <Text style={styles.sectionLabel}>EXAMPLE</Text>
          {word.exampleDe ? (
            <Text style={styles.exampleDe}>{word.exampleDe}</Text>
          ) : null}
          {word.exampleEn ? (
            <Text style={styles.exampleEn}>{word.exampleEn}</Text>
          ) : null}
        </View>
      )}

    </ScrollView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop:        spacing.lg,
    paddingBottom:     spacing.hero,
  },

  // ── Back link ──
  backLink: {
    flexDirection:  'row',
    alignItems:     'center',
    gap:            6,
    marginBottom:   spacing.xl,
  },
  backLinkText: {
    fontFamily: 'Inter_500Medium',
    fontSize:   14,
    color:      colors.accent,
  },

  // ── Verb header ──
  headerRow: {
    flexDirection:   'row',
    alignItems:      'flex-start',
    justifyContent:  'space-between',
    marginBottom:    spacing.sm,
  },
  headerLeft: {
    flex: 1,
    marginRight: spacing.md,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           spacing.sm,
  },
  verbTitle: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize:   22,
    color:      colors.textPrimary,
    lineHeight: 28,
  },
  verbEnglish: {
    fontFamily: 'Inter_400Regular',
    fontSize:   14,
    color:      colors.textSecondary,
    marginTop:  4,
  },
  speakerBtn: {
    padding: 4,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical:   3,
    borderRadius:      radius.md,
  },
  levelBadgeText: {
    fontFamily:  'Inter_600SemiBold',
    fontSize:    11,
    lineHeight:  15,
  },

  // ── Separable banner ──
  separableBanner: {
    flexDirection:   'row',
    alignItems:      'flex-start',
    backgroundColor: colors.accentLight,
    borderRadius:    radius.md,
    padding:         spacing.md,
    marginTop:       spacing.lg,
  },
  separableTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize:   13,
    color:      colors.accent,
  },
  separableExample: {
    fontFamily: 'IBMPlexMono_400Regular',
    fontSize:   13,
    color:      colors.accent,
    marginTop:  2,
  },

  // ── Info card ──
  card: {
    backgroundColor: colors.surface,
    borderWidth:     1,
    borderColor:     colors.border,
    borderRadius:    radius.md,
    overflow:        'hidden',
  },

  // ── Conjugation table ──
  tableHeaderRow: {
    backgroundColor: colors.background,
  },
  tableHeaderText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize:   11,
    color:      colors.textSecondary,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection:    'row',
    alignItems:       'center',
    paddingVertical:   10,
    paddingHorizontal: spacing.md,
  },
  tableRowEven: {
    backgroundColor: colors.surface,
  },
  tableRowOdd: {
    backgroundColor: colors.background,
  },
  tablePronoun: {
    fontFamily: 'IBMPlexMono_400Regular',
    fontSize:   13,
    color:      colors.textSecondary,
    width:      130,
  },
  tableForm: {
    fontFamily: 'IBMPlexMono_400Regular',
    fontSize:   13,
    color:      colors.textPrimary,
    flex:       1,
  },

  noConjNote: {
    fontFamily: 'Inter_400Regular',
    fontSize:   13,
    color:      colors.textSecondary,
    padding:    spacing.md,
    textAlign:  'center',
  },

  // ── Example sentence ──
  sectionLabel: {
    fontFamily:    'Inter_500Medium',
    fontSize:      10,
    color:         colors.textSecondary,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.9,
    marginBottom:  spacing.sm,
  },
  exampleDe: {
    fontFamily:   'IBMPlexMono_700Bold',
    fontSize:     13,
    color:        colors.textPrimary,
    marginBottom: 4,
  },
  exampleEn: {
    fontFamily: 'Inter_400Regular',
    fontSize:   12,
    color:      colors.textSecondary,
  },

  // ── Error ──
  errorContainer: {
    flex:              1,
    backgroundColor:   colors.background,
    paddingHorizontal: spacing.xl,
    paddingTop:        spacing.xl,
  },
  errorText: {
    fontFamily: 'Inter_400Regular',
    fontSize:   14,
    color:      colors.textSecondary,
    marginTop:  spacing.xl,
  },
});
