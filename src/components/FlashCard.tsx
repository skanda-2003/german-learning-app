// FlashCard.tsx — A single flip card showing a German word on the front
// and the English translation + example sentence on the back.
//
// How the flip animation works:
//   - We have two faces (front and back) stacked on top of each other.
//   - A shared value "flipValue" goes from 0 (front visible) to 1 (back visible).
//   - The front face rotates from 0° → 180° (it spins away).
//   - The back face rotates from 180° → 360° (it spins into view).
//   - backfaceVisibility: 'hidden' ensures only the correct face shows at any time.
//
// Card back extra info (shown when data is present in the word object):
//   - Nouns: plural form
//   - Verbs: conjugation table (ich/du/er/wir/ihr/sie)
//   - Adjectives: comparative form

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { Word } from '../data/vocabulary';

// Gender accent colours — kept intentionally for learning value
const GENDER_COLORS: Record<string, string> = {
  der: '#2563eb', // blue — masculine
  die: '#dc2626', // red  — feminine
  das: '#16a34a', // green — neuter
};

// Speaks the given text using the Web Speech API with a German voice.
// Stops any ongoing speech first so tapping twice doesn't queue up.
function speakGerman(text: string): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'de-DE';
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

// ─── Props ─────────────────────────────────────────────────────────────────────
type Props = {
  word: Word;
  onFlipChange?: (isFlipped: boolean) => void; // notifies parent when card flips
};

// ─── Verb conjugation table component ────────────────────────────────────────
// Shown on the card back for verb words when conjugation data is available.
function ConjugationTable({ conj }: { conj: NonNullable<Word['conjugations']> }) {
  const rows: [string, string][] = [
    ['ich', conj.ich],
    ['du', conj.du],
    ['er/sie/es', conj.er],
    ['wir', conj.wir],
    ['ihr', conj.ihr],
    ['sie/Sie', conj.sie],
  ];

  return (
    <View style={conjStyles.table}>
      {rows.map(([pronoun, form]) => (
        <View key={pronoun} style={conjStyles.row}>
          <Text style={conjStyles.pronoun}>{pronoun}</Text>
          <Text style={conjStyles.form}>{form}</Text>
        </View>
      ))}
    </View>
  );
}

