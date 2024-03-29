import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import NewPostScreen from './screens/NewPostScreen'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'

const Stack = createNativeStackNavigator()

const screenOptions = {
  headerShown: false,
}

export const SignedInStack = () => (
  <Stack.Navigator initialRouteName="HomeScreen" screenOptions={screenOptions}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="NewPostScreen" component={NewPostScreen} />
  </Stack.Navigator>
)

export const SignedOutStack = () => (
  <Stack.Navigator initialRouteName="LoginScreen" screenOptions={screenOptions}>
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="SignupScreen" component={SignupScreen} />
  </Stack.Navigator>
)

export default SignedInStack
