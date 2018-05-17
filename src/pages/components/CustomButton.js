/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native'
import Icon from "./Icon";

const CustomerButton = (props) => {
  const { onPress, text } = props
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
    >
      <View>
        <Icon
          suite={'Entypo'}
          name={'chevron-with-circle-left'}
          size={30}
          color={'#000000'}
        />
        {
          text && <Text>{text}</Text>
        }
      </View>
    </TouchableWithoutFeedback>
  )
}