// TipsBar.tsx — A persistent hint bar shown at the bottom of every screen.
// Displays one tip at a time for the currently selected level.
// Left/right arrows let the user browse through the tips.
// When the level changes, the bar automatically resets to the first tip for that level.

import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import useLevelStore from '../store/useLevelStore';
import { TIPS } from '../data/tips';

export default function TipsBar() {
  // Get the current level from the global Zustand store
  const level = useLevelStore((state) => state.level);

  // tipIndex tracks which tip we're currently showing (0 = first tip)
  const [tipIndex, setTipIndex] = useState(0);

  // When the level changes, jump back to the first tip for the new level.
  // useEffect runs the function inside whenever `level` changes.
  useEffect(() => {
    setTipIndex(0);
  }, [level]);

  // The tips array for the current level
  const tips = TIPS[level];

  // Go to the previous tip. If we're at the first tip, wrap to the last one.
  const goBack = () => {
    setTipIndex((prev) => (prev === 0 ? tips.length - 1 : prev - 1));
  };

  // Go to the next tip. If we're at the last tip, wrap back to the first one.
  const goForward = () => {
    setTipIndex((prev) => (prev === tips.length - 1 ? 0 : prev + 1));
  };

  return (
    <View style={styles.container}>
      {/* Left arrow button */}
      <TouchableOpacity onPress={goBack} style={styles.arrowButton}>
        <Text style={styles.arrow}>‹</Text>
      </TouchableOpacity>

      {/* Tip text in the middle */}
      <View style={styles.textContainer}>
        <Text style={styles.label}>💡 Tip</Text>
        <Text style={styles.tipText}>{tips[tipIndex]}</Text>
      </View>

      {/* Right arrow button */}
      <TouchableOpacity onPress={goForward} style={styles.arrowButton}>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    paddingVertical: 10,
    paddingHorizontal: 8,
    minHeight: 52,
  },
  arrowButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  arrow: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 22,
    lineHeight: 22,
    fontFamily: 'IBMPlexMono_400Regular',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontFamily: 'IBMPlexMono_600SemiBold',
    color: 'rgba(255,255,255,0.3)',
    fontSize: 9,
    marginBottom: 3,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  tipText: {
    fontFamily: 'IBMPlexMono_400Regular',
    color: 'rgba(255,255,255,0.65)',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 17,
  },
});
