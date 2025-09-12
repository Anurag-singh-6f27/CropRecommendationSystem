import { Stack } from 'expo-router';
import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Accept children as props
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // You can add your authentication logic/context here
  return <>{children}</>;
};

// 🔹 AuthHeader component (can also be in a separate file if you want reuse)
interface AuthHeaderProps {
  title: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title }) => {
  return (
    <View style={styles.header}>
      {/* Uncomment and add your logo in assets/logo.png */}
      {/* <Image source={require('../assets/logo.png')} style={styles.logo} /> */}

      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

// 🔹 Root Layout
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false, // default off, but we can override per screen
          }}
        />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

// 🔹 Styles (shared for AuthHeader)
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1A75D2', // Blue header
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 10,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 10,
  },
});