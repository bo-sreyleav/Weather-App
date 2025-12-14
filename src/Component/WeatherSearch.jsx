import { useState } from "react"

export default function WeatherSearch({ onSearch }) {
  const [city, setCity] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault() 
    if (city.trim()) {
      onSearch(city.trim()) 
      setCity("") 
    }
  }

  
  return (
    <form onSubmit={handleSubmit} className="search-form">
      
      <input
        type="text"
        placeholder="Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)} 
        className="search-input"
      />
      
      <button type="submit" className="search-button">
        🔍
      </button>
    </form>
  )
};
