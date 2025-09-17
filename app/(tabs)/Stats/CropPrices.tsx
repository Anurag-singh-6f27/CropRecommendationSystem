import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

interface CropPrice {
  name: string;
  pricePerKg: number; // Price in INR per kg
}

interface State {
  cropPrices: CropPrice[];
}

export default class CropPriceChart extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    // Default prices for Nagpur (can be replaced with API fetch later)
    this.state = {
      cropPrices: [
        { name: 'Tomato', pricePerKg: 35 },
        { name: 'Onion', pricePerKg: 25 },
        { name: 'Potato', pricePerKg: 20 },
        { name: 'Cotton', pricePerKg: 45 },
        { name: 'Soybean', pricePerKg: 38 },
        { name: 'Wheat', pricePerKg: 30 },
        { name: 'Rice', pricePerKg: 32 },
        { name: 'Chili', pricePerKg: 60 },
        { name: 'Maize', pricePerKg: 28 },
        { name: 'Sugarcane', pricePerKg: 22 },
      ],
    };
  }

  render() {
    const { cropPrices } = this.state;

    // Convert price to bulk (100 kg)
    const bulkData = cropPrices.map(c => ({
      name: c.name,
      price: c.pricePerKg * 100, // Price per 100 kg
    }));

    const data = {
      labels: bulkData.map(c => c.name),
      datasets: [
        {
          data: bulkData.map(c => c.price),
        },
      ],
    };

    return (
      <ScrollView horizontal style={{ paddingVertical: 16 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Top 10 Crop Prices (₹ per 100 kg, Nagpur)</Text>
          <BarChart
  data={data}
  width={Math.max(Dimensions.get('window').width, cropPrices.length * 60)}
  height={300}
  yAxisLabel="₹"
  yAxisSuffix=""      // ✅ Add this line
  chartConfig={{
    backgroundColor: '#F3F4F6',
    backgroundGradientFrom: '#F3F4F6',
    backgroundGradientTo: '#F3F4F6',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(55, 65, 81, ${opacity})`,
    style: { borderRadius: 16 },
    propsForBackgroundLines: { stroke: '#E5E7EB' },
  }}
  style={{ borderRadius: 16 }}
  fromZero
  showValuesOnTopOfBars
/>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
});
