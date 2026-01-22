import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Project {
  id: string;
  name: string;
  description: string;
}

interface Theme {
  text: string;
  textSecondary: string;
  card: string;
}

interface ProjectsSectionProps {
  projects: Project[];
  theme: Theme;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, theme }) => {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Projects</Text>
      {projects.map((item) => (
        <View key={item.id} style={[styles.projectCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.projectName, { color: theme.text }]}>{item.name}</Text>
          <Text style={{ color: theme.textSecondary }}>{item.description}</Text>
        </View>
      ))}
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
  projectCard: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  projectName: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default ProjectsSection;