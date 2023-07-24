import { StyleSheet, View, Image } from 'react-native'

export default function Loading() {
  return (
    <>
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          style={{ height: 70 }}
          source={require('../assets/logo_black.png')}
        />
      </View>
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
