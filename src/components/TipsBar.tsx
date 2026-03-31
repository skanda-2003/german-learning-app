// TipsBar.tsx — A persistent hint bar shown at the bottom of every screen.
//
// Normal mode: displays one tip at a time for the current level.
// Focus Tip mode: when the user completes a grammar or daily challenge session,
//   the bar shows a targeted tip for their weakest topic (labelled "FOCUS TIP").
//   Pressing the right arrow dismisses it and returns to normal browsing.
//
// Left/right arrows let the user browse through the tips.
// When the level changes, the bar resets to tip 0 and clears any focus tip.

import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import useLevelStore from '../store/useLevelStore';
import useTipStore from '../store/useTipStore';
import { TIPS } from '../data/tips';

export default function TipsBar() {
  // Current level — determines which tip list to use
  const level = useLevelStore((state) => state.level);

  // The contextual tip set after exercise completion (null = no focus tip)
  const contextualTip    = useTipStore((state) => state.contextualTip);
  const clearContextualTip = useTipStore((state) => state.clearContextualTip);

  // tipIndex tracks position in the regular tips array
  const [tipIndex, setTipIndex] = useState(0);

  // showContextual: true when we're displaying the focus tip instead of a regular tip
  const [showContextual, setShowContextual] = useState(false);

  // When a new contextual tip arrives, snap to it immediately
  useEffect(() => {
    if (contextualTip) {
      setShowContextual(true);
    }
  }, [contextualTip]);

  // When the level changes, reset everything — new level = fresh tip set
  useEffect(() => {
    setTipIndex(0);
    setShowContextual(false);
    clearContextualTip();
  }, [level]);

  const tips = TIPS[level];

  // The tip text currently on screen
  const displayTip = showContextual && contextualTip
    ? contextualTip
    : tips[tipIndex];

  // True when we're showing the focus tip (affects label colour)
  const isFocusTip = showContextual && !!contextualTip;

  function goBack() {
    if (showContextual) {
      // Already at the focus tip — wrap around to the last regular tip
      setShowContextual(false);
      setTipIndex(tips.length - 1);
    } else if (tipIndex === 0 && contextualTip) {
      // Step back from first regular tip → show the focus tip again
      setShowContextual(true);
    } else {
      setTipIndex((prev) => (prev === 0 ? tips.length - 1 : prev - 1));
    }
  }

  function goForward() {
    if (showContextual) {
      // Dismiss the focus tip and move to regular tip 0
      setShowContextual(false);
      clearContextualTip();
      setTipIndex(0);
    } else {
      setTipIndex((prev) => (prev === tips.length - 1 ? 0 : prev + 1));
    }
  }

  return (
    <View style={styles.container}>
      {/* Left arrow */}
      <TouchableOpacity onPress={goBack} style={styles.arrowButton}>
        <Text style={styles.arrow}>‹</Text>
      </TouchableOpacity>

      {/* Tip text */}
      <View style={styles.textContainer}>
        <Text style={[styles.label, isFocusTip && styles.labelFocus]}>
          {isFocusTip ? 'Focus Tip' : 'Tip'}
        </Text>
        <Text style={styles.tipText}>{displayTip}</Text>
      </View>

      {/* Right arrow */}
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
  // Blue label when showing a focus/contextual tip
  labelFocus: {
    color: '#2563eb',
  },
  tipText: {
    fontFamily: 'IBMPlexMono_400Regular',
    color: 'rgba(255,255,255,0.65)',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 17,
  },
});