// app/_layout.tsx
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// 🔹 AuthHeader component (can also be moved to components/authheader.tsx)
interface AuthHeaderProps {
  title: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
const InitialLayout = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  
  React.useEffect(() => {
    // Don't run any navigation logic until the auth state is fully loaded.
    if (isLoading) {
      return;
    }

    // This is the corrected, simpler logic.
    if (user) {
      // If the user is logged in, always make sure they are on the main screen.
      router.replace('/');
    } else {
      // If the user is NOT logged in, always send them to the welcome screen.
      router.replace('/');
    }
  }, [user, isLoading]);

  // While the auth state is loading, show a global loading indicator.
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Once loading is complete, render the main navigation stack.
  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

// 🔹 Root Layout
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </GestureHandlerRootView>
  );
}

// 🔹 Styles
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1A75D2',
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
});
function useAuth(): { user: any; isLoading: any; } {
  throw new Error('Function not implemented.');
}

