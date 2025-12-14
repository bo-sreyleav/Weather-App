
export default function CurrentWeather({ data }) {
 
  if (!data || !data.main) return null

  const getWeatherIcon = (weatherCode) => {
    const icons = {
      "01d": "☀️",
      "01n": "🌙", 
      "02d": "⛅", 
      "02n": "☁️",
      "03d": "☁️", 
      "03n": "☁️", 
      "04d": "☁️", 
      "04n": "☁️", 
      "09d": "🌧️", 
      "09n": "🌧️", 
      "10d": "🌦️", 
      "10n": "🌧️", 
      "11d": "⛈️", 
      "11n": "⛈️", 
      "13d": "❄️", 
      "13n": "❄️", 
      "50d": "🌫️", 
      "50n": "🌫️", 
    }
    return icons[weatherCode] || "☀️" 
  }

 
  const formatDate = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ]
    const date = new Date()
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  
  return (
    <div className="current-weather-box">
      <div className="current-weather-main">
        <div className="current-weather-info">
          {/* CITY NAME */}
          <h2 className="current-city-name">{data.name}</h2>
          
          {/* TODAY'S DATE */}
          <p className="current-date">{formatDate()}</p>
          
          {/* TEMPERATURE AND WEATHER ICON */}
          <div className="current-temp-section">
            <span className="current-temp">{Math.round(data.main.temp)}°C</span>
            <span className="current-icon">{getWeatherIcon(data.weather[0].icon)}</span>
          </div>
          
          {/* WEATHER DESCRIPTION (e.g., "Partly cloudy") */}
          <p className="current-description">{data.weather[0].description}</p>
        </div>
      </div>
    </div>
  )
}
