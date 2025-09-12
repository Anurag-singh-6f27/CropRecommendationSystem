import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// The useRouter import is no longer needed

// --- Header Component (from your existing code) ---
const Header = () => (
    <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerLogo}>
            <Text style={styles.headerLogoText}>M</Text>
          </View>
          <View>
            <Text style={styles.appName}>MAADSS</Text>
            <Text style={styles.greeting}>नमस्कार, Farmer!</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.languageSelector}>
            <MaterialCommunityIcons name="translate" size={20} color="#333" />
            <Text style={styles.languageText}>मराठी</Text>
        </TouchableOpacity>
    </View>
);

// --- Main Screen Component ---
export default function MainScreen() {
  // The router and handleLogout function have been removed

  return (
    // Use a main container to hold both the header and the content
    <View style={styles.mainContainer}>
      <Header />
      <View style={styles.contentContainer}>
        <Text style={styles.text}>
          Logged In Successfully
        </Text>

        {/* The logout button has been removed */}
      </View>
    </View>
  );
};

// --- Combined Styles ---
const styles = StyleSheet.create({
    // Main container for the whole screen
    mainContainer: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    // Header Styles
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    headerLeft: { 
        flexDirection: 'row', 
        alignItems: 'center',
        gap: 16,
    },
    headerLogo: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#27AE60',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    headerLogoText: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
    appName: { fontSize: 16, fontWeight: 'bold', color: '#1A202C' },
    greeting: { fontSize: 14, color: '#4A5568' },
    languageSelector: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        borderWidth: 1, 
        borderColor: '#CBD5E0', 
        borderRadius: 20, 
        paddingVertical: 6, 
        paddingHorizontal: 12 
    },
    languageText: { marginLeft: 6, fontWeight: '500' },

    // Content Styles
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    // The logoutButton and logoutButtonText styles have been removed
});

