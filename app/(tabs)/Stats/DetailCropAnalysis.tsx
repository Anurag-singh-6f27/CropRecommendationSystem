import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

class DetailedCropAnalysis extends Component {
  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Detailed Crop Analysis</Text>

        {/* Cotton Recommendation Box */}
        <View style={[styles.box, styles.cottonBox]}>
          <Text style={styles.boxTitle}>Crop Recommendation: Cotton</Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>• Sowing time: June 15-30, 2025</Text>
            <Text style={styles.listItem}>• Expected rainfall: Adequate for growth</Text>
            <Text style={styles.listItem}>• Soil moisture: Optimal at 45%</Text>
            <Text style={styles.listItem}>• Market demand: High for quality cotton</Text>
          </View>
        </View>

        {/* Soybean Alternative Box */}
        <View style={[styles.box, styles.soybeanBox]}>
          <Text style={styles.boxTitle}>Alternative: Soybean</Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>• Lower water requirement</Text>
            <Text style={styles.listItem}>• Nitrogen fixation benefits</Text>
            <Text style={styles.listItem}>• Shorter growing cycle (90-100 days)</Text>
            <Text style={styles.listItem}>• Good rotation crop</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F3F4F6',
    gap: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1F2937',
  },
  box: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cottonBox: {
    borderColor: '#FBBF24',
    borderWidth: 1,
  },
  soybeanBox: {
    borderColor: '#22C55E',
    borderWidth: 1,
  },
  boxTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  list: {
    paddingLeft: 8,
  },
  listItem: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
});

export default DetailedCropAnalysis;
