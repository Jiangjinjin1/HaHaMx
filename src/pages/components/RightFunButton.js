/**
 * @flow
 */
import React from 'react'
import {
  View,
  Alert,
  DeviceEventEmitter,
} from 'react-native'
import { Icon } from 'react-native-elements'
import { Screen } from '../../utils/constant'

const RightFunButton = (props) => {
  const { closeImageView = () => {}} = props
  const { width, height } = Screen

  return (
    <View
      style={{
        position: 'absolute',
        right: width / 25,
        bottom: height / 12,
        opacity: 0.7,
      }}
    >
      <Icon
        raised
        type={'font-awesome'}
        name={'download'}
        size={25}
        color={'#ffdc00'}
        onPress={() => {
          Alert.alert(
            '提示',
            '开发中',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        }}
      />

      <Icon
        raised
        type={'font-awesome'}
        name={'commenting'}
        size={25}
        color={'#ffdc00'}
        onPress={() => DeviceEventEmitter.emit('toggleComment', {
          needReset: false,
        })}
      />

      <Icon
        raised
        name='arrow-left'
        type='entypo'
        color='#ffdc00'
        size={25}
        onPress={() => closeImageView()}
      />
    </View>
  )
}

export default RightFunButton