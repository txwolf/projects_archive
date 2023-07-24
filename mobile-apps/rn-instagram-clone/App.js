import { View, Text } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'

import SignedInStack from './navigation'
import AuthNavigation from './AuthNavigation'

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <AuthNavigation />
      </SafeAreaProvider>
    </NavigationContainer>
  )
}
