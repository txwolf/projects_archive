import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Image from './components/Image'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GOOGLE_APIKEY } from '@env'
import React, { useEffect, useContext } from 'react'
import Slider from '@react-native-community/slider'
import { useNavigation } from '@react-navigation/native'
import Text from './components/Text'
import { useRef } from 'react'
import { CalcContext } from './helpers'

const Main = () => {
  const ref = useRef()
  const navigation = useNavigation()
  const {
    tempInside,
    setTempInside,
    scaleF,
    setScaleF,
    setLocation,
    handlePress,
    locationName,
    setLocationName,
    locationCoords,
    setLocationCoords,
    weather,
  } = useContext(CalcContext)

  useEffect(() => {
    if (locationName) {
      ref.current?.setAddressText(locationName)
    }
  }, [locationName])

  return (
    <SafeAreaView
      style={{ backgroundColor: 'white', flex: 1, paddingHorizontal: 40 }}
    >
      {/* image */}
      <Image
        resizeMode="contain"
        style={{
          height: 50,
          alignSelf: 'center',
          marginTop: 20,

          // add shadows for iOS only
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
        }}
        source={require('../assets/logo_black.png')}
      />

      {/* location input */}
      <View>
        <Text
          style={{
            textAlign: 'left',
            marginTop: 30,
          }}
        >
          let's check your room humidity:
        </Text>
        <Text
          style={{
            textAlign: 'left',
            marginTop: 0,
            marginBottom: 10,
          }}
        >
          your location?
        </Text>
        <GooglePlacesAutocomplete
          placeholder="type your city"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          styles={toInputBoxStyles}
          enablePoweredByContainer={false}
          query={{
            key: GOOGLE_APIKEY,
            language: 'en',
          }}
          ref={ref}
          fetchDetails={true}
          onPress={(data, details = null) => {
            setLocationCoords({ ...details.geometry.location })
            setLocationName(data.description)
          }}
          returnKeyType={'search'}
          textInputProps={{
            placeholderTextColor: 'gray',
            returnKeyType: 'search',
          }}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Text>your room temperature?</Text>

        {/* C/F switcher */}

        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={() => setScaleF((value) => !value)}
        >
          <Text style={{ color: scaleF ? '#cbcbcb' : 'black' }}>°C</Text>
          <Text>/</Text>
          <Text style={{ color: scaleF ? 'black' : '#b4b4b4' }}>°F</Text>
        </TouchableOpacity>
      </View>

      {/* 2. slider intro */}
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {/* slider */}
        <Text
          style={{
            fontSize: 60,
            fontWeight: '700',
            width: '80%',
            textAlign: 'center',
          }}
        >
          {tempInside.toFixed(1)}
          <Text style={{ fontWeight: '300' }}> °{scaleF ? 'F' : 'C'}</Text>
        </Text>
        <Slider
          minimumValue={scaleF ? 53 : 12}
          maximumValue={scaleF ? 95 : 35}
          step={0.1}
          style={{
            width: 350,
            top: -50,
            right: -100,
            transform: [{ rotate: '270deg' }],
          }}
          minimumTrackTintColor="#94000078"
          maximumTrackTintColor="#0064c16d"
          onValueChange={(value) => setTempInside(value)}
          value={tempInside}
        />
      </View>

      {/* button */}
      <TouchableOpacity
        style={{
          backgroundColor: '#F6F4FF',
          color: 'white',
          height: 50,
          justifyContent: 'center',
          borderRadius: 4,
          borderColor: '#3B25A8',
          borderWidth: 1,
          marginBottom: 50,
        }}
        onPress={() => {
          if (locationCoords && weather) {
            handlePress()
            navigation.navigate('Result')
          }
        }}
      >
        <Text
          style={{
            color: '#3B25A8',
            fontSize: 22,
            fontWeight: '500',
            alignSelf: 'center',
          }}
        >
          check
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 10,
    flex: 0,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 0,
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 30,
    borderColor: '#3B25A8',
    borderWidth: 1,
    height: 50,
  },
  textInputContainer: {},
  row: {},
  separator: {},
})

export default Main
