import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';

interface Theme {
  text: string;
  badge: string;
  background?: string;
  card?: string;
}

interface SkillsSectionProps {
  skills: string[];
  artSkills?: string[];
  theme: Theme;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, artSkills, theme }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const artScrollViewRef = useRef<ScrollView>(null);
  const isUserScrolling = useRef(false);
  const isArtUserScrolling = useRef(false);
  const scrollValue = useRef(0);
  const artScrollValue = useRef(0);
  const contentWidth = useRef(0);
  const artContentWidth = useRef(0);
  
  // Physics-based animation values
  const scrollVelocity = useRef(0);
  const artScrollVelocity = useRef(0);
  const lastScrollTime = useRef(0);
  const lastArtScrollTime = useRef(0);
  const lastScrollPosition = useRef(0);
  const lastArtScrollPosition = useRef(0);
  

  const extendedSkills = [...skills, ...skills, ...skills];
  const extendedArtSkills = artSkills ? [...artSkills, ...artSkills, ...artSkills] : [];

  const handleContentSizeChange = (width: number) => {

    contentWidth.current = width / 3;
  };

  const handleArtContentSizeChange = (width: number) => {
    artContentWidth.current = width / 3;
  };

  useEffect(() => {
    const scrollSpeed = 0.2;
    const friction = 0.95; // Friction coefficient for deceleration
    const minVelocity = 0.01; // Minimum velocity threshold

    const animate = () => {
      const now = Date.now();
      
      // Coding skills - scroll with physics
      if (!isUserScrolling.current && contentWidth.current > 0) {
        // Apply friction to velocity
        scrollVelocity.current *= friction;
        
        // If velocity is too small, use default scrolling
        if (Math.abs(scrollVelocity.current) < minVelocity) {
          scrollVelocity.current = 0;
          scrollValue.current += scrollSpeed;
        } else {
          // Apply velocity to scroll position
          scrollValue.current += scrollVelocity.current;
        }
        
        if (scrollValue.current >= contentWidth.current * 2) {
          scrollValue.current = scrollValue.current - contentWidth.current;
          scrollViewRef.current?.scrollTo({ x: scrollValue.current, animated: false });
        } else {
          scrollViewRef.current?.scrollTo({ x: scrollValue.current, animated: false });
        }
      }

      // Art skills - scroll with physics (reverse direction)
      if (!isArtUserScrolling.current && artContentWidth.current > 0 && artSkills) {
        // Apply friction to velocity
        artScrollVelocity.current *= friction;
        
        // If velocity is too small, use default scrolling
        if (Math.abs(artScrollVelocity.current) < minVelocity) {
          artScrollVelocity.current = 0;
          artScrollValue.current -= scrollSpeed;
        } else {
          // Apply velocity to scroll position
          artScrollValue.current += artScrollVelocity.current;
        }
        
        if (artScrollValue.current <= 0) {
          artScrollValue.current = artContentWidth.current;
        }
        
        artScrollViewRef.current?.scrollTo({ x: artScrollValue.current, animated: false });
      }
    };

    const interval = setInterval(animate, 16);
    return () => clearInterval(interval);
  }, [artSkills]);

  const handleScrollBegin = () => {
    isUserScrolling.current = true;
    lastScrollTime.current = Date.now();
    lastScrollPosition.current = scrollValue.current;
  };

  const handleArtScrollBegin = () => {
    isArtUserScrolling.current = true;
    lastArtScrollTime.current = Date.now();
    lastArtScrollPosition.current = artScrollValue.current;
  };

  const handleScroll = (event: any) => {
    if (isUserScrolling.current) {
      const offsetX = event.nativeEvent.contentOffset.x;
      const now = Date.now();
      const deltaTime = now - lastScrollTime.current;
      const deltaPosition = offsetX - lastScrollPosition.current;
      
      // Calculate velocity based on scroll movement
      if (deltaTime > 0) {
        scrollVelocity.current = deltaPosition / (deltaTime / 16); // Normalize to frame rate
      }
      
      scrollValue.current = offsetX;
      lastScrollTime.current = now;
      lastScrollPosition.current = offsetX;
      
      if (contentWidth.current > 0) {
        if (offsetX >= contentWidth.current * 2) {
          scrollValue.current = offsetX - contentWidth.current;
        } else if (offsetX < contentWidth.current) {
          scrollValue.current = offsetX + contentWidth.current;
        }
      }
    }
  };

  const handleArtScroll = (event: any) => {
    if (isArtUserScrolling.current) {
      const offsetX = event.nativeEvent.contentOffset.x;
      const now = Date.now();
      const deltaTime = now - lastArtScrollTime.current;
      const deltaPosition = offsetX - lastArtScrollPosition.current;
      
      // Calculate velocity based on scroll movement
      if (deltaTime > 0) {
        artScrollVelocity.current = deltaPosition / (deltaTime / 16); // Normalize to frame rate
      }
      
      artScrollValue.current = offsetX;
      lastArtScrollTime.current = now;
      lastArtScrollPosition.current = offsetX;
      
      if (artContentWidth.current > 0) {
        if (offsetX >= artContentWidth.current * 2) {
          artScrollValue.current = offsetX - artContentWidth.current;
        } else if (offsetX < artContentWidth.current) {
          artScrollValue.current = offsetX + artContentWidth.current;
        }
      }
    }
  };

  const handleScrollEnd = () => {
    isUserScrolling.current = false;
    // Keep the velocity for momentum effect
  };

  const handleArtScrollEnd = () => {
    isArtUserScrolling.current = false;
    // Keep the velocity for momentum effect
  };

  return (
    <View style={styles.section}>
      <View style={[styles.titleContainer, { backgroundColor: theme.card || theme.background }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Skills</Text>
      </View>
      
      {/* Coding Skills Row */}
      <View style={styles.scrollWrapper}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
          contentContainerStyle={styles.scrollContent}
          onScrollBeginDrag={handleScrollBegin}
          onScroll={handleScroll}
          onScrollEndDrag={handleScrollEnd}
          onMomentumScrollEnd={handleScrollEnd}
          onContentSizeChange={handleContentSizeChange}
          scrollEventThrottle={16}
        >
          {extendedSkills.map((skill, index) => (
            <View 
              key={`${skill}-${index}`}
              style={[styles.skillBadge, { backgroundColor: '#ffbccd' }]}
            >
              <Text style={[styles.skillText, { color: theme.text }]}>{skill}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Art Skills Row */}
      {artSkills && artSkills.length > 0 && (
        <View style={[styles.scrollWrapper, styles.artScrollWrapper]}>
          <ScrollView
            ref={artScrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
            contentContainerStyle={styles.scrollContent}
            onScrollBeginDrag={handleArtScrollBegin}
            onScroll={handleArtScroll}
            onScrollEndDrag={handleArtScrollEnd}
            onMomentumScrollEnd={handleArtScrollEnd}
            onContentSizeChange={handleArtContentSizeChange}
            scrollEventThrottle={16}
          >
            {extendedArtSkills.map((skill, index) => (
              <View 
                key={`art-${skill}-${index}`}
                style={[styles.skillBadge, { backgroundColor: '#ffd2d6' }]}
              >
                <Text style={[styles.skillText, { color: theme.text }]}>{skill}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 80,
    overflow: 'visible',
  },
  titleContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 32,
    marginBottom: 12,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollWrapper: {
    marginHorizontal: -20,
    marginBottom: -5,
  },
  artScrollWrapper: {
    marginTop: 1,
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  skillBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 32,
    marginHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 32,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  skillText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SkillsSection;