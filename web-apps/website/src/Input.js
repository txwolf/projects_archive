import { useEffect, useState } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { MdMyLocation } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useLongPress, computeHumidity, cToF, fToC } from './modules'
import './Input.scss'
import { logEvent } from 'firebase/analytics'
import { analytics } from './firebase'

const key = process.env.REACT_APP_API

function Home({
  setHumidityInside,
  setWeather,
  tempInside,
  setTempInside,
  scale,
}) {
  const [humidityOutside, setHumidityOutside] = useState('')
  const [tempOutside, setTempOutside] = useState('')
  const [error, setError] = useState('')
  const [city, setCity] = useState('')
  const [lat, setLat] = useState('')
  const [lon, setLon] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    logEvent(analytics, 'input_view')
  })

  //try geolocation api on start
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=${key}`,
        )
        const data = await response.json()
        setCity(data[0].name)
        setLat(position.coords.latitude)
        setLon(position.coords.longitude)
      })
    } else {
      console.log('Location is disabled, type in the city manually.')
    }
  }, [])

  const locate = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=${key}`,
        )
        const data = await response.json()
        setCity(data[0].name)
        setLat(position.coords.latitude)
        setLon(position.coords.longitude)
      })
    } else {
      console.log('Location is disabled, type in the city manually.')
    }
  }

  const handleCalculate = async () => {
    if (!city) {
      return setError('error')
    }
    // if there are no cords lets grab the city
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`,
    )
    const data = await response.json()
    console.log(data)

    setWeather(data)
    const tempOut = Math.round((data.main.temp - 273.15) * 100) / 100
    const humidOut = data.main.humidity
    const tempInsideReady = !scale ? tempInside : fToC(tempInside)
    const result = computeHumidity(tempInsideReady, tempOut, humidOut)
    if (result) {
      setHumidityInside(Math.round(result))
      navigate('/result')
    }
  }

  const minusOne = () => {
    setTempInside((tempInside) => Math.round((tempInside - 0.1) * 10) / 10)
  }

  const plusOne = () => {
    setTempInside((tempInside) => Math.round((tempInside + 0.1) * 10) / 10)
  }

  const minusLongPress = useLongPress(minusOne, 130)
  const plusLongPress = useLongPress(plusOne, 130)

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleCalculate()
    }
  }

  return (
    <>
      <label htmlFor="temp">Room temperature:</label>
      <div className="tempControl">
        <div className="tempControl__icon">🌡</div>
        <div className="tempControl__controller">
          <FaMinus
            {...minusLongPress}
            onClick={() =>
              setTempInside(
                (tempInside) => Math.round((tempInside - 0.1) * 10) / 10,
              )
            }
          />
          <div className="tempControl__controller__temp">
            <input
              value={tempInside.toFixed(1)}
              onChange={(e) => setTempInside(Number(e.target.value))}
              type="number"
              step="0"
            />
            °{!scale ? 'C' : scale}
          </div>
          <FaPlus
            {...plusLongPress}
            onClick={() =>
              setTempInside(
                (tempInside) => Math.round((tempInside + 0.1) * 10) / 10,
              )
            }
          />
        </div>
      </div>
      <div className="locationControl">
        <div onClick={locate} className="locationControl__icon">
          📍
        </div>
        <div className={`locationControl__input ${error}`}>
          <input
            type="text"
            name="city"
            placeholder="Location"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <MdMyLocation onClick={locate} />
        </div>
      </div>

      <button className="button-36" onClick={handleCalculate}>
        Check humidity
      </button>
    </>
  )
}

export default Home
