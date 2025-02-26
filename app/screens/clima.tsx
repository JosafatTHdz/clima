import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import WeatherCard from '../components/WeatherCard';

const API_KEY = 'SGJ7LQFF2U3DDYDJJTY6CHVYC';
const API_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Mexico?unitGroup=metric&key=${API_KEY}&include=days&elements=datetime,tempmax,tempmin,precip,conditions,icon`;

const ClimaApp = () => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const limitedForecast = data.days.slice(0, 7); // Limitar a solo 7 días
        setForecast(limitedForecast);
        console.log('Weather data:', limitedForecast);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const renderWeatherCard = ({ item }: { item: any }) => (
    <WeatherCard
      date={item.datetime}
      maxTemp={item.tempmax}
      minTemp={item.tempmin}
      rainChance={item.precip}
      condition={item.conditions}
      icon={item.icon}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pronóstico del clima (7 días)</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#00aaff" />
      ) : (
        <FlatList
          data={forecast}
          renderItem={renderWeatherCard}
          keyExtractor={(item) => item.datetime}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default ClimaApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  listContainer: {
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
});
