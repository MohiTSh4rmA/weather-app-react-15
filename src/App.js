import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

const API_KEY = "ff7d0e702dace9ec51c8d40591313475";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [city, setCity] = useState('');
  const [theme, setTheme] = useState('light');

  const fetchWeather = async (query) => {
    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`
      );
      const { coord } = weatherRes.data;
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(weatherRes.data);
      setForecastData(forecastRes.data);
    } catch {
      alert('City not found');
    }
  };

  const fetchByGeo = () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(weatherRes.data);
      setForecastData(forecastRes.data);
    });
  };

  useEffect(() => {
    fetchByGeo();
  }, []);

  return (
    <div className={`App ${theme}`}>
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <h1>🌤️ Weather App</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchWeather(city)}
        />
        <button onClick={() => fetchWeather(city)}>Search</button>
        <button onClick={fetchByGeo}>📍 Use My Location</button>
      </div>

      {weatherData && <CurrentWeather data={weatherData} />}
      {forecastData && <Forecast data={forecastData} />}
    </div>
  );
}

export default App;
