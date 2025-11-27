import React from "react";

export default function WeatherDetails({ data }) {
  const { main, wind } = data;

  const feelsLike = main.feels_like;
  const humidity = main.humidity;
  const pressure = main.pressure;
  const windSpeed = wind.speed;

  

  return (
    <div className="weather-details">

      <div className="detail-row">
        <span>Feels like:</span>
        <span>{Math.round(feelsLike)}°C</span>
      </div>

      <div className="detail-row">
        <span>Humidity:</span>
        <span>{humidity}%</span>
      </div>

      <div className="detail-row">
        <span>Pressure:</span>
        <span>{pressure} hPa</span>
      </div>

      <div className="detail-row">
        <span>Wind speed:</span>
        <span>{windSpeed} m/s</span>
      </div>
    </div>
  );
}
