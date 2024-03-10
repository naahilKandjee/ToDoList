import React, { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PulsingButton = ({ onPress, title }) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scale]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <Animated.View style={[styles.animatedContainer, { transform: [{ scale }] }]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    alignSelf: 'center',
  },
  animatedContainer: {
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  text: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default PulsingButton;
