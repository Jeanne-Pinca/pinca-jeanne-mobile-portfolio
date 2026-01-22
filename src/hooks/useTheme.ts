import { useState } from 'react';
import { useColorScheme } from 'react-native';

const lightTheme = {
  background: '#ffebeb',
  text: '#222',
  textSecondary: '#99616f',
  badge: '#e0e0e0',
  card: '#fff',
  link: '#007aff',
};

const darkTheme = {
  background: '#181a20',
  text: '#fff',
  textSecondary: '#aaa',
  badge: '#333',
  card: '#23242a',
  link: '#4da3ff',
};

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');

  const theme = darkMode ? darkTheme : lightTheme;

  return { theme, darkMode, setDarkMode };
};