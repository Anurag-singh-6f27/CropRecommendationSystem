import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  SafeAreaView, StatusBar, ScrollView, Platform, Image, Alert
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import LinearGradient from 'react-native-linear-gradient';
// 🔹 Import Firebase Firestore functions and your database configuration
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
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

export default function SignUpScreen() {
  // 🔹 State to hold user input
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    // Basic validation
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      // Check if a user with the same email already exists in Firestore
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email.toLowerCase()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        Alert.alert("Error", "An account with this email already exists.");
        return;
      }

      // Add a new user document to the "users" collection in Firestore
      await addDoc(collection(db, "users"), {
        name: name,
        email: email.toLowerCase(),
        password: password, // In a real app, you should hash this password for security
      });

      Alert.alert("Success", "Account created successfully! Please sign in.");
      router.push('/(auth)/sign-in'); // Navigate to the sign-in page

    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert("Error", "Failed to create account. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Header title="AgroConsultant" />
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Create your account</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              placeholder="Enter your name"
              placeholderTextColor="#999"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>

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

          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[styles.checkbox, agree && styles.checkboxChecked]}
              onPress={() => setAgree(!agree)}
            >
              {agree && <View style={styles.checkboxInner} />}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>
              By Signing up I agree with{" "}
              <Text style={styles.linkText}>Terms & Conditions</Text>
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.primaryButton, !agree && styles.disabledButton]}
              onPress={handleSignUp}
              disabled={!agree}
            >
              <Text style={styles.primaryButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <Link href="/(auth)/sign-in" asChild>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Sign In</Text>
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
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 1, borderColor: '#1A75D2', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  checkboxChecked: { backgroundColor: '#1A75D2' },
  checkboxInner: {
      width: 12,
      height: 12,
      backgroundColor: 'white'
  },
  checkboxLabel: { fontSize: 14, color: '#555', flexShrink: 1 },
  linkText: { color: '#1A75D2', fontWeight: 'bold' },
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
  disabledButton: {
    backgroundColor: '#A9A9A9',
    elevation: 0,
    shadowOpacity: 0,
  },
});

