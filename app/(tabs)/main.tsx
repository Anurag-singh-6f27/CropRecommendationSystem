import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

// Import i18n for translations
import './languages'; 
import { useTranslation } from 'react-i18next';

// Importing the widgets for home tab
import WeatherWidget from './WeatherWidget'; 
import SoilWidget from './SoilWidget';
import CropAdvice from './cropAdvice';
import QuickActions from './quickActions';
import MarketPrices from './MarketPrices';

//Importing the widgets for stats tab
import DetailedCropAnalysis from './Stats/DetailCropAnalysis';
import CropPrice from './Stats/CropPrices';

//Import shortsplayer
import ShortsPlayer from './Shorts/Shortsplayer';

//Import chat bot

import ChatBot from './Chatbot';
// Main App Component
type TabKey = 'home' | 'stats' | 'chat' | 'shorts';

const AgroConsultantApp = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [isLangModalVisible, setLangModalVisible] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const { t } = useTranslation();

  const screenContent: Record<TabKey, string> = {
    home: 'Welcome to the Home Screen!', 
    stats: 'Viewing Statistics!',
    chat: 'Opening Chat!',
    shorts: 'Opening Shorts!',
  };
  
  const languageOptions = ['English', 'हिन्दी', 'मराठी'];

  // Render header
  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <TouchableOpacity
          style={styles.langButton}
          onPress={() => setLangModalVisible(true)}>
          <Text style={styles.icon}>🌐</Text>
          <Text style={styles.langButtonText}>{selectedLang}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.profileTextContainer}>
          <Text style={styles.appName}>AgroConsultant</Text>
          <Text style={styles.greeting}>Hello, Farmer!</Text>
        </View>
        <View style={styles.profileIconContainer}>
          <Text style={styles.icon}>👤</Text>
        </View>
      </View>
    </View>
  );

  // Render main content
  const renderMainContent = () => {
    if (activeTab === 'home') {
      return (
        <ScrollView
          contentContainerStyle={styles.mainContentContainer}
          showsVerticalScrollIndicator={true}
        >
          <WeatherWidget />
          <SoilWidget t={t} />
          <CropAdvice t={t} />
          <MarketPrices  />
          <QuickActions /> 
        </ScrollView>
      );
    } else if (activeTab === 'stats') {
      return (
        <ScrollView
          contentContainerStyle={styles.mainContentContainer}
          showsVerticalScrollIndicator={true}
        >
          <DetailedCropAnalysis />
          <CropPrice />
        </ScrollView>
      );
    }
    else if (activeTab === 'chat') {
      return (
        <View style={styles.mainContent}>
          <ChatBot />
        </View>
      );
    }
    else if (activeTab === 'shorts') {
      return <ShortsPlayer />;;
    }
     else {
      return (
        <View style={styles.mainContent}>
          <Text style={styles.mainContentText}>{activeTab}</Text>
        </View>
      );
    }
  };

  // Render footer
  const renderFooter = () => {
    const footerItems: { id: TabKey; icon: string; label: string }[] = [
      { id: 'home', icon: '🏠', label: 'Home' },
      { id: 'stats', icon: '📊', label: 'Stats' },
      { id: 'chat', icon: '💬', label: 'Chat' },
      { id: 'shorts', icon: '🎬', label: 'Shorts' },
    ];

    return (
      <View style={styles.footer}>
        {footerItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.footerButton}
            onPress={() => setActiveTab(item.id)}>
            <Text style={styles.icon}>{item.icon}</Text>
            <Text
              style={[
                styles.footerButtonText,
                activeTab === item.id ? styles.activeText : styles.inactiveText,
              ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  // Render language modal
  const renderLanguageModal = () => (
    <Modal
      transparent={true}
      visible={isLangModalVisible}
      animationType="fade"
      onRequestClose={() => setLangModalVisible(false)}>
      <TouchableWithoutFeedback onPress={() => setLangModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.langDropdown}>
            {languageOptions.map((lang) => (
              <TouchableOpacity
                key={lang}
                style={styles.langOption}
                onPress={() => {
                  setSelectedLang(lang);
                  setLangModalVisible(false);
                }}>
                <Text style={styles.langOptionText}>{lang}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.screen}>
      {renderHeader()}
      {renderMainContent()}
      {renderFooter()}
      {renderLanguageModal()}
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  langButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  langButtonText: { marginLeft: 8, fontWeight: '500', color: '#374151', fontSize: 14 },
  profileSection: { flexDirection: 'row', alignItems: 'center' },
  profileTextContainer: { alignItems: 'flex-end', marginRight: 12 },
  appName: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  greeting: { fontSize: 14, color: '#6B7280' },
  profileIconContainer: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },

  mainContentContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
    backgroundColor: '#F3F4F6',
    gap: 16,
    alignItems: 'stretch', // full width widgets
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: '#F3F4F6',
    gap: 16,
    alignItems: 'center',
  },
  mainContentText: { fontSize: 24, fontWeight: '600', color: '#1F2937' },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  footerButton: { alignItems: 'center', padding: 8 },
  footerButtonText: { fontSize: 12, fontWeight: '500', marginTop: 2 },
  activeText: { color: '#2563EB' },
  inactiveText: { color: '#6B7280' },
  icon: { fontSize: 24 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' },
  langDropdown: {
    position: 'absolute',
    top: 60,
    left: 16,
    width: 128,
    backgroundColor: 'white',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  langOption: { paddingHorizontal: 16, paddingVertical: 10 },
  langOptionText: { fontSize: 14, color: '#374151' },
});

export default AgroConsultantApp;
