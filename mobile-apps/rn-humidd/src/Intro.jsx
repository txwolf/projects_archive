import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Image from './components/Image'
import { SafeAreaView } from 'react-native-safe-area-context'
import Text from './components/Text'

const Intro = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 40,
        justifyContent: 'space-between',
      }}
    >
      <Image
        resizeMode="contain"
        style={{
          height: 70,
          alignSelf: 'center',
          marginVertical: 30,
        }}
        source={require('../assets/logo_black.png')}
      />

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>
          humidity levels in your home have a greater impact than you think
        </Text>

        <Text style={{ marginTop: 40, marginBottom: 10 }}>
          five effects of inbalanced interior humidity:
        </Text>
        <Text style={styles.list}>1. dry skin, mouth and throat</Text>
        <Text style={styles.list}>
          2. increased risk of colds, flu, and other infections
        </Text>
        <Text style={styles.list}>
          3. creates conditions for mold and bacteria growth
        </Text>
        <Text style={styles.list}>4. causes respiratory issues</Text>
        <Text style={styles.list}>
          5. pre-existing health conditions can be aggravated
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#220F80',
          color: 'white',
          height: 50,
          justifyContent: 'center',
          borderRadius: 4,
          marginBottom: 50,
        }}
        onPress={() => navigation.navigate('Main')}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 22,
            fontWeight: '500',
            alignSelf: 'center',
          }}
        >
          get started
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Intro

const styles = StyleSheet.create({
  list: {
    marginBottom: 10,
  },
})
