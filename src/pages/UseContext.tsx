import React, { createContext, useContext, useState, ReactNode } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

// Create Context with default value as undefined
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define the ThemeProvider props type
interface ThemeProviderProps {
  children: ReactNode;
}

// ThemeProvider Component
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ThemeToggle Component
const ThemeToggle: React.FC = () => {
  // Use context safely with TypeScript
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('ThemeToggle must be used within a ThemeProvider');
  }

  const { darkMode, setDarkMode } = context;

  return (
    <View style={darkMode ? styles.darkContainer : styles.lightContainer}>
      <Text style={darkMode ? styles.darkText : styles.lightText}>
        Dark Mode: {darkMode ? 'ON' : 'OFF'}
      </Text>
      <Button title="Toggle Theme" onPress={() => setDarkMode(!darkMode)} />
    </View>
  );
};

const UseContext: React.FC = () => {
  return (
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
};

export default UseContext;

const styles = StyleSheet.create({
    lightContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff', // Light mode background
    },
    darkContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#121212', // Dark mode background
    },
    lightText: {
      color: '#000000', // Light mode text color
      fontSize: 18,
      marginBottom: 10,
    },
    darkText: {
      color: '#ffffff', // Dark mode text color
      fontSize: 18,
      marginBottom: 10,
    },
  });