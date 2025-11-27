import React from "react";

export default function Forecast({ list }) {
  const daysMap = {};

  list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!daysMap[date]) {
      daysMap[date] = {
        date,
        min: item.main.temp_min,
        max: item.main.temp_max,
        icon: item.weather[0].icon,
        desc: item.weather[0].description,
      };
    } else {
      daysMap[date].min = Math.min(daysMap[date].min, item.main.temp_min);
      daysMap[date].max = Math.max(daysMap[date].max, item.main.temp_max);
    }
  });


  const allDays = Object.values(daysMap).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const daysToShow = allDays.slice(1, 6);

  const getDayName = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", { weekday: "short" });

  return (
    <div className="forecast-grid">
      {daysToShow.map((day, idx) => (
        <div className="forecast-card" key={idx}>
          <p className="forecast-day">{getDayName(day.date)}</p>
          <img
            src={`https://openweathermap.org/img/wn/${day.icon}.png`}
            alt={day.desc}
          />
          <p className="forecast-temp">
            {Math.round(day.max)}°C /{" "}
            <span className="min-temp">{Math.round(day.min)}°C</span>
          </p>
          <p className="forecast-desc">{day.desc}</p>
        </div>
      ))}
    </div>
  );
}
