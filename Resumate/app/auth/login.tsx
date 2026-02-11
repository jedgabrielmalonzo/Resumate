import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  StatusBar,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

const RED = '#c40000';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth();

  const anim = useRef(new Animated.Value(0)).current;
  const float1 = useRef(new Animated.Value(0)).current;
  const float2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Floating background animations
    Animated.loop(
      Animated.sequence([
        Animated.timing(float1, {
          toValue: -14,
          duration: 3200,
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

    // Card entrance animation
    Animated.timing(anim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await signIn(email.trim(), password);
      router.replace('/home');
    } catch (error: any) {
      const message =
        error?.code === 'auth/invalid-credential' ||
        error?.code === 'auth/invalid-email'
          ? 'Invalid email or password'
          : 'Unable to login. Please try again.';
      Alert.alert('Login Failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Animated.View
        style={[styles.bgTop, { transform: [{ translateY: float1 }] }]}
      />
      <Animated.View
        style={[styles.bgBottom, { transform: [{ translateY: float2 }] }]}
      />

      <Animated.View
        style={[
          styles.card,
          {
            opacity: anim,
            transform: [
              {
                translateY: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Secure access to your account</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!loading}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />

        <TouchableOpacity 
          style={[styles.mainButton, loading && styles.mainButtonDisabled]} 
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.mainButtonText}>
            {loading ? 'LOGGING IN...' : 'LOGIN'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => router.push('/auth/signup')}
          disabled={loading}
        >
          <Text style={styles.switchText}>Create new account</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgTop: {
    position: 'absolute',
    top: -140,
    right: -140,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#ffecec',
  },
  bgBottom: {
    position: 'absolute',
    bottom: -160,
    left: -160,
    width: 340,
    height: 340,
    borderRadius: 170,
    backgroundColor: '#fff2f2',
  },
  card: {
    width: '88%',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 28,
    shadowColor: RED,
    shadowOpacity: 0.18,
    shadowRadius: 30,
    elevation: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: RED,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 18,
    padding: 15,
    marginTop: 14,
    backgroundColor: '#fafafa',
  },
  mainButton: {
    backgroundColor: RED,
    paddingVertical: 15,
    borderRadius: 18,
    marginTop: 24,
  },
  mainButtonDisabled: {
    opacity: 0.6,
  },
  mainButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  switchText: {
    marginTop: 18,
    textAlign: 'center',
    color: RED,
    fontSize: 13,
  },
});
