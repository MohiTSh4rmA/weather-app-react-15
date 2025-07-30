import React from 'react';

function CurrentWeather({ data }) {
  const { name, main, weather, wind, sys } = data;
  return (
    <div className="card">
      <h2>{name}, {sys.country}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
        alt="icon"
      />
      <h3>{weather[0].main} - {weather[0].description}</h3>
      <p>🌡️ Temp: {main.temp}°C</p>
      <p>💧 Humidity: {main.humidity}%</p>
      <p>🌬️ Wind: {wind.speed} m/s</p>
    </div>
  );
}

export default CurrentWeather;
