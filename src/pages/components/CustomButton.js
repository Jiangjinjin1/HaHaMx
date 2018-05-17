/**
 * @flow
 */
import React from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native'

const CustomButton = (props) => {
  const {
    onPress = () => {
    },
    text, leftElement, rightElement,
    style,
  } = props
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
    >
      <View
        style={style}
      >
        {leftElement}
        <Text>{text}</Text>
        {rightElement}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default CustomButton