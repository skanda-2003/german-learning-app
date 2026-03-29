// LevelToggle.tsx — Level selector shown at the top of every screen
// Displays 4 buttons (A1, A2, B1, B2). Tapping one sets the global level.

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import useLevelStore, { Level } from '../store/useLevelStore';

const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2'];

export default function LevelToggle() {
  // Read the current level and the setLevel action from the global store
  const { level, setLevel } = useLevelStore();

  return (
    <View style={styles.container}>
      {LEVELS.map((l) => (
        <TouchableOpacity
          key={l}
          style={[
            styles.button,
            l === level && styles.activeButton, // highlight the selected level
          ]}
          onPress={() => setLevel(l)}
        >
          <Text
            style={[
              styles.buttonText,
              l === level && styles.activeText,
            ]}
          >
            {l}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 4,
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  activeButton: {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
  },
  buttonText: {
    fontFamily: 'IBMPlexMono_600SemiBold',
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 0.5,
  },
  activeText: {
    color: '#1a1a2e',
  },
});
