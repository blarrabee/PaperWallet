import '../shim' // force import

import React from 'react'
import {StatusBar, LogBox} from 'react-native'
import {DefaultTheme, NavigationContainer} from '@react-navigation/native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import 'text-encoding'
import 'react-native-url-polyfill/auto'
import {NavigationService} from '@app/services'
import {RootStackNavigator} from '@app/navigation'
import {colors} from './assets/colors.config'

LogBox.ignoreLogs(['VirtualizedLists should never be nested'])

const App = () => {
  const routeNameRef = React.useRef<string>()
  React.useEffect(() => {
    return () => {
      NavigationService.isReadyRef.current = false
    }
  }, [])

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <GestureHandlerRootView style={{width: '100%', height: '100%'}}>
        <NavigationContainer
          ref={NavigationService.navigationRef}
          onReady={() => {
            NavigationService.isReadyRef.current = true
          }}
          theme={{
            ...DefaultTheme,
            colors: {...DefaultTheme.colors, background: colors.white},
          }}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current
            const currentRouteName =
              NavigationService.navigationRef?.current?.getCurrentRoute()?.name
            if (previousRouteName !== currentRouteName) {
            }
            routeNameRef.current = currentRouteName
          }}
        >
          <RootStackNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default App
