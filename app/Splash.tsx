import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  Animated,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';

const RED = "#c40000";

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  // Dot animated values
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    // Loop dots bounce animation
    const createBounce = (anim: Animated.Value) => {
      return Animated.sequence([
        Animated.timing(anim, {
          toValue: -12, // Jump height
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0, // Land
          duration: 400,
          useNativeDriver: true,
        }),
      ]);
    };

    Animated.loop(
      Animated.stagger(200, [
        createBounce(dot1),
        createBounce(dot2),
        createBounce(dot3),
      ])
    ).start();

    // Transition to main screens
    const timer = setTimeout(() => {
      router.replace('/GetStarted');
    }, 3500); // 3.5 seconds to see the animation clearly

    return () => clearTimeout(timer);
  }, [router, fadeAnim, scaleAnim, dot1, dot2, dot3]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View style={styles.contentWrap}>
        <Animated.View style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}>
          <Image
            source={require('../assets/images/ResuMate Logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Loading Dots Animation */}
        <Animated.View style={[styles.dotsContainer, { opacity: fadeAnim }]}>
          <Animated.View style={[styles.dot, { transform: [{ translateY: dot1 }] }]} />
          <Animated.View style={[styles.dot, { transform: [{ translateY: dot2 }] }]} />
          <Animated.View style={[styles.dot, { transform: [{ translateY: dot3 }] }]} />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 200,
    height: 120, // Adjusted height for better vertical balance
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 40,
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: RED,
  },
});