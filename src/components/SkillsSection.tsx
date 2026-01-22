import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Theme {
  text: string;
  badge: string;
}

interface SkillsSectionProps {
  skills: string[];
  theme: Theme;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, theme }) => {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Skills</Text>
      <View style={styles.skillsRow}>
        {skills.map((skill) => (
          <View key={skill} style={[styles.skillBadge, { backgroundColor: '#ffbccd' }]}>
            <Text style={{ color: theme.text }}>{skill}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
});

export default SkillsSection;