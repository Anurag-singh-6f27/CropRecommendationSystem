import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      // configures the navigation stack for all screens in this (auth) group
      screenOptions={{
      
        headerShown: false, // Hide the header for all auth screens
      }}
    />
  );
}