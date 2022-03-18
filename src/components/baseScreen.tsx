import React from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
} from 'react-native'
import {t} from 'react-native-tailwindcss'

import {colors} from '@app/assets/colors.config'

export const BaseScreen = ({
  children,
  isLoading = false,
  noPadding = false,
}: {
  children?: React.ReactNode
  isLoading?: boolean
  noPadding?: boolean
}) => {
  return (
    <>
      {isLoading && (
        <View
          style={[
            t.flex1,
            t.hFull,
            t.wFull,
            t.flex1,
            t.absolute,
            t.top0,
            t.left0,
            t.alignCenter,
            t.justifyCenter,
            t.z10,
          ]}
        >
          <ActivityIndicator color={colors.white} />
        </View>
      )}
      <SafeAreaView style={[t.flex1]}>
        <KeyboardAvoidingView style={noPadding ? [t.flex1] : [t.flex1, t.p4]}>
          {children}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  )
}
