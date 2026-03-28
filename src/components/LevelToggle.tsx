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
    flexDirection: 'row',      // buttons side by side
    backgroundColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4fc3f7',
  },
  activeButton: {
    backgroundColor: '#4fc3f7', // filled when selected
  },
  buttonText: {
    color: '#4fc3f7',
    fontWeight: 'bold',
    fontSize: 14,
  },
  activeText: {
    color: '#1a1a2e', // dark text on the filled button
  },
});
