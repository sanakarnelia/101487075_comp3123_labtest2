import React from "react";

export default function WeatherCard({ data }) {
  const { name, main, weather,dt} = data;

  const icon = weather[0].icon;
  const description = weather[0].description;
  const temp = main.temp;

  const getDayName = (unixTimestamp) =>
    new Date(unixTimestamp * 1000).toLocaleDateString("en-US", {
      weekday: "long",
    });

     const todayName = getDayName(dt);

  return (
    <div className="weather-card">
      <h2>{name}</h2>
     
      <h5 className="weekday">{todayName}</h5>


      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="weather icon"
      />

      <h3>{Math.round(temp)}°C</h3>
      <p className="description">{description}</p>
    </div>
  );
}
