import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiFog,
  WiThunderstorm,
} from "react-icons/wi";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const API_KEY = import.meta.env.VITE_OPEN_WEATHER_IDEA; // replace with your OpenWeather API key

  const getWeather = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=imperial`,
          );
          setWeather(response.data);
        } catch (error) {
          console.error(error);
        }
      },
      (error) => console.error(error),
    );
  };
  const weatherIcons = {
    Clouds: <WiCloud />,
    Rain: <WiRain />,
    Clear: <WiDaySunny />,
    Snow: <WiSnow />,
    Mist: <WiFog />,
    Thunderstorm: <WiThunderstorm />,
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {weather ? (
        <div className="text-2xl font-mono">
          <span role="img" aria-label="thermometer">
            🌡️
          </span>
          {`${weather.main.temp}°F in ${weather.name}`}
          <span role="img" aria-label="cityscape">
            🏙️
          </span>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
