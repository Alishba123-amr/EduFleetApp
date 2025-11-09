import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions, Animated, Easing } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    // Animation loop
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Navigate to Home after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Rotating logo in center */}
      <Animated.Image
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        style={[styles.logo, { transform: [{ rotate: spin }] }]}
      />

      {/* Floating shapes */}
      <View style={styles.shapesContainer}>
        <View style={[styles.shape, styles.square, { top: 100, left: 40 }]} />
        <View style={[styles.shape, styles.circle, { bottom: 120, right: 50 }]} />
        <View style={[styles.shape, styles.triangle, { top: 200, right: 70 }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#052b52',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    tintColor: 'white',
  },
  shapesContainer: {
    position: 'absolute',
    width,
    height,
  },
  shape: {
    position: 'absolute',
  },
  square: {
    width: 40,
    height: 40,
    backgroundColor: '#ff6f61',
  },
  circle: {
    width: 30,
    height: 30,
    backgroundColor: '#56ccf2',
    borderRadius: 15,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 35,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#f9ca24',
  },
});
