// consistent header on all of your authentication screens
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome5';

type AuthHeaderProps = {
  title: string;
};

export const AuthHeader = ({ title }: AuthHeaderProps) => {
  return (
    <LinearGradient colors={['#1A75D2', '#0A3E8A']} style={styles.header}>
      <View style={styles.logoContainer}>
        <Icon name="space-shuttle" size={30} color="#FFF" style={styles.rocketIcon} />
      </View>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.cloudContainer}>
        <Svg height="100%" width="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <Path
            d="M0,100 Q25,50 50,100 T100,100 L100,0 L0,0 Z"
            fill="#F5F5F5" // Match the background color of your form
          />
        </Svg>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 80, // Space for the cloud
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
  rocketIcon: {
    transform: [{ rotate: '-45deg' }],
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  cloudContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60, // Height of the cloud
  },
});