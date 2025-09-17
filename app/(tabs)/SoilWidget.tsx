import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native';
// ✅ Import the new, reusable function from the service file
import { getSoilMoisture } from './services/soilservices';

// Soil data type (for the component's state)
type SoilData = {
  ph: number;
  moisture: number;
  nitrogen: number;
  soc: number; // Soil Organic Carbon
  potassium: number;
  healthScore: number;
};

export interface SoilWidgetProps {
  t: (key: string) => string; // translation function
}

// --- Helper Functions for Health Score Calculation ---
const normalize = (value: number, optimalMin: number, optimalMax: number) => {
  if (value >= optimalMin && value <= optimalMax) return 1;
  if (value < optimalMin) return Math.max(0, 1 - (optimalMin - value) / optimalMin);
  return Math.max(0, 1 - (value - optimalMax) / optimalMax);
};

const calculateHealthScore = (chemicals: Omit<SoilData, 'moisture' | 'healthScore'>, moisture: number): number => {
    const phScore = normalize(chemicals.ph, 6.0, 7.5);
    const nitrogenScore = normalize(chemicals.nitrogen, 2000, 5000);
    const socScore = normalize(chemicals.soc, 120, 180);
    const moistureScore = normalize(moisture, 40, 70);

    const totalScore = (phScore + nitrogenScore + socScore + moistureScore) / 4;
    return parseFloat((totalScore * 10).toFixed(1));
}

// --- Main Soil Widget Component ---
const SoilWidget: React.FC<SoilWidgetProps> = ({ t }) => {
  const [soilData, setSoilData] = React.useState<SoilData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const latitude = 21.1458;  // Nagpur
  const longitude = 79.0882;

  React.useEffect(() => {
    const fetchSoilData = async () => {
      // Using reliable average values for chemical properties
      const soilChemicals = {
        ph: 6.8,
        nitrogen: 1600,
        soc: 110,
        potassium: 55,
      };

      // ✅ Call the reusable service function to get live moisture data
      const moistureValue = await getSoilMoisture(latitude, longitude);

      if (moistureValue === null) {
        // Handle the case where the API call failed
        setError("Could not fetch live soil moisture.");
        // Use a fallback moisture value to calculate score
        const fallbackMoisture = 60;
        const healthScore = calculateHealthScore(soilChemicals, fallbackMoisture);
        setSoilData({ ...soilChemicals, moisture: fallbackMoisture, healthScore });
      } else {
        // If successful, calculate the health score with live data
        const healthScore = calculateHealthScore(soilChemicals, moistureValue);
        setSoilData({
          ...soilChemicals,
          moisture: moistureValue,
          healthScore: healthScore,
        });
        setError(null); // Clear any previous errors
      }

      setLoading(false);
    };

    fetchSoilData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#22c55e" />
        <Text style={styles.loadingText}>{t("loading_soil_data")}</Text>
      </View>
    );
  }

  if (!soilData) return null;

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Text style={styles.title}>{t("soil_health")}</Text>
      <View style={styles.scoreRow}>
        <Text style={styles.scoreLabel}>Health Score</Text>
        <Text style={styles.scoreValue}>{soilData.healthScore}/10</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${(soilData.healthScore / 10) * 100}%` }]} />
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statText}>pH: {soilData.ph}</Text>
          <Text style={styles.statSubText}>Good</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statText}>N: {soilData.nitrogen}</Text>
          <Text style={styles.statSubText}>Medium</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statText}>SOC: {soilData.soc}</Text>
          <Text style={styles.statSubText}>Low</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statText}>K: {soilData.potassium}</Text>
          <Text style={styles.statSubText}>Medium</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    padding: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF', borderRadius: 12,
  },
  loadingText: {
    marginTop: 8, color: '#333',
  },
  errorText: {
    color: '#FFFFE0',
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 12,
    fontStyle: 'italic',
  },
  container: {
    backgroundColor: '#22c55e', padding: 16, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 4, width: '100%',
  },
  title: {
    fontSize: 18, fontWeight: '600', color: 'white',
  },
  scoreRow: {
    marginTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline',
  },
  scoreLabel: {
    color: 'white', fontSize: 16,
  },
  scoreValue: {
    color: 'white', fontSize: 28, fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.3)', marginTop: 4, overflow: 'hidden',
  },
  progressBar: {
    height: '100%', borderRadius: 4, backgroundColor: 'white',
  },
  statsRow: {
    marginTop: 16, flexDirection: 'row', justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statText: {
    color: 'white', fontSize: 14, fontWeight: '500',
  },
  statSubText: {
    color: '#bbf7d0', fontSize: 12, marginTop: 2,
  },
});

export default SoilWidget;

