export default function ForecastList({ data }) {
  if (!data || !data.list) return null;
  const getWeatherIcon = (weatherMain) => {
    const icons = {
      Clear: "☀️",
      Clouds: "☁️", 
      Rain: "🌧️", 
      Drizzle: "🌦️", 
      Thunderstorm: "⛈️", 
      Snow: "❄️", 
      Fog: "🌫️", 
    }
    return icons[weatherMain] || "☀️" 
    
  }

  const getDailyForecast = () => {
    const dailyData = []
    const days = {}

    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000) 
      const dayKey = date.toDateString() 
     
      if (!days[dayKey]) {
        days[dayKey] = {
          date: date,
          temps: [],
          weather: item.weather[0].main, 
          description: item.weather[0].description, 
        }
      }
      
      days[dayKey].temps.push(item.main.temp)
    })

   
    Object.values(days)
      .slice(0, 5)
      .forEach((day) => {
        dailyData.push({
          date: day.date,
          maxTemp: Math.round(Math.max(...day.temps)), 
          minTemp: Math.round(Math.min(...day.temps)), 
          description: day.description,
        })
      })

    return dailyData
  }

  
  const formatDate = (date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`
  }

  const dailyForecast = getDailyForecast()

  
  return (
    <div className="forecast-section">
      {/* TITLE */}
      <h2 className="forecast-title">5-Day Forecast</h2>
      
      {/* FORECAST GRID */}
      <div className="forecast-grid">
        {/* LOOP THROUGH EACH DAY AND CREATE A CARD */}
        {dailyForecast.map((day, index) => (
          <div key={index} className="forecast-card">
            {/* DATE */}
            <div className="forecast-date">{formatDate(day.date)}</div>
            
            {/* WEATHER ICON */}
            <div className="forecast-icon">{getWeatherIcon(day.weather)}</div>
            
            {/* HIGH AND LOW TEMPERATURE */}
            <div className="forecast-temps">
              <span className="forecast-max-temp">{day.maxTemp}°</span>
              <span className="forecast-min-temp">{day.minTemp}°</span>
            </div>
            
            {/* WEATHER DESCRIPTION (e.g., "partly cloudy") */}
            <p className="forecast-description">{day.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

