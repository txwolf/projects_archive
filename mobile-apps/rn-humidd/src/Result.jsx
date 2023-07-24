import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Image from './components/Image'
import { SafeAreaView } from 'react-native-safe-area-context'
import Slider from '@react-native-community/slider'
import { useNavigation } from '@react-navigation/native'
import Text from './components/Text'
import { useContext } from 'react'
import { CalcContext } from './helpers'
import { cToF } from './helpers'

const RESULT_DESCRIPTION = {
  0: {
    title: `too dry!`,
    description: `use humidifier`,
  },
  30: {
    title: `perfect humidity!`,
    description: ``,
  },
  60: {
    title: `too wet!`,
    description: `use air conditioner`,
  },
}

export default function Result() {
  const navigation = useNavigation()
  const { humidityInside, weather, locationName, scaleF } =
    useContext(CalcContext)

  let resultDescription
  if (humidityInside > 60) {
    resultDescription = RESULT_DESCRIPTION[60]
  } else if (humidityInside > 30) {
    resultDescription = RESULT_DESCRIPTION[30]
  } else {
    resultDescription = RESULT_DESCRIPTION[0]
  }

  return (
    <>
      <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
        {/* image */}
        <Image
          resizeMode="contain"
          style={{
            height: 50,
            alignSelf: 'center',
            marginTop: 20,
          }}
          source={require('../assets/logo_black.png')}
        />

        {/* computed for */}
        <View>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 40,
              fontSize: 16,
              color: 'gray',
            }}
          >
            {locationName}
            {'\n'}
            {weather.weather[0].description}
            {'\n'}
            temp outside:{' '}
            {scaleF
              ? Math.round(cToF(Math.round((weather.temp - 273.15) * 10) / 10))
              : Math.round((weather.temp - 273.15) * 10) / 10}{' '}
            {scaleF ? '°F' : '°C'}
            {'\n'}
            humidity outside: {weather.humidity} %{'\n'}
          </Text>
        </View>

        {/* slider */}
        <View
          style={[
            {
              flex: 1,
              alignItems: 'center',
              marginLeft: 30,
              width: '70%',
              justifyContent: 'center',
            },
          ]}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: '400',
              fontSize: 30,
              textAlign: 'center',
            }}
          >
            humidity inside:
          </Text>
          <Text
            style={{ fontSize: 60, fontWeight: '700', textAlign: 'center' }}
          >
            {humidityInside} %
          </Text>
          <Text
            style={{
              fontSize: 26,
              fontWeight: '400',
              marginBottom: 10,
              textAlign: 'center',
            }}
          >
            {resultDescription.title}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '400',
              textAlign: 'center',
            }}
          >
            {resultDescription.description}
          </Text>
        </View>
        <Slider
          minimumValue={0}
          maximumValue={100}
          step={0.1}
          style={{
            width: 350,
            top: -220,
            right: -150,
            transform: [{ rotate: '270deg' }],
          }}
          minimumTrackTintColor="#005803b5"
          maximumTrackTintColor="#e5c300f5"
          onValueChange={(value) => console.log(value)}
          value={humidityInside}
          thumbTintColor="transparent"
        />

        {/* button */}
        <TouchableOpacity
          style={{
            backgroundColor: '#220F80',
            color: 'white',
            marginBottom: 50,
            height: 50,
            justifyContent: 'center',
            borderRadius: 4,
            marginHorizontal: 40,
            borderColor: '#3B25A8',
            borderWidth: 1,
          }}
          onPress={() => navigation.navigate('Main')}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: '500',
              alignSelf: 'center',
            }}
          >
            start again
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
