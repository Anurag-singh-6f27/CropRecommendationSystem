import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MarketPricesProps {
  t: (key: string) => string;
}

class MarketPrices extends Component<MarketPricesProps> {
  render() {
    const { t } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{t('market')} Prices</Text>
        <View style={styles.listContainer}>
          {/* Cotton Item */}
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Cotton (कापूस)</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceGreen}>₹5,200/quintal</Text>
              <Text style={styles.changeGreen}>↑ ₹120</Text>
            </View>
          </View>

          {/* Soybean Item */}
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Soybean (सोयाबीन)</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceRed}>₹4,800/quintal</Text>
              <Text style={styles.changeRed}>↓ ₹50</Text>
            </View>
          </View>

          {/* Wheat Item */}
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Wheat (गहू)</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceBlue}>₹2,100/quintal</Text>
              <Text style={styles.changeGray}>→ Same</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

// Stylesheet
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  listContainer: {
    // Removed unsupported 'gap', use spacing in items
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 6,
    marginBottom: 12, // spacing between items
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceGreen: {
    fontWeight: 'bold',
    color: '#16a34a',
    fontSize: 16,
  },
  changeGreen: {
    fontSize: 12,
    color: '#22c55e',
  },
  priceRed: {
    fontWeight: 'bold',
    color: '#dc2626',
    fontSize: 16,
  },
  changeRed: {
    fontSize: 12,
    color: '#ef4444',
  },
  priceBlue: {
    fontWeight: 'bold',
    color: '#2563eb',
    fontSize: 16,
  },
  changeGray: {
    fontSize: 12,
    color: '#6b7280',
  },
});

export default MarketPrices;
