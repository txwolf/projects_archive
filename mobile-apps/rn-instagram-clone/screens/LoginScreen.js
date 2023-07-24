import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoginForm from '../components/loginScreen/LoginForm'

const LOGO = '../assets/images/insta.jpeg'

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require(LOGO)} />
      {/* login form */}
      <LoginForm />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  logo: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    marginTop: 50,
    marginBottom: 10,
  },
})

export default LoginScreen
