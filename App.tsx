import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { Linking, View, FlatList, StatusBar, SafeAreaView, Platform, Text } from 'react-native';
import { useTheme } from './src/hooks/useTheme';
import AnimatedGridBackground from './src/components/AnimatedGridBackground';
import ThemeToggle from './src/components/ThemeToggle';
import ProfileData from './src/components/ProfileData';
import SkillsSection from './src/components/SkillsSection';
import ContactSection from './src/components/ContactSection';
import ProjectsSection from './src/components/ProjectsSection';
import { PROFILE } from './src/data/profile';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { theme, darkMode, setDarkMode } = useTheme();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Magic Retro': require('./assets/font/Magic Retro.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />
        <Text style={{ color: theme.text }}>Loading...</Text>
      </View>
    );
  }

  const handleLink = (url: string) => {
    Linking.openURL(url);
  };

  const sections = [
    // removed toggle from the list; it will be overlaid in the top-right corner
    {
      id: 'profile',
      component: (
        <ProfileData
          name={PROFILE.name}
          bio={PROFILE.bio}
          avatar={PROFILE.avatar}
          email={PROFILE.email}
          social={PROFILE.social}
          handleLink={handleLink}
          theme={theme}
        />
      ),
    },
    { id: 'skills', component: <SkillsSection skills={PROFILE.skills} theme={theme} /> },
    { id: 'projects', component: <ProjectsSection projects={PROFILE.projects} theme={theme} /> },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <AnimatedGridBackground darkMode={darkMode} />
      <StatusBar
        barStyle={darkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      {/* Floating toggle button OUTSIDE SafeAreaView */}
      <View
        pointerEvents="box-none"
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          zIndex: 10,
        }}
      >
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} theme={theme} />
      </View>

      {/* Only FlatList is inside SafeAreaView */}
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={sections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => item.component}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 0 }}
        />
      </SafeAreaView>
    </View>
  );
}