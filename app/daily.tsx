// daily.tsx — Daily Challenge screen

import { View, Text, StyleSheet } from 'react-native';

export default function DailyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Daily Challenge</Text>
      <Text style={styles.subtitle}>Coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
  },
});