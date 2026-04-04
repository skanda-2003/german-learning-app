// TipsBar.tsx — A persistent hint bar shown at the bottom of every screen.
//
// Normal mode: shows a random tip each time the user navigates to a new screen.
// Focus Tip mode: when the user completes a grammar or daily challenge session,
//   the bar shows a targeted tip for their weakest topic (labelled "FOCUS TIP").
//   Pressing the right arrow dismisses it and returns to normal browsing.
//
// Left/right arrows let the user browse through the full tip list at any time.
// When the level changes, the bar picks a fresh random tip and clears any focus tip.

import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { usePathname } from 'expo-router';
import useLevelStore from '../store/useLevelStore';
import useTipStore from '../store/useTipStore';
import { TIPS } from '../data/tips';

// Fisher-Yates shuffle — returns a new shuffled copy of the array
function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function TipsBar() {
  // Current level — determines which tip list to use
  const level = useLevelStore((state) => state.level);

  // pathname changes every time the user navigates to a different screen
  const pathname = usePathname();

  // The contextual tip set after exercise completion (null = no focus tip)
  const contextualTip      = useTipStore((state) => state.contextualTip);
  const clearContextualTip = useTipStore((state) => state.clearContextualTip);

  const tips = TIPS[level];

  // shuffledOrder holds the full tip list in a randomised order for this session.
  // tipIndex is the current position within that shuffled order.
  // This ensures every tip is seen before any repeat, and each session starts differently.
  const [shuffledOrder, setShuffledOrder] = useState<string[]>(() => shuffleArray(TIPS['A1']));
  const [tipIndex, setTipIndex] = useState(0);

  // showContextual: true when we're displaying the focus tip instead of a regular tip
  const [showContextual, setShowContextual] = useState(false);

  // Each time the user navigates to a new screen, advance to the next tip in the shuffled list.
  // Skip this if a focus tip is active — we don't want to hide it on navigation.
  useEffect(() => {
    if (!showContextual) {
      setTipIndex((prev) => (prev + 1) % shuffledOrder.length);
    }
  }, [pathname]);

  // When a new focus tip arrives, snap to it immediately
  useEffect(() => {
    if (contextualTip) {
      setShowContextual(true);
    }
  }, [contextualTip]);

  // When the level changes, generate a fresh shuffled order and reset position
  useEffect(() => {
    setShuffledOrder(shuffleArray(TIPS[level]));
    setTipIndex(0);
    setShowContextual(false);
    clearContextualTip();
  }, [level]);

  // The tip text currently on screen
  const displayTip = showContextual && contextualTip
    ? contextualTip
    : shuffledOrder[tipIndex] ?? tips[tipIndex];

  // True when we're showing the focus tip (affects label colour)
  const isFocusTip = showContextual && !!contextualTip;

  function goBack() {
    if (showContextual) {
      // Already at the focus tip — wrap around to the last tip in the shuffled list
      setShowContextual(false);
      setTipIndex(shuffledOrder.length - 1);
    } else if (tipIndex === 0 && contextualTip) {
      // Step back from position 0 → show the focus tip again
      setShowContextual(true);
    } else {
      setTipIndex((prev) => (prev === 0 ? shuffledOrder.length - 1 : prev - 1));
    }
  }

  function goForward() {
    if (showContextual) {
      // Dismiss the focus tip and move forward in the shuffled list
      setShowContextual(false);
      clearContextualTip();
      setTipIndex((prev) => (prev + 1) % shuffledOrder.length);
    } else {
      setTipIndex((prev) => (prev === shuffledOrder.length - 1 ? 0 : prev + 1));
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