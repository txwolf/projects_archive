import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Input from './Input'
import Result from './Result'
import './App.scss'
import { cToF, fToC, useFirstRender } from './modules'

function App() {
  const [weather, setWeather] = useState(null)
  const [humidityInside, setHumidityInside] = useState(null)
  const [tempInside, setTempInside] = useState(21.0)
  const location = useLocation()
  const navigate = useNavigate()
  const [animationClass, setAnimationClass] = useState('test')
  const [scale, setScale] = useState(null)
  const firstRender = useFirstRender()

  useEffect(() => {
    if (firstRender) return
    if (scale) {
      setTempInside(
        (tempInside) => Math.round((cToF(tempInside) + 0.1) * 10) / 10,
      )
    } else if (!scale) {
      setTempInside(
        (tempInside) => Math.round((fToC(tempInside) + 0.1) * 10) / 10,
      )
    }
  }, [scale])

  useEffect(() => {
    if (!weather) {
      navigate('/')
      setHumidityInside('')
    }
  }, [weather])

  const resultClass =
    location.pathname === '/result' ? 'headerResult' : 'header'

  let bgClass

  useEffect(() => {
    bgClass = !humidityInside
      ? ''
      : humidityInside > 60
      ? 'moist'
      : humidityInside < 40
      ? 'dry'
      : ''
  })

  return (
    <div
      className={`main ${
        !humidityInside
          ? ''
          : humidityInside > 60
          ? 'moist'
          : humidityInside < 40
          ? 'dry'
          : ''
      }`}
    >
      <div className="app">
        <div className="tempSwitch">
          <span
            className={!scale ? 'tempSwitch__choosed' : 'tempSwitch__other'}
            onClick={() => setScale(null)}
          >
            °C
          </span>
          /
          <span
            className={scale ? 'tempSwitch__choosed' : 'tempSwitch__other'}
            onClick={() => setScale('F')}
          >
            °F
          </span>
        </div>
        <header className={resultClass}>
          <h1>💧 Humidd</h1>
          <p>Room humidity like magic!</p>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <Input
                setHumidityInside={setHumidityInside}
                setWeather={setWeather}
                tempInside={tempInside}
                setTempInside={setTempInside}
                scale={scale}
              />
            }
          />
          <Route
            path="/result"
            element={
              <Result
                humidityInside={humidityInside}
                weather={weather}
                tempInside={tempInside}
                setHumidityInside={setHumidityInside}
                scale={scale}
              />
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
