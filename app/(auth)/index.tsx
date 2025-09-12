// welcome page
import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import { Link } from 'expo-router';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function WelcomeScreen() {
  return (
    <LinearGradient colors={['#1A75D2', '#0A3E8A']} style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <View style={styles.contentContainer}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/harvest.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>AgroConsultant</Text>
        <Text style={styles.description}>
          From Soil to Market, the Smartest Advice for Your Crop.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
         <Link href="/sign-up" asChild>
            <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Create an Account</Text>
            </TouchableOpacity>
         </Link>
         <Link href="/sign-in" asChild>
            <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Sign In</Text>
            </TouchableOpacity>
         </Link>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 24,
    color: '#FFF',
    position: 'absolute',
    top: 150,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 20,
  },
  buttonContainer: {
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
  },
  primaryButtonText: {
    color: '#1A75D2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    borderColor: '#FFF',
    borderWidth: 1,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});
