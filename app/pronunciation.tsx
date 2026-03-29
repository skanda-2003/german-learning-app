// pronunciation.tsx — Pronunciation Guide screen
//
// A static reference screen covering the sounds that trip up English speakers.
// 28 entries grouped into: Vowels, Umlauts, Diphthongs, Consonants.
//
// Each entry has a ▶ play button that speaks the example word aloud
// using the browser's built-in text-to-speech (Web Speech API) in de-DE —
// the same approach used in the Listening Quiz mini game.
//
// No AI, no network requests — fully offline.

import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { PRONUNCIATION_GUIDE } from '../src/data/pronunciationGuide';
import type { PronunciationEntry } from '../src/data/pronunciationGuide';
import {
  colors,
  font,
  fontSize,
  spacing,
  radius,
  labelStyle,
} from '../src/styles/theme';

// ─── Text-to-speech ───────────────────────────────────────────────────────────
// Speaks a German word using the browser's built-in synthesis.
// Guard against server-side rendering (typeof window check) and
// environments without speech support.

function speakGerman(text: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel(); // stop anything already playing
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'de-DE';
  utterance.rate = 0.85; // slightly slower — easier to hear the sounds
  window.speechSynthesis.speak(utterance);
}

// ─── Entry row ────────────────────────────────────────────────────────────────
// One row in the guide: letters on the left, rule + example in the middle,
// play button on the right.

type EntryRowProps = {
  entry: PronunciationEntry;
  isPlaying: boolean;
  isLast: boolean;
  onPlay: (entry: PronunciationEntry) => void;
};

function EntryRow({ entry, isPlaying, isLast, onPlay }: EntryRowProps) {
  return (
    <View style={[row.container, isLast && { borderBottomWidth: 0 }]}>

      {/* Left: the letter or combo — big and bold */}
      <View style={row.lettersBox}>
        <Text style={row.letters}>{entry.letters}</Text>
      </View>

      {/* Middle: pronunciation rule + example word */}
      <View style={row.middle}>
        <Text style={row.rule}>{entry.rule}</Text>
        <View style={row.exampleRow}>
          <Text style={row.example}>{entry.example}</Text>
          <Text style={row.exampleEn}>{entry.exampleEn}</Text>
        </View>
      </View>

      {/* Right: play button */}
      <TouchableOpacity
        style={[row.playBtn, isPlaying && row.playBtnActive]}
        onPress={() => onPlay(entry)}
        activeOpacity={0.6}
      >
        <Feather
          name="volume-2"
          size={15}
          color={isPlaying ? colors.accent : colors.textSecondary}
        />
      </TouchableOpacity>

    </View>
  );
}

const row = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.md,
  },

  // Left column: fixed width box so all rules align
  lettersBox: {
    width: 64,
    alignItems: 'flex-start',
  },
  letters: {
    fontFamily: font.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
  },

  // Middle column: takes remaining space
  middle: {
    flex: 1,
    gap: 3,
  },
  rule: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  exampleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
    marginTop: 2,
  },
  example: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  exampleEn: {
    fontFamily: font.regular,
    fontSize: fontSize.xxs,
    color: colors.textMuted,
  },

  // Right column: play button
  playBtn: {
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  playBtnActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accentLight,
  },
});

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function PronunciationScreen() {
  // Track which entry is currently being played so we can highlight its button.
  // We clear it after a short delay since the Web Speech API doesn't fire
  // reliable end events in all browsers.
  const [playingId, setPlayingId] = useState<string | null>(null);

  function handlePlay(entry: PronunciationEntry) {
    speakGerman(entry.example);
    setPlayingId(entry.id);
    // Clear the playing highlight after ~2 seconds
    setTimeout(() => setPlayingId(null), 2000);
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >

      {/* ── Page header ── */}
      <View style={styles.header}>
        <Text style={[labelStyle, styles.headerLabel]}>PRONUNCIATION GUIDE</Text>
        <Text style={styles.headerSub}>German sounds for English speakers</Text>
      </View>

      {/* ── Tip banner ── */}
      <View style={styles.tip}>
        <Feather name="info" size={13} color={colors.accent} style={{ marginTop: 1 }} />
        <Text style={styles.tipText}>
          Tap the speaker icon on any row to hear the example word spoken aloud in German.
        </Text>
      </View>

      {/* ── Groups ── */}
      {PRONUNCIATION_GUIDE.map((group) => (
        <View key={group.groupLabel} style={styles.group}>

          {/* Group header */}
          <Text style={[labelStyle, styles.groupLabel]}>{group.groupLabel}</Text>

          {/* Entry rows inside a card */}
          <View style={styles.card}>
            {group.entries.map((entry, index) => (
              <EntryRow
                key={entry.id}
                entry={entry}
                isPlaying={playingId === entry.id}
                isLast={index === group.entries.length - 1}
                onPlay={handlePlay}
              />
            ))}
          </View>

        </View>
      ))}

    </ScrollView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({

  scroll: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
    gap: spacing.lg,
  },

  // Page header
  header: {
    gap: 4,
  },
  headerLabel: {
    // labelStyle applied inline
  },
  headerSub: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },

  // Info tip banner
  tip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    backgroundColor: colors.accentLight,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  tipText: {
    flex: 1,
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.accent,
    lineHeight: 17,
  },

  // Each group: label + card
  group: {
    gap: spacing.sm,
  },
  groupLabel: {
    // labelStyle applied inline
  },

  // Card wrapping the entry rows
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
  },

});