import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { fetchTopCommoditiesByPrice, MarketRecord } from './services/market_api';

interface MarketPricesProps {}

interface MarketPricesState {
  data: { commodity: string; highestPrice: number; record: MarketRecord }[];
  loading: boolean;
  error?: string;
}

class MarketPrices extends Component<MarketPricesProps, MarketPricesState> {
  state: MarketPricesState = {
    data: [],
    loading: true,
  };

  async componentDidMount() {
    try {
      const state = 'Maharashtra';
      const district = 'Nagpur';
      const market = 'Katol';

      // Fetch top commodities directly for given state/district/market
      const topCommodities = await fetchTopCommoditiesByPrice(
        state,
        district,
        market,
        3
      );

      this.setState({ data: topCommodities, loading: false }); // top 3
    } catch (err) {
      console.error(err);
      this.setState({ error: 'Failed to fetch prices', loading: false });
    }
  }

  render() {
    const { data, loading, error } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Katol Market Prices – Top 3</Text>

        {loading && <ActivityIndicator size="small" />}
        {error && <Text style={styles.error}>{error}</Text>}

        <ScrollView>
          {data.map((item) => (
            <View key={item.commodity} style={styles.itemContainer}>
              <Text style={styles.itemText} numberOfLines={2} ellipsizeMode="tail">
                {item.commodity} ({item.record.market})
              </Text>
              <View style={styles.priceContainer}>
                <Text
                  style={[styles.price, styles.priceBlue]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  ₹{item.highestPrice}/quintal
                </Text>
                <Text style={styles.change}>{item.record.arrival_date}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#1f2937',
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 6,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginRight: 8,
  },
  priceContainer: {
    maxWidth: '40%',
    alignItems: 'flex-end',
    flexShrink: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
  },
  change: {
    fontSize: 13,
    marginTop: 2,
    fontWeight: '500',
    color: '#6b7280',
  },
  priceBlue: { color: '#2563eb' },
});

export default MarketPrices;
