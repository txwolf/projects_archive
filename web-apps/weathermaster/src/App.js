import { useState } from 'react'

const api = {
  key: 'ee8881eb2641f48e9811f3a9e4df3460',
  base: 'http://api.openweathermap.org/data/2.5/',
}

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = (e) => {
    if (e.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&unit=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery('')
          setWeather(result)
          console.log(result)
        })
    }
  }

  const dateBuilder = (d) => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div
      className={
        weather.main
          ? weather.main.temp - 278 > 12
            ? 'app warm'
            : 'app'
          : 'app'
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {weather.main ? (
          <>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp - 278)}°C
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </>
        ) : (
          ''
        )}
      </main>
    </div>
  )
}

export default App
