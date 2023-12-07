import { Alert, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import axios from 'axios'

import Loader from './components/loader';
import Weather from './components/weather';

//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const API_KEY = "f7183457ff5227cae940f97543125dd5";



export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [location, setLocation] = useState(null)

  const getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)

    setLocation(data)
    setIsLoading(false);
  }

  const setWeather = async query => {
    try {
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`)

      setLocation(data)
      setIsLoading(false);
    } catch (error) {
      Alert.alert('City not found!')
    }

  }
  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied')
        return;
      }

      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({})


      getWeather(latitude, longitude)
    } catch (error) {
      Alert.alert("I can't find your current location, so bad ): ")
    }
  };

  useEffect(() => {
    getLocation();
  }, []);


  return isLoading ? (
    <Loader />) : (
    <Weather
      setWeather={setWeather}
      temp={Math.round(location.main.temp)}
      name={location.name}
      condition={location.weather[0].main}
    />
  );
}

const styles = StyleSheet.create({
});
