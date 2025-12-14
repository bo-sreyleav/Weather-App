import { useState, useEffect } from "react";
import WeatherSearch from "./Component/WeatherSearch";
import CurrentWeather from "./Component/CurrentWeather";
import WeatherStats from "./Component/WeatherStats";
import ForecastList from "./Component/ForecastList";
import "./App.css";

export default function App() {
  const API_KEY = "6abf666c5cd9c07774c77c0e47535c1b";
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);


  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const weather = await weatherResponse.json();
      const forecast = await forecastResponse.json();

      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err) {

      setError(err.message);
    } finally {

      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (city) => {
    try {
      setLoading(true);
      setError(null);

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );


      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error("City not found");
      }
      const weather = await weatherResponse.json();
      const forecast = await forecastResponse.json();


      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err) {

      setError(err.message);
    } finally {

      setLoading(false);
    }
  };


  const getCurrentLocation = () => {
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
        (position) => {

          fetchWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (err) => {

          setError("Unable to get your location");

          fetchWeatherByCity("Phnom Penh");
        }
      );
    } else {

      fetchWeatherByCity("Phnom Penh");
    }
  };


  useEffect(() => {
    getCurrentLocation();

  }, []);


  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      {/* HEADER - Top navigation bar */}
      <header className="app-header">
        <div className="header-wrapper">
          {/* LOGO */}
          <div className="logo-wrapper">
            <h1 className="logo-title">🌤️WEATHER</h1>
          </div>

          {/* SEARCH INPUT */}
          <WeatherSearch onSearch={fetchWeatherByCity} />

          {/* HEADER BUTTONS */}
          <div className="header-buttons">
            {/* LOCATION BUTTON */}
            <button onClick={getCurrentLocation} className="header-button">
              📍 Location
            </button>

            {/* THEME TOGGLE BUTTON */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="header-button"
            >
              {darkMode ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="main-wrapper">
        {/* SHOW SPINNER WHILE LOADING */}
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {/* SHOW ERROR MESSAGE IF ERROR OCCURS */}
        {error && (
          <div className="error-container">
            <p>{error}</p>
            <button onClick={getCurrentLocation} className="header-button">
              Try Again
            </button>
          </div>
        )}

        {/* SHOW WEATHER DATA IF LOADED SUCCESSFULLY */}
        {!loading && !error && weatherData && (
          <>
            {/* Current weather (big display) */}
            <CurrentWeather data={weatherData} />
            {/* Weather stats (feels like, humidity, wind, pressure) */}
            <WeatherStats data={weatherData} />
            {/* 5-day forecast */}
            <ForecastList data={forecastData} />
          </>
        )}
      </main>

      {/* FOOTER - Bottom info */}
      <footer className="app-footer">
        <p> &copy; Weather data provided by OpenWeatherMap</p>
      </footer>
    </div>
  );
}
