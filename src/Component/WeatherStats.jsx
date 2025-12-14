
export default function WeatherStats({ data }) {

  if (!data || !data.main) return null

  return (
    <div className="weather-stats-box">
      <div className="stats-grid">
        {/* FEELS LIKE TEMPERATURE */}
        <div className="stat-item">
          <div className="stat-icon">🌡️</div>
          <div className="stat-details">
            <p className="stat-label">Feels Like</p>
            <p className="stat-value">{Math.round(data.main.feels_like)}°C</p>
          </div>
        </div>

        {/* HUMIDITY */}
        <div className="stat-item">
          <div className="stat-icon">💧</div>
          <div className="stat-details">
            <p className="stat-label">Humidity</p>
            <p className="stat-value">{data.main.humidity}%</p>
          </div>
        </div>

        {/* WIND SPEED */}
        <div className="stat-item">
          <div className="stat-icon">💨</div>
          <div className="stat-details">
            <p className="stat-label">Wind Speed</p>
            <p className="stat-value">{Math.round(data.wind.speed * 3.6)} km/h</p>
          </div>
        </div>

        {/* PRESSURE */}
        <div className="stat-item">
          <div className="stat-icon">🔽</div>
          <div className="stat-details">
            <p className="stat-label">Pressure</p>
            <p className="stat-value">{data.main.pressure} hPa</p>
          </div>
        </div>
      </div>
    </div>
  )
}
