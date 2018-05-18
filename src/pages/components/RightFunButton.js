/**
 * @flow
 */
import React from 'react'
import {
  View,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native'
import Icon from "./Icon";

const RightFunButton = (props) => {
  const { onPress = () => {}} = props
  return (
    <View
      style={{
        position: 'absolute',
        right: 20,
        bottom: 50,
      }}
    >
      <TouchableOpacity
        onPress={() => DeviceEventEmitter.emit('toggleComment', true)}
      >
        <Icon
          suite={'FontAwesome'}
          name={'commenting'}
          size={40}
          color={'#F0F0F0'}
          style={{ marginRight: 5 }}
        />
      </TouchableOpacity>
    </View>
  )
}

export default RightFunButton