import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { fetchTopCommoditiesByPrice } from '../services/market_api';

interface CropPrice {
  name: string;           // truncated name for axis
  pricePerQuintal: number;
}

interface State {
  cropPrices: CropPrice[];
  loading: boolean;
  error?: string;
}

export default class CropPriceChart extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      cropPrices: [],
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const state = 'Maharashtra';
      const district = 'Nagpur';
      const market = 'Katol';

      const topCommodities = await fetchTopCommoditiesByPrice(
        state,
        district,
        market,
        10
      );

      const cropPrices: CropPrice[] = topCommodities.map((item) => ({
        // truncate to max 8 chars plus ellipsis to avoid overlap
        name:
          item.commodity.length > 8
            ? item.commodity.slice(0, 8) + '…'
            : item.commodity,
        pricePerQuintal: item.highestPrice,
      }));

      this.setState({ cropPrices, loading: false });
    } catch (err) {
      console.error(err);
      this.setState({ error: 'Failed to fetch prices', loading: false });
    }
  }

  render() {
    const { cropPrices, loading, error } = this.state;

    if (loading) return <Text style={{ padding: 16 }}>Loading crop prices...</Text>;
    if (error) return <Text style={{ padding: 16, color: 'red' }}>{error}</Text>;

    const data = {
      labels: cropPrices.map((c) => c.name),
      datasets: [
        {
          data: cropPrices.map((c) => c.pricePerQuintal),
        },
      ],
    };

    return (
      <ScrollView horizontal style={{ paddingVertical: 16 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Top 5 Crop Prices (₹ per quintal, Katol)</Text>

          <BarChart
            data={data}
            width={Math.max(Dimensions.get('window').width, cropPrices.length * 120)}
            height={300}
            yAxisLabel="₹"
            yAxisSuffix=""   // required prop
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
            verticalLabelRotation={0}
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
