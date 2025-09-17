import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Volume2 } from 'lucide-react-native';

interface CropAdviceProps {
  t: (key: string) => string;
}

// Get device width
const screenWidth = Dimensions.get('window').width;

const CropAdvice: React.FC<CropAdviceProps> = ({ t }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t('Crop Advice')}</Text>

      {/* Cotton */}
      <View style={[styles.card, styles.cottonCard]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.cottonTitle}>Cotton</Text>
          <Text style={styles.cottonText}>Expected yield: 15-18 quintals/acre</Text>
          <Text style={styles.cottonProfit}>Profit margin: ₹25,000-30,000/acre</Text>
        </View>
        <View style={styles.matchContainer}>
          <Text style={styles.cottonMatch}>92%</Text>
          <Text style={styles.matchLabel}>Match</Text>
        </View>
      </View>

      {/* Soybean */}
      <View style={[styles.card, styles.soybeanCard]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.soybeanTitle}>Soybean</Text>
          <Text style={styles.soybeanText}>Expected yield: 12-15 quintals/acre</Text>
          <Text style={styles.soybeanProfit}>Profit margin: ₹20,000-25,000/acre</Text>
        </View>
        <View style={styles.matchContainer}>
          <Text style={styles.soybeanMatch}>87%</Text>
          <Text style={styles.matchLabel}>Match</Text>
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Volume2 width={20} height={20} color="white" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Listen to detailed advice</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 32, // full width minus padding from parent
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignSelf: 'center', // center the container horizontally
    marginVertical: 8,
  },
  heading: { fontSize: 18, fontWeight: '600', color: '#1f2937', marginBottom: 12 },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    width: '100%', // make card stretch full width of container
  },
  cottonCard: { backgroundColor: '#FFF7ED' },
  soybeanCard: { backgroundColor: '#ECFDF5' },
  cottonTitle: { fontWeight: '500', color: '#C2410C' },
  cottonText: { fontSize: 12, color: '#EA580C' },
  cottonProfit: { fontSize: 12, color: '#16A34A' },
  soybeanTitle: { fontWeight: '500', color: '#15803D' },
  soybeanText: { fontSize: 12, color: '#16A34A' },
  soybeanProfit: { fontSize: 12, color: '#16A34A' },
  matchContainer: { alignItems: 'flex-end', justifyContent: 'center', width: 60 },
  cottonMatch: { fontSize: 16, fontWeight: '700', color: '#EA580C' },
  soybeanMatch: { fontSize: 16, fontWeight: '700', color: '#16A34A' },
  matchLabel: { fontSize: 10, color: '#6B7280' },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F97316',
    paddingVertical: 12,
    borderRadius: 12,
    width: '100%', // button stretches full width of container
  },
  buttonText: { color: '#fff', fontWeight: '500' },
});

export default CropAdvice;
