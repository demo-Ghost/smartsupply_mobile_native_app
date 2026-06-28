import { StyleSheet, Text, View } from 'react-native';

import { API_BASE_URL } from '../api/config';

export function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>API base URL</Text>
      <Text style={styles.value}>{API_BASE_URL}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 6,
  },
  label: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#888',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 16,
  },
});
