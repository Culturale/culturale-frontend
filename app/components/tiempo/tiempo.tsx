import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const WeatherWidget = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=8e9e12dcf0bf4e70b0c150536230805&lang=es&q=${location}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWeatherData();
  }, [location]);

  if (!weatherData) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  }

  const { temp_c, condition } = weatherData.current;

  return (
    <View>

      <Text>Temperatura: {temp_c}°C</Text>
      <Text>Condición: {condition.text}</Text>
    </View>
  );
};

export default WeatherWidget;
