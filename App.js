import React from 'react';
import { useState } from 'react';
// Import axios, BASE_URL, dan API_KEY
import axios from 'axios';
import { BASE_URL, API_KEY } from './src/constant';
import WeatherSearch from './src/components/weatherSearch';
import WeatherInfo from './src/components/weatherInfo';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';

const App = () => {
  const [weatherData, setWeatherData] = useState();
  // Definisikan state status
  const [status, setStatus] = useState('');

  // Definisikan function renderComponent
  const renderComponent = () => {
    switch (status) {
      case 'loading':
        return <ActivityIndicator size='large' />;
      case 'success':
        return <WeatherInfo weatherData={weatherData} />;
      case 'error':
        return (
          <Text>
            Something went wrong. Please try again with a correct city name.
          </Text>
        );
      default:
        return;
    }
  };
  const searchWeather = (location) => {
    // Mengatur status ke "loading"
    setStatus('loading');
    axios
      .get(`${BASE_URL}?q=${location}&appid=${API_KEY}`)
      .then((response) => {
        const data = response.data;
        data.visibility /= 1000;
        data.visibility = data.visibility.toFixed(2);
        data.main.temp -= 273.15;
        data.main.temp = data.main.temp.toFixed(2);
        setWeatherData(data);
        // Mengatur status ke "success"
        setStatus('success');
      })
      .catch((error) => {
        // Mengatur status ke "error"
        console.log(error);
        setStatus('error');
      });
  };

  return (
    <View style={styles.container}>
      <WeatherSearch searchWeather={searchWeather} />
      {/* Menggunakan function renderComponent di sini */}
      <View style={styles.margintTop20}>{renderComponent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default App;
