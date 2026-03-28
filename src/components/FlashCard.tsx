// FlashCard.tsx — A single flip card showing a German word on the front
// and the English translation + example sentence on the back.
//
// How the flip animation works:
//   - We have two faces (front and back) stacked on top of each other.
//   - A shared value "flipValue" goes from 0 (front visible) to 1 (back visible).
//   - The front face rotates from 0° → 180° (it spins away).
//   - The back face rotates from 180° → 360° (it spins into view).
//   - backfaceVisibility: 'hidden' ensures only the correct face shows at any time.

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { Word } from '../data/vocabulary';

// ─── Gender colours ────────────────────────────────────────────────────────────
// A classic trick for learning German genders: colour-code them.
// der = blue (masculine), die = red (feminine), das = green (neuter)
const GENDER_COLORS: Record<string, string> = {
  der: '#4fc3f7', // light blue
  die: '#f48fb1', // pink-red
  das: '#81c784', // green
};

// ─── Props ─────────────────────────────────────────────────────────────────────
type Props = {
  word: Word;
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function FlashCard({ word }: Props) {
  // flipValue: 0 = front side showing, 1 = back side showing
  const flipValue = useSharedValue(0);
  // Track flip state so we know which way to animate next
  const isFlipped = useSharedValue(false);

  // Called when the user taps the card
  function handleFlip() {
    if (isFlipped.value) {
      // Flip back to front
      flipValue.value = withTiming(0, { duration: 400 });
      isFlipped.value = false;
    } else {
      // Flip to back
      flipValue.value = withTiming(1, { duration: 400 });
      isFlipped.value = true;
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

  // Pick the gender colour, or use a neutral grey if the word has no gender
  const genderColor = word.gender ? GENDER_COLORS[word.gender] : '#aaaaaa';

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
      </Animated.View>

      {/* ── BACK FACE ── */}
      <Animated.View style={[styles.card, styles.back, backAnimatedStyle]}>
        {/* English translation */}
        <Text style={styles.englishWord}>{word.english}</Text>

        <View style={styles.divider} />

        {/* Example sentence in German */}
        <Text style={styles.exampleLabel}>Example</Text>
        <Text style={styles.exampleDe}>{word.exampleDe}</Text>
        <Text style={styles.exampleEn}>{word.exampleEn}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Outer touchable — sets the card dimensions
  wrapper: {
    width: '100%',
    maxWidth: 380,
    height: 260,
    alignSelf: 'center',
  },

  // Both faces share this base style — they sit on top of each other
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
    // Hide the face when it is rotated away from the viewer
    backfaceVisibility: 'hidden',
  },

  // Front face is white
  front: {
    backgroundColor: '#ffffff',
  },

  // Back face is a very light blue-grey
  back: {
    backgroundColor: '#f0f4ff',
  },

  tapHint: {
    position: 'absolute',
    top: 14,
    fontSize: 11,
    color: '#bbbbbb',
    letterSpacing: 0.5,
  },

  genderBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },

  genderText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13,
  },

  germanWord: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1a1a2e',
    textAlign: 'center',
    marginBottom: 8,
  },

  partOfSpeech: {
    fontSize: 13,
    color: '#aaaaaa',
    fontStyle: 'italic',
  },

  englishWord: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a2e',
    textAlign: 'center',
    marginBottom: 16,
  },

  divider: {
    width: 40,
    height: 2,
    backgroundColor: '#dde3f0',
    borderRadius: 2,
    marginBottom: 16,
  },

  exampleLabel: {
    fontSize: 11,
    color: '#aaaaaa',
    letterSpacing: 0.5,
    marginBottom: 6,
    textTransform: 'uppercase',
  },

  exampleDe: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 4,
  },

  exampleEn: {
    fontSize: 13,
    color: '#888888',
    textAlign: 'center',
  },
});