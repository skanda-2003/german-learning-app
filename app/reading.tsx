// reading.tsx — Reading Mode screen
//
// Displays a short pre-written German passage at the current level.
// The user can tap any word to look it up in the A1 vocabulary list —
// shows the German word (with article for nouns), English translation,
// and part of speech. No questions, no scoring — pure reading.
//
// Passages shuffle on mount so the user doesn't always start with the same one.

import { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { VOCABULARY } from '../src/data/vocabulary';
import type { Word } from '../src/data/vocabulary/types';
import { PASSAGES } from '../src/data/passages';
import useLevelStore from '../src/store/useLevelStore';
import {
  colors,
  font,
  fontSize,
  spacing,
  radius,
  cardStyle,
  labelStyle,
} from '../src/styles/theme';

// ─── Word lookup ──────────────────────────────────────────────────────────────
// Tries to find a tapped word in the vocabulary list.
//
// Handles three cases:
//   1. Direct match — works for adjectives, adverbs, infinitives
//   2. Noun match — vocab stores "der Apfel", user taps "Apfel", we strip the article
//   3. Conjugated verb — strip common endings (-t, -st, -en, -e, -est, -et) to
//      recover the stem, reconstruct the infinitive, then try to match.
//      Also reverses umlauts (ä→a, ö→o, ü→u) for strong verbs like "fährt" → "fahren".

function tryMatch(candidate: string, vocab: Word[]): Word | null {
  // Exact match
  const exact = vocab.find((w) => w.german.toLowerCase() === candidate);
  if (exact) return exact;

  // Noun stored as "der/die/das Word"
  const nounMatch = vocab.find((w) => {
    const parts = w.german.split(' ');
    return parts.length === 2 && parts[1].toLowerCase() === candidate;
  });
  return nounMatch ?? null;
}

function buildInfinitiveAttempts(lower: string): string[] {
  const attempts: string[] = [lower];

  // Helper: given a stem, add the infinitive suffix and record it
  function addInfinitive(stem: string) {
    if (stem.length < 2) return;              // stems shorter than 2 chars are noise
    attempts.push(stem + 'en');               // standard: komm → kommen
    attempts.push(stem + 'n');               // for stems ending in -el/-er: lächel → lächeln
  }

  // Strip endings — longest first to avoid partial matches (e.g. -est before -st)
  if (lower.endsWith('est')) addInfinitive(lower.slice(0, -3));   // du arbeitest → arbeit
  else if (lower.endsWith('st')) addInfinitive(lower.slice(0, -2)); // du kommst → komm
  if (lower.endsWith('et'))  addInfinitive(lower.slice(0, -2));   // ihr arbeitet → arbeit
  else if (lower.endsWith('t'))  addInfinitive(lower.slice(0, -1)); // er kommt → komm
  if (lower.endsWith('e'))   addInfinitive(lower.slice(0, -1));   // ich komme → komm
  if (lower.endsWith('en'))  attempts.push(lower);                // might already be infinitive

  // Umlaut reversal for strong verbs: fährt → fahrt → fahr → fahren
  const plain = lower.replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u');
  if (plain !== lower) {
    // Recursively build attempts on the de-umlauted form (without umlaut reversal again)
    if (plain.endsWith('est')) addInfinitive(plain.slice(0, -3));
    else if (plain.endsWith('st')) addInfinitive(plain.slice(0, -2));
    if (plain.endsWith('et'))  addInfinitive(plain.slice(0, -2));
    else if (plain.endsWith('t'))  addInfinitive(plain.slice(0, -1));
    if (plain.endsWith('e'))   addInfinitive(plain.slice(0, -1));
  }

  return attempts;
}

function lookupWord(rawToken: string, vocab: Word[]): Word | null {
  // Strip leading/trailing punctuation so "Berlin." matches "Berlin"
  const clean = rawToken.replace(/^[„"'(\[–-]*/g, '').replace(/[.,!?;:"""')\]–-]*$/g, '').trim();
  if (!clean) return null;

  const lower = clean.toLowerCase();

  // Try direct match and all verb stem derivations in order
  for (const attempt of buildInfinitiveAttempts(lower)) {
    const match = tryMatch(attempt, vocab);
    if (match) return match;
  }

  return null;
}

// ─── Shuffle ──────────────────────────────────────────────────────────────────

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function ReadingScreen() {
  const level = useLevelStore((state) => state.level);
  const vocab = VOCABULARY[level];

  // Shuffle the passage list once when the component mounts (or level changes).
  // useMemo re-runs only when `level` changes, not on every render.
  const shuffledPassages = useMemo(
    () => shuffleArray(PASSAGES[level] ?? []),
    [level]
  );

  // Which passage is currently showing
  const [passageIndex, setPassageIndex] = useState(0);

  // The word the user last tapped, and its lookup result
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [lookupResult, setLookupResult] = useState<Word | 'not-found' | null>(null);

  const passage = shuffledPassages[passageIndex];
  const total = shuffledPassages.length;

  // ── Empty state (level has no passages yet) ──────────────────────────────
  if (!passage) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={[labelStyle, styles.emptyLabel]}>READING MODE</Text>
          <Text style={styles.emptyTitle}>Coming Soon</Text>
          <Text style={styles.emptyBody}>
            Reading passages for {level} are not available yet.
          </Text>
        </View>
      </View>
    );
  }

  // ── Split text into tokens ────────────────────────────────────────────────
  // Split on whitespace, filter out any empty strings from double spaces etc.
  const tokens = passage.text.split(/\s+/).filter(Boolean);

  // ── Handlers ──────────────────────────────────────────────────────────────

  function handleWordTap(token: string) {
    // Tap the same word again → close the popup
    if (token === selectedToken) {
      setSelectedToken(null);
      setLookupResult(null);
      return;
    }
    const result = lookupWord(token, vocab);
    setSelectedToken(token);
    setLookupResult(result ?? 'not-found');
  }

  function handleNext() {
    setSelectedToken(null);
    setLookupResult(null);
    setPassageIndex((i) => (i + 1) % total);
  }

  function handlePrev() {
    setSelectedToken(null);
    setLookupResult(null);
    setPassageIndex((i) => (i - 1 + total) % total);
  }

  function dismissPopup() {
    setSelectedToken(null);
    setLookupResult(null);
  }

  // Capitalise the first letter of a part-of-speech string for display
  function formatPos(pos: string): string {
    return pos.charAt(0).toUpperCase() + pos.slice(1);
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <View style={styles.container}>

      {/* ── Top navigation: prev / counter / next ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrev} style={styles.navBtn} activeOpacity={0.6}>
          <Feather name="chevron-left" size={18} color={colors.textSecondary} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={[labelStyle, styles.headerLabel]}>READING MODE</Text>
          <Text style={styles.headerCounter}>
            {passageIndex + 1}
            <Text style={styles.headerCounterTotal}> / {total}</Text>
          </Text>
        </View>

        <TouchableOpacity onPress={handleNext} style={styles.navBtn} activeOpacity={0.6}>
          <Feather name="chevron-right" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* ── Passage title ── */}
      <View style={styles.titleBlock}>
        <Text style={styles.passageTitle}>{passage.title}</Text>
        <Text style={styles.passageTitleEn}>{passage.titleEn}</Text>
      </View>

      {/* ── Tap hint ── */}
      <Text style={styles.hint}>Tap a word to look it up</Text>

      {/* ── Passage text (scrollable) ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[cardStyle, styles.passageCard]}>
          {/*
            Each word is an inline <Text onPress>.
            Nesting them inside a parent <Text> lets them reflow and wrap
            exactly like normal paragraph text — no manual line-breaking needed.
          */}
          <Text style={styles.passageText}>
            {tokens.map((token, index) => (
              <Text
                key={index}
                onPress={() => handleWordTap(token)}
                style={[
                  styles.wordToken,
                  selectedToken === token && styles.wordTokenSelected,
                ]}
              >
                {token}
                {/* Add a space after every word except the last one */}
                {index < tokens.length - 1 ? ' ' : ''}
              </Text>
            ))}
          </Text>
        </View>

        {/* Next Passage button — more discoverable than the header arrows */}
        <TouchableOpacity style={styles.nextPassageBtn} onPress={handleNext} activeOpacity={0.7}>
          <Text style={styles.nextPassageBtnText}>Next Passage →</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ── Word lookup popup ── */}
      {/*
        Rendered outside the ScrollView so it stays fixed at the bottom
        of the screen while the user scrolls through the text.
      */}
      {lookupResult !== null && (
        <View style={styles.popup}>
          {/* Header row: the tapped word + close button */}
          <View style={styles.popupHeader}>
            <Text style={styles.popupWord}>
              {lookupResult !== 'not-found' ? lookupResult.german : selectedToken}
            </Text>
            <TouchableOpacity onPress={dismissPopup} style={styles.popupClose} activeOpacity={0.6}>
              <Feather name="x" size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {lookupResult === 'not-found' ? (
            // Word not found even after verb stem stripping
            <Text style={styles.popupNotFound}>
              Word not found — search in Flashcards
            </Text>
          ) : (
            // Word found — show translation + metadata
            <View>
              <Text style={styles.popupTranslation}>{lookupResult.english}</Text>

              {/* Part of speech badge + gender badge (for nouns) */}
              <View style={styles.popupBadgeRow}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{formatPos(lookupResult.partOfSpeech)}</Text>
                </View>
                {lookupResult.gender != null && (
                  <View style={[styles.badge, styles.badgeGender]}>
                    <Text style={[styles.badgeText, styles.badgeTextGender]}>
                      {lookupResult.gender}
                    </Text>
                  </View>
                )}
              </View>

              {/* Example sentence if available */}
              {lookupResult.exampleDe ? (
                <Text style={styles.popupExample} numberOfLines={2}>
                  {lookupResult.exampleDe}
                </Text>
              ) : null}
            </View>
          )}
        </View>
      )}

    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // ── Header navigation ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerLabel: {
    // labelStyle already applied inline — just override font size if needed
  },
  headerCounter: {
    fontFamily: font.semiBold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    marginTop: 4,
  },
  headerCounterTotal: {
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  navBtn: {
    padding: spacing.sm,
  },

  // ── Passage title block ──
  titleBlock: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  passageTitle: {
    fontFamily: font.semiBold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
  },
  passageTitleEn: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },

  // ── Hint text ──
  hint: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
    letterSpacing: 0.3,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },

  // ── Scrollable text area ──
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  passageCard: {
    // cardStyle gives white bg + border + 4px radius + 24px padding
    // Override padding to give the text more breathing room
    padding: spacing.xl,
  },

  // ── Inline tappable word tokens ──
  passageText: {
    // The outer Text sets the base line height for the paragraph
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    lineHeight: 30,
  },
  wordToken: {
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  wordTokenSelected: {
    // Highlighted state — blue and slightly bold to show which word is active
    color: colors.accent,
    fontFamily: font.semiBold,
  },

  // ── Word lookup popup ──
  // Sits below the ScrollView (outside it), so it stays fixed while scrolling.
  popup: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    // Subtle shadow on web to lift it above the text
    ...Platform.select({
      web: {
        boxShadow: '0 -2px 12px rgba(0,0,0,0.06)',
      } as any,
    }),
  },
  popupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  popupClose: {
    padding: spacing.xs,
  },
  popupWord: {
    fontFamily: font.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
  },
  popupTranslation: {
    fontFamily: font.medium,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  popupBadgeRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  badge: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  badgeText: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  badgeGender: {
    backgroundColor: colors.accentLight,
    borderColor: colors.accent,
  },
  badgeTextGender: {
    color: colors.accent,
  },
  popupExample: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  popupNotFound: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },

  // ── Next Passage button ──
  nextPassageBtn: {
    alignSelf: 'flex-end',
    marginTop: spacing.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  nextPassageBtnText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },

  // ── Empty state ──
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  emptyLabel: {
    marginBottom: spacing.sm,
  },
  emptyTitle: {
    fontFamily: font.semiBold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  emptyBody: {
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },

});