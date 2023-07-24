import React from 'react'
import './Result.scss'
import { FaChevronLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Result = ({
  humidityInside,
  setHumidityInside,
  weather,
  tempInside,
  scale,
}) => {
  const navigate = useNavigate()

  const handleReturn = () => {
    setHumidityInside(null)
    navigate('/')
  }

  const text = () => {
    if (humidityInside > 60) return 'Too moist!'
    if (humidityInside < 40) return 'Too dry!'
    return 'Good humidity!'
  }

  return (
    <div className="result">
      <div className="result__return" onClick={handleReturn}>
        <FaChevronLeft />
      </div>
      <div className="result__data">
        Room with {tempInside}°{!scale ? 'C' : 'F'} has humidity:
        <div className="result__data__humidity">💧 {humidityInside} %</div>
        <div className="result__data__comment">{text()}</div>
      </div>

      <div className="result__weather">
        <div className="result__weather__label">Computed for:</div>
        <div className="result__weather__summary">
          <div>
            📍 {weather?.name}, {weather?.sys.country}
          </div>
          <div>
            🌦 {Math.round((weather?.main.temp - 273.15) * 10) / 10} C, feels
            like {Math.round((weather?.main.feels_like - 273.15) * 10) / 10} C
            <div>
              {weather?.weather[0].description}, {weather?.main.humidity}%
              humidity
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Result
