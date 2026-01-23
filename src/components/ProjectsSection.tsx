import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image, Modal, ScrollView, Dimensions } from 'react-native';

interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
  technologies?: string[];
  image?: string;
  date?: string;
}

interface Theme {
  text: string;
  textSecondary: string;
  card: string;
}

interface ProjectsSectionProps {
  codingProjects: Project[];
  artProjects: Project[];
  theme: Theme;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ codingProjects, artProjects, theme }) => {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'coding' | 'art'>('coding');
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

  const projects = activeTab === 'coding' ? codingProjects : artProjects;

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(expandedId => expandedId !== id) : [...prev, id]
    );
  };

  const handleGoToProject = (item: Project) => {
    // For Moon Maiden and Character Design Exploration, show full screen image
    if (item.id === 'art1' || item.id === 'art3') {
      if (item.image) {
        setFullScreenImage(item.image);
      }
    } else if (item.url) {
      Linking.openURL(item.url);
    }
  };

  const handleTabSwitch = (tab: 'coding' | 'art') => {
    setActiveTab(tab);
    setExpandedIds([]); // Collapse all when switching tabs
  };

  return (
    <View style={styles.section}>
      {/* Title and Toggle Buttons Row */}
      <View style={styles.headerContainer}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {activeTab === 'coding' ? 'Coding Projects' : 'Art Projects'}
        </Text>
        
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              { backgroundColor: theme.card },
              activeTab === 'coding' && { backgroundColor: '#ffbccd' },
            ]}
            onPress={() => handleTabSwitch('coding')}
          >
            <Text style={[styles.toggleText, activeTab === 'coding' && styles.toggleTextActive]}>
              💻
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.toggleButton,
              { backgroundColor: theme.card },
              activeTab === 'art' && { backgroundColor: '#ffbccd' },
            ]}
            onPress={() => handleTabSwitch('art')}
          >
            <Text style={[styles.toggleText, activeTab === 'art' && styles.toggleTextActive]}>
              🎨
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Projects List */}
      {projects.map((item) => {
        const isExpanded = expandedIds.includes(item.id);
        
        return (
          <TouchableOpacity 
            key={item.id} 
            style={[styles.projectCard, { backgroundColor: theme.card }]}
            onPress={() => toggleExpand(item.id)}
            activeOpacity={0.7}
          >
            {item.image && isExpanded && activeTab === 'art' && (
              <Image 
                source={{ uri: item.image }} 
                style={styles.projectImage}
                resizeMode="cover"
              />
            )}
            
            <View style={styles.projectNameContainer}>
              <Text style={[styles.projectName, { color: theme.text }]}>{item.name}</Text>
              {item.date && (
                <View style={styles.dateBadge}>
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.description, { color: theme.textSecondary }]}>{item.description}</Text>
            
            {isExpanded && (
              <View style={styles.expandedContent}>
                {item.technologies && item.technologies.length > 0 && (
                  <View style={styles.techContainer}>
                    <Text style={[styles.techLabel, { color: theme.text }]}>
                      {activeTab === 'coding' ? 'Languages:' : 'Tools:'}
                    </Text>
                    <View style={styles.techList}>
                      {item.technologies.map((tech, index) => (
                        <View key={index} style={styles.techBadge}>
                          <Text style={styles.techText}>{tech}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
                
                {item.url && (
                  <TouchableOpacity 
                    style={styles.button}
                    onPress={(e) => {
                      e.stopPropagation();
                      handleGoToProject(item);
                    }}
                  >
                    <Text style={styles.buttonText}>View Project</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </TouchableOpacity>
        );
      })}

      {/* Full Screen Image Modal */}
      <Modal
        visible={fullScreenImage !== null}
        transparent={false}
        animationType="fade"
        onRequestClose={() => setFullScreenImage(null)}
        statusBarTranslucent={true}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity 
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setFullScreenImage(null)}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              maximumZoomScale={3}
              minimumZoomScale={1}
              showsVerticalScrollIndicator={false}
              scrollEnabled={true}
              bouncesZoom={true}
              pinchGestureEnabled={true}
            >
              {fullScreenImage && (
                <Image 
                  source={{ uri: fullScreenImage }}
                  style={styles.fullScreenImage}
                  resizeMode="contain"
                />
              )}
            </ScrollView>
            
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setFullScreenImage(null)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  toggleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  toggleButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 0,
    minWidth: 45,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  toggleText: {
    fontSize: 20,
    opacity: 0.5,
  },
  toggleTextActive: {
    opacity: 1,
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
  projectImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
  },
  projectName: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  projectNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  dateBadge: {
    backgroundColor: '#ffbccd',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  dateText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#000',
  },
  description: {
    lineHeight: 20,
  },
  expandedContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  techContainer: {
    marginBottom: 12,
  },
  techLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  techList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  techBadge: {
    backgroundColor: '#f3d2d6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  techText: {
    fontSize: 11,
    color: '#333',
  },
  button: {
    backgroundColor: '#ffbccd',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackdrop: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  closeButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default ProjectsSection;