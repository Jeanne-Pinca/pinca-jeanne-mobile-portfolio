import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import Svg, { Line } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

interface AnimatedGridBackgroundProps {
  darkMode: boolean;
}

const AnimatedGridBackground: React.FC<AnimatedGridBackgroundProps> = ({ darkMode }) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 20,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const gridColor = darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
  const gridSize = 40;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.grid, { transform: [{ translateY }] }]}>
        <Svg height={height + gridSize * 2} width={width} style={styles.svg}>
          {/* Vertical lines */}
          {Array.from({ length: Math.ceil(width / gridSize) + 1 }).map((_, i) => (
            <Line
              key={`v-${i}`}
              x1={i * gridSize}
              y1={0}
              x2={i * gridSize}
              y2={height + gridSize * 2}
              stroke={gridColor}
              strokeWidth="1"
            />
          ))}
          {/* Horizontal lines */}
          {Array.from({ length: Math.ceil(height / gridSize) + 3 }).map((_, i) => (
            <Line
              key={`h-${i}`}
              x1={0}
              y1={i * gridSize}
              x2={width}
              y2={i * gridSize}
              stroke={gridColor}
              strokeWidth="1"
            />
          ))}
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  grid: {
    position: 'absolute',
    top: -20,
  },
  svg: {
    position: 'absolute',
  },
});

export default AnimatedGridBackground;