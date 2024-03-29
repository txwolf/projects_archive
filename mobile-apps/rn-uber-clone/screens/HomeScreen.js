import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {GOOGLE_MAPS_APIKEY} from '@env'
import { useDispatch } from 'react-redux'
import { setOrigin, setDestination } from '../slices/navSlice'
import NavFavourites from '../components/NavFavourites'

const HomeScreen = () => {
  const dispach = useDispatch();

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}> 

        <Image style={{
          width: 100,
          height: 100,
          resizeMode: 'contain'
        }} 
        source={{uri: 'https://links.papareact.com/gzs'}}
        />

        <GooglePlacesAutocomplete 
          placeholder='Where From?'
          nearbyPlacesAPI='GooglePlacesSearch'
          debounce={400}
          styles={{
            container: {
              flex: 0
            },
            textInput: {
              fontSize: 18,
            }
          }}
          enablePoweredByContainer={false}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en',
          }}
          fetchDetails={true}
          onPress={(data, details = null) => {
            dispach(setOrigin({
              location: details.geometry.location,
              description: data.description
            }))
            dispach(setDestination(null))
          }}
          returnKeyType={'search'}
        />

        <NavOptions />

        <NavFavourites />

      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})