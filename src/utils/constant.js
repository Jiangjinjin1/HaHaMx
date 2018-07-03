/**
 * @flow
 */
import React from 'react'
import {
  Platform,
  StatusBar,
  Dimensions
} from 'react-native'

const isLessKitKat = Platform.OS === 'android' && Platform.Version < 19

const androidTop = isLessKitKat ? 0 : StatusBar.currentHeight

const deviceHeight = Dimensions.get('window').height

export const Screen = Platform.OS === 'ios' ? Dimensions.get('window') : {
  ...Dimensions.get('window'),
  height: deviceHeight - androidTop
}