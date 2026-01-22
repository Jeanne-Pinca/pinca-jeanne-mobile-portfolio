import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  theme: {
    background: string;
    text: string;
    textSecondary: string;
    badge: string;
    card: string;
    link: string;
  };
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ darkMode, setDarkMode, theme }) => {
  return (
    <Pressable
      onPress={() => setDarkMode(!darkMode)}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: theme.card, opacity: pressed ? 0.85 : 1 },
      ]}
      hitSlop={10}
      accessibilityRole="button"
      accessibilityLabel={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Text style={[styles.icon, { color: theme.text }]}>{darkMode ? '🌙' : '🌸'}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  icon: {
    fontSize: 22,
  },
});

export default ThemeToggle;