import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  SafeAreaView, StatusBar, ScrollView, Platform, Image, Alert
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import LinearGradient from 'react-native-linear-gradient';
// 🔹 Import Firebase Firestore functions and your database configuration
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

// The Header component remains the same
const Header = ({ title }: { title: string }) => (
  <LinearGradient colors={['#1A75D2', '#0A3E8A']} style={styles.header}>
    <View style={styles.logoContainer}>
      <Image
        source={require('../../assets/images/harvest.png')}
        style={styles.logoImage}
      />
    </View>
    <Text style={styles.headerTitle}>{title}</Text>
  </LinearGradient>
);

export default function SignInScreen() {
  // 🔹 State to hold user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignIn = async () => {
    // Basic validation
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      // Query Firestore for a user with the matching email
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email.toLowerCase()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // No user found with that email
        Alert.alert("Error", "Invalid email or password.");
        return;
      }

      // Check the password of the found user
      let userFound = false;
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        if (user.password === password) {
          // Password matches, login is successful
          userFound = true;
          Alert.alert("Success", `Welcome back, ${user.name}!`);
          router.replace('/main'); // Navigate to the main app
        }
      });

      if (!userFound) {
        // Email was correct, but password was not
        Alert.alert("Error", "Invalid email or password.");
      }

    } catch (error) {
      console.error("Error signing in: ", error);
      Alert.alert("Error", "An error occurred during sign-in. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Header title="AgroConsultant" />
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Welcome Back!</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>E-mail Address</Text>
            <TextInput
              placeholder="Enter your mail"
              placeholderTextColor="#999"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="#999"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSignIn}
            >
              <Text style={styles.primaryButtonText}>Sign In</Text>
            </TouchableOpacity>

            <Link href="/(auth)/sign-up" asChild>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// The styles remain the same
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 40 : 60,
    paddingBottom: 20,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoImage: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  formContainer: { flex: 1, paddingHorizontal: 25, paddingTop: 30 },
  formTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 30 },
  inputContainer: { marginBottom: 25 },
  label: { color: '#555', fontSize: 14, marginBottom: 5 },
  input: { borderBottomWidth: 1, borderBottomColor: '#DDD', paddingVertical: 10, fontSize: 16, color: '#333' },
  linkText: { color: '#1A75D2', fontWeight: 'bold', textAlign: 'right', marginBottom: 30 },
  buttonContainer: { marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 15 },
  primaryButton: {
    backgroundColor: '#1A75D2',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  primaryButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  secondaryButton: { borderWidth: 1, borderColor: '#1A75D2', paddingVertical: 15, borderRadius: 30, alignItems: 'center', flex: 1 },
  secondaryButtonText: { color: '#1A75D2', fontSize: 16, fontWeight: 'bold' },
});
