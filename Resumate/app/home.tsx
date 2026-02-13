import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  StatusBar,
  Image,
} from "react-native";
import { useRouter } from 'expo-router';

const RED = "#c40000";

export default function Home() {
  const router = useRouter();
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(20)).current;

  const float1 = useRef(new Animated.Value(0)).current;
  const float2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(float1, {
          toValue: -30,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(float1, {
          toValue: 0,
          duration: 3200,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(float2, {
          toValue: 18,
          duration: 3800,
          useNativeDriver: true,
        }),
        Animated.timing(float2, {
          toValue: 0,
          duration: 3800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleBuildResume = () => {
    router.push('/resume/form'); 
  };

  const handleInterviewPrep = () => {
    router.push('/interview/form'); 
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Floating background shapes */}
      <Animated.View
        style={[styles.bgTop, { transform: [{ translateY: float1 }] }]}
      />
      <Animated.View
        style={[styles.bgBottom, { transform: [{ translateY: float2 }] }]}
      />

      {/* Main Content */}
      <Animated.View
        style={{
          opacity: fade,
          transform: [{ translateY: slide }],
          alignItems: "center",
          width: "100%",
          paddingHorizontal: 24,
        }}
      >
        <View style={styles.logoBox}>
          <Image 
            source={require('../assets/images/ResuMate Logo.png')} 
            style={styles.logoImage}
            resizeMode="cover"
          />
        </View>

  

        {/* Buttons */}
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleBuildResume}
        >
          <Text style={styles.primaryButtonText}>Build my resume</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={handleInterviewPrep}
        >
          <Text style={styles.secondaryButtonText}>Interview prep</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  bgTop: {
    position: "absolute",
    top: -140,
    right: -140,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#ffecec",
  },

  bgBottom: {
    position: "absolute",
    bottom: -160,
    left: -160,
    width: 340,
    height: 340,
    borderRadius: 170,
    backgroundColor: "#fff2f2",
  },

  logoBox: {
    width: 150,
    height: 180,
    borderRadius: 30,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  logoEmoji: {
    fontSize: 40,
  },

  logoImage: {
    width: 350,
    height: 350,
  },

  logoText: {
    fontSize: 42,
    fontWeight: "900",
    color: RED,
    letterSpacing: 4,
    marginBottom: 10,
  },

  description: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 30,
  },

  primaryButton: {
    width: "100%",
    backgroundColor: RED,
    paddingVertical: 16,
    borderRadius: 18,
    marginBottom: 14,
  },

  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },

  secondaryButton: {
    width: "100%",
    borderWidth: 2,
    borderColor: RED,
    paddingVertical: 16,
    borderRadius: 18,
  },

  secondaryButtonText: {
    color: RED,
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },
});
