import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuickActions: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Quick Actions</Text>
      <View style={styles.grid}>
        <TouchableOpacity style={[styles.button, styles.blueButton]}>
          <Text style={[styles.buttonText, styles.blueText]}>Irrigation Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.greenButton]}>
          <Text style={[styles.buttonText, styles.greenText]}>Fertilizer Guide</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.yellowButton]}>
          <Text style={[styles.buttonText, styles.yellowText]}>Disease Alert</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.purpleButton]}>
          <Text style={[styles.buttonText, styles.purpleText]}>Harvest Timer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginVertical: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    flexBasis: '48%', // Two columns
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  blueButton: { backgroundColor: '#DBEAFE' },
  greenButton: { backgroundColor: '#DCFCE7' },
  yellowButton: { backgroundColor: '#FEF9C3' },
  purpleButton: { backgroundColor: '#EDE9FE' },
  blueText: { color: '#1D4ED8' },
  greenText: { color: '#15803D' },
  yellowText: { color: '#D97706' },
  purpleText: { color: '#7C3AED' },
});

export default QuickActions;
