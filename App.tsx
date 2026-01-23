import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { Linking, View, FlatList, StatusBar, Platform, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from './src/hooks/useTheme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
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
    { id: 'skills', component: <SkillsSection skills={PROFILE.skills} artSkills={PROFILE.artSkills} theme={theme} /> },
    { id: 'projects', component: <ProjectsSection codingProjects={PROFILE.codingProjects} artProjects={PROFILE.artProjects} theme={theme} /> },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <AnimatedGridBackground darkMode={darkMode} />
      <StatusBar
        barStyle={darkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
        translucent={true}
      />

      {/* Gradient overlay below status bar */}
      <LinearGradient
        colors={[theme.background, `${theme.background}Ff`, `${theme.background}CC`, `${theme.background}80`, `${theme.background}00`]}
        locations={[0.8, 0.75, 0.85, 0.9, 1]}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 50,
          zIndex: 2,
        }}
        pointerEvents="none"
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

      {/* FlatList */}
      <FlatList
        data={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={index === 0 ? { minHeight: SCREEN_HEIGHT, justifyContent: 'center', paddingHorizontal: 20 } : { paddingHorizontal: 20 }}>
            {item.component}
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 50, paddingBottom: 20 }}
      />
    </View>
  );
}