const conjStyles = StyleSheet.create({
  table: {
    width: '100%',
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  pronoun: {
    fontFamily: 'IBMPlexMono_400Regular',
    fontSize: 11,
    color: '#aaaaaa',
    width: 70,
  },
  form: {
    fontFamily: 'IBMPlexMono_500Medium',
    fontSize: 11,
    color: '#333333',
    flex: 1,
    textAlign: 'right',
  },
});

// ─── Component ────────────────────────────────────────────────────────────────
export default function FlashCard({ word, onFlipChange }: Props) {
  // flipValue: 0 = front side showing, 1 = back side showing
  const flipValue = useSharedValue(0);
  // Track flip state so we know which way to animate next
  const isFlipped = useSharedValue(false);

  // Space key flips the card — same as tapping it.
  // Guard: don't fire when the user is typing in a text input (e.g. the search bar).
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== ' ') return;
      const tag = (document.activeElement as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      e.preventDefault(); // stop the page from scrolling on Space
      handleFlip();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  // Called when the user taps the card or presses Space
  function handleFlip() {
    if (isFlipped.value) {
      flipValue.value = withTiming(0, { duration: 400 });
      isFlipped.value = false;
      onFlipChange?.(false);
    } else {
      flipValue.value = withTiming(1, { duration: 400 });
      isFlipped.value = true;
      onFlipChange?.(true);
    }
  }

  // Front face: rotates from 0° to 180° as the card flips away
  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipValue.value, [0, 1], [0, 180]);
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
    };
  });

  // Back face: starts at 180° (hidden) and rotates to 360° (= 0°, visible)
  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipValue.value, [0, 1], [180, 360]);
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
    };
  });

  const genderColor = word.gender ? GENDER_COLORS[word.gender] : '#aaaaaa';

  // Determine if we have extra info to show on the back
  const hasConjugations = word.partOfSpeech === 'verb' && word.conjugations;
  const hasPlural       = word.partOfSpeech === 'noun' && word.plural;
  const hasComparative  = word.partOfSpeech === 'adjective' && word.comparative;

  return (
    <TouchableOpacity onPress={handleFlip} activeOpacity={0.95} style={styles.wrapper}>

      {/* ── FRONT FACE ── */}
      <Animated.View style={[styles.card, styles.front, frontAnimatedStyle]}>
        <Text style={styles.tapHint}>Tap to reveal</Text>

        {/* Gender badge — only shown for nouns */}
        {word.gender && (
          <View style={[styles.genderBadge, { backgroundColor: genderColor }]}>
            <Text style={styles.genderText}>{word.gender}</Text>
          </View>
        )}

        {/* The German word — large and bold */}
        <Text style={styles.germanWord}>{word.german}</Text>

        {/* Part of speech — small label underneath */}
        <Text style={styles.partOfSpeech}>{word.partOfSpeech}</Text>

        {/* Speaker icon — tapping reads the German word aloud */}
        <TouchableOpacity
          style={styles.speakerButton}
          onPress={(e) => { e.stopPropagation(); speakGerman(word.german); }}
          activeOpacity={0.6}
        >
          <Feather name="volume-2" size={14} color="#aaaaaa" />
        </TouchableOpacity>
      </Animated.View>

      {/* ── BACK FACE ── */}
      <Animated.View style={[styles.card, styles.back, backAnimatedStyle]}>

        {/* English translation */}
        <Text style={styles.englishWord}>{word.english}</Text>

        <View style={styles.divider} />

        {/* Example sentence */}
        <Text style={styles.exampleLabel}>Example</Text>
        <Text style={styles.exampleDe}>{word.exampleDe}</Text>
        <Text style={styles.exampleEn}>{word.exampleEn}</Text>

        {/* Speaker icon on the back too — reads the German word */}
        <TouchableOpacity
          style={styles.speakerButton}
          onPress={(e) => { e.stopPropagation(); speakGerman(word.german); }}
          activeOpacity={0.6}
        >
          <Feather name="volume-2" size={14} color="#aaaaaa" />
        </TouchableOpacity>

      </Animated.View>
    </TouchableOpacity>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    maxWidth: 380,
    height: 260,
    alignSelf: 'center',
  },

  // Both faces sit on top of each other — only one visible at a time
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
  },

  front: {
    backgroundColor: '#ffffff',
  },

  back: {
    backgroundColor: '#ffffff',
  },

  tapHint: {
    position: 'absolute',
    top: 14,
    fontFamily: 'IBMPlexMono_400Regular',
    fontSize: 10,
    color: '#bbbbbb',
    letterSpacing: 0.5,
  },

  genderBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 2,
    marginBottom: 12,
  },

  genderText: {
    fontFamily: 'IBMPlexMono_600SemiBold',
    color: '#ffffff',
    fontSize: 11,
    letterSpacing: 0.5,
  },

  germanWord: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 34,
    color: '#111111',
    textAlign: 'center',
    marginBottom: 8,
  },

  partOfSpeech: {
    fontFamily: 'IBMPlexMono_400Regular',
    fontSize: 11,
    color: '#aaaaaa',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  englishWord: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 22,
    color: '#111111',
    textAlign: 'center',
    marginBottom: 10,
  },

  divider: {
    width: 32,
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
  },

  exampleLabel: {
    fontFamily: 'IBMPlexMono_600SemiBold',
    fontSize: 9,
    color: '#aaaaaa',
    letterSpacing: 1,
    marginBottom: 4,
    textTransform: 'uppercase',
  },

  exampleDe: {
    fontFamily: 'IBMPlexMono_400Regular',
    fontSize: 12,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 2,
    lineHeight: 17,
  },

  exampleEn: {
    fontFamily: 'IBMPlexMono_400Regular',
    fontSize: 11,
    color: '#888888',
    textAlign: 'center',
  },

  // Speaker button — bottom-right corner of the card
  speakerButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    padding: 6,
  },

  // Extra info block (plural / conjugation / comparative)
  extraInfo: {
    marginTop: 8,
    width: '100%',
    alignItems: 'center',
  },

  extraLabel: {
    fontFamily: 'IBMPlexMono_600SemiBold',
    fontSize: 9,
    color: '#aaaaaa',
    letterSpacing: 1,
    marginBottom: 2,
    textTransform: 'uppercase',
  },

  extraValue: {
    fontFamily: 'IBMPlexMono_500Medium',
    fontSize: 13,
    color: '#333333',
  },
});
