import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';


// IMPORTANT: This API key is a placeholder and will not work.
// You must replace it with your own valid API key from OpenWeatherMap.
// Get your key here: https://home.openweathermap.org/api_keys

const CITY = "Nagpur";

// Define the type for the API response data
type CurrentWeatherDataResponse = {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string;
  }[];
  wind: {
    speed: number;
  };
};

type WeatherData = {
  temp: number;
  humidity: number;
  weather: { main: string }[];
  windSpeed: number;
};

// A helper function to map weather conditions to appropriate icons
const getWeatherIcon = (weatherMain: string) => {
  switch (weatherMain) {
    case 'Thunderstorm': return 'bolt';
    case 'Drizzle': return 'cloud-rain';
    case 'Rain': return 'cloud-showers-heavy';
    case 'Snow': return 'snowflake';
    case 'Clear': return 'sun';
    case 'Clouds': return 'cloud';
    default: return 'smog'; // For Atmosphere, Mist, Haze etc.
  }
};

// Helper function to get a descriptive term for wind speed (in m/s)
// This uses a simplified version of the Beaufort Scale
const getWindDescription = (speed: number) => {
  if (speed < 0.3) {
    return 'Calm';
  } else if (speed < 1.5) {
    return 'Light Air';
  } else if (speed < 5.5) {
    return 'Breezy';
  } else if (speed < 10.8) {
    return 'Windy';
  } else if (speed < 17.2) {
    return 'Strong Wind';
  } else {
    return 'Very Strong Wind';
  }
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherRes = await axios.get<CurrentWeatherDataResponse>(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
        );

        const { main, weather, wind } = weatherRes.data;

        setWeather({
          temp: main.temp,
          humidity: main.humidity,
          weather: weather,
          windSpeed: wind.speed,
        });

      } catch (err) {
        if ((err as any).isAxiosError && (err as any).response) {
          if ((err as any).response.status === 401) {
            setError("Invalid API key. Please check your API key in the code.");
          } else {
            setError(`Error fetching weather: ${(err as any).response.data.message || (err as any).message}`);
          }
        } else {
          setError("Could not fetch weather data. Please check your network connection.");
        }
        console.error("Weather fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // --- Render Logic ---

  if (loading) {
    return (
      <View style={styles.widgetContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error || !weather) {
    return (
      <View style={[styles.widgetContainer, { backgroundColor: '#ef4444' }]}>
        <Icon name="exclamation-triangle" size={24} color="#fff" />
        <Text style={styles.errorText}>{error || "Unable to load weather data."}</Text>
      </View>
    );
  }

  return (
    <View style={styles.widgetContainer}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <View>
          <Text style={styles.title}>{CITY}</Text>
          <View style={styles.temperatureContainer}>
            <Icon name="thermometer-half" size={28} color="#fff" />
            <Text style={styles.temperatureText}>
              {Math.round(weather.temp)}°C
            </Text>
          </View>
        </View>
        <View style={styles.weatherIconContainer}>
          <Icon
            name={getWeatherIcon(weather.weather?.[0]?.main)}
            size={60}
            color="#fff"
            style={styles.mainWeatherIcon}
          />
          {/* Display the weather type below the icon */}
          <Text style={styles.weatherDescription}>{weather.weather?.[0]?.main}</Text>
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.detailItem}>
          <Icon name="tint" size={16} color="#fff" />
          <Text style={styles.detailText}>{weather.humidity}% Humidity</Text>
        </View>
        {/* The wind speed is already included here */}
        <View style={styles.detailItem}>
          <Icon name="wind" size={16} color="#fff" />
          <Text style={styles.detailText}>
            {getWindDescription(weather.windSpeed)} ({weather.windSpeed} m/s)
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    widgetContainer: {
      backgroundColor: '#3b82f6',
      padding: 20,
      borderRadius: 12,
      width: '100%',
      maxWidth: 400,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 8,
      minHeight: 150,
      justifyContent: 'center',
      alignItems: 'center',
    },
    topSection: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    title: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
    },
    temperatureContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    temperatureText: {
      color: '#fff',
      fontSize: 32,
      fontWeight: 'bold',
      marginLeft: 8,
    },
    weatherIconContainer: {
      alignItems: 'center',
    },
    mainWeatherIcon: {
      opacity: 0.9,
    },
    weatherDescription: {
      color: '#fff',
      fontSize: 14,
      marginTop: 4,
      fontWeight: 'bold',
    },
    bottomSection: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 24,
    },
    detailItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    detailText: {
      color: '#fff',
      fontSize: 14,
      marginLeft: 8,
    },
    errorText: {
        color: "#fff",
        marginTop: 10,
        textAlign: 'center',
        paddingHorizontal: 10,
    }
});

export default WeatherWidget;
