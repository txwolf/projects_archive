import Intro from './src/Intro'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useState, useEffect } from 'react'
import { useFirstRender, cToF, fToC, computeHumidity } from './src/helpers'
import { WEATHER_APIKEY } from '@env'
import { CalcContext } from './src/helpers'
import * as Location from 'expo-location'

import Main from './src/Main'
import Result from './src/Result'
import Loading from './src/Loading'

const Stack = createNativeStackNavigator()

const App = () => {
  const [weather, setWeather] = useState(null)
  const [locationCoords, setLocationCoords] = useState(null)
  const [locationName, setLocationName] = useState(null)
  const [tempInside, setTempInside] = useState(21.0)
  const [humidityInside, setHumidityInside] = useState(null)
  const [scaleF, setScaleF] = useState(false)
  const firstRender = useFirstRender()

  //get weather when coords updated
  useEffect(() => {
    if (locationCoords && !weather) {
      const fetchWeather = async () => {
        let response = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${locationCoords.lat}&lon=${locationCoords.lng}&exclude=minutely,hourly,daily,alerts&appid=${WEATHER_APIKEY}`,
        ).catch((err) => console.log(err))
        response = await response.json()
        setWeather(response.current)
      }
      fetchWeather()
    }
  }, [locationCoords])

  //get location name when coords updated
  useEffect(() => {
    if (locationCoords && !locationName) {
      const fetchLocationName = async () => {
        let response = await fetch(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${locationCoords.lat}&lon=${locationCoords.lng}&limit=1&appid=${WEATHER_APIKEY}`,
        )
        response = await response.json()
        setLocationName(response[0].local_names.en)
      }
      fetchLocationName()
    }
  }, [locationCoords])

  //get user GPS location
  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.log('Permission to access location was denied')
        return
      }

      let position = await Location.getCurrentPositionAsync({})
      setLocationCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    }
    getLocation()
  }, [])

  const handlePress = () => {
    setHumidityInside(
      Math.round(
        computeHumidity(
          scaleF ? fToC(tempInside) : tempInside,
          Math.round((weather.temp - 273.15) * 100) / 100,
          weather.humidity,
        ),
      ),
    )
  }

  const value = {
    tempInside,
    setTempInside,
    humidityInside,
    setHumidityInside,
    scaleF,
    setScaleF,
    weather,
    setWeather,
    locationName,
    setLocationName,
    locationCoords,
    setLocationCoords,
    handlePress,
  }

  useEffect(() => {
    if (firstRender) return
    if (scaleF) {
      setTempInside(
        (tempInside) => Math.round((cToF(tempInside) + 0.1) * 10) / 10,
      )
    } else if (!scaleF) {
      setTempInside(
        (tempInside) => Math.round((fToC(tempInside) + 0.1) * 10) / 10,
      )
    }
  }, [scaleF])

  return (
    <CalcContext.Provider value={value}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Intro"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen name="Intro" component={Intro} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Result" component={Result} />
        </Stack.Navigator>
      </NavigationContainer>
    </CalcContext.Provider>
  )
}

export default App
