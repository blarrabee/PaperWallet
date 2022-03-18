import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {screenOptions} from './config'
import {colors} from '@app/assets/colors.config'
import Home from '@app/screens/Home'
import Detail from '@app/screens/Detail'

const Stack = createNativeStackNavigator()
export const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        ...screenOptions,
        contentStyle: {backgroundColor: colors.white},
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  )
}
