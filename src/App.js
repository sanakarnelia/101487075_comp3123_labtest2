import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import WeatherDetails from "./components/WeatherDetails";
import Forecast from "./components/Forecast";
import "./App.css";

const API_KEY = "47d86e4fb817e6fba9a8a1661e4f08de";

export default function App() {
  const [city, setCity] = useState("Toronto");
  const [weather, setWeather] = useState(null); 
  const [forecast, setForecast] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 const fetchWeather = async () => {
  try {
    setLoading(true);
    setError("");


    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();

    if (data.cod !== 200) {
      setError(data.message || "Error fetching weather");
      setWeather(null);
      setForecast(null);
      setLoading(false);
      return;
    }

    setWeather(data);
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    const forecastData = await forecastRes.json();

    if (forecastData.cod !== "200") {
      console.log("Forecast error:", forecastData);
      setForecast(null);
    } else {
      setForecast(forecastData);
    }

    setLoading(false);
  } catch (err) {
    console.error("Error fetching weather:", err);
    setError("Something went wrong. Please try again.");
    setLoading(false);
  }
};


  
  useEffect(() => {
    fetchWeather();
  }, [city]);

  return (
    <div className="app-container">
      <h1>Weather App</h1>

      <SearchBar onSearch={setCity} />

      {loading && <p>Loading weather...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && weather && weather.main && (
        <>
          {/* TOP: 2 boxes side by side */}
          <div className="top-row">
            <div className="box-left">
              <WeatherCard data={weather} />
            </div>
            <div className="box-right">
              <WeatherDetails data={weather} />
  
           <Forecast list={forecast.list} />
            </div>
          </div>

          {forecast && forecast.list && (
  <div className="forecast-section">
    
  </div>
)}

        </>
      )}
    </div>
  );
}
