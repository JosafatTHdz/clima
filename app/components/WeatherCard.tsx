import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface WeatherCardProps {
  date: string;
  maxTemp: number;
  minTemp: number;
  rainChance: number;
  condition: string;
  icon: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ date, maxTemp, minTemp, rainChance, condition, icon }) => {
  const getBackgroundColor = () => {
    if (maxTemp < 20) return '#8ecae6'; // Azul para temperaturas frías
    if (maxTemp <= 30) return '#ffb703'; // Amarillo para temperaturas templadas
    return '#fb8500'; // Naranja para temperaturas cálidas
  };

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>      
      <Text style={styles.date}>{date}</Text>
      <Image source={{ uri: `https:${icon}` }} style={styles.icon} />
      <Text style={styles.text}>Max: {maxTemp}°C</Text>
      <Text style={styles.text}>Min: {minTemp}°C</Text>
      <Text style={styles.text}>Lluvia: {rainChance}%</Text>
      <Text style={styles.text}>Condición: {condition}</Text>
    </View>
  );
};

export default WeatherCard;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  date: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 18,
  },
  icon: {
    width: 64,
    height: 64,
    marginBottom: 8,
  }
});
