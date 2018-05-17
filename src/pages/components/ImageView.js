/**
 * @flow
 */
import React from 'react'
import {
  Modal,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import ProgressImage from "./ProgressImage"
import Icon from "./Icon";
import { doublePress } from "../../utils/common"

const deviceHeight = Dimensions.get('window').height

const ImageView = (props) => {
  const {
    imageUrl,
    visible = false,
    closeFun,
    width,
    height,
    deviceWidth
  } = props
  const imageHeight = deviceWidth * height / width
  return (
    <Modal
      animationType={'fade'}
      visible={visible} transparent={true} onRequestClose={closeFun}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#353B46',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          onPress={closeFun}
          style={{
            position: 'absolute',
            top: 90,
            left: 25,
            width: 30,
            height: 30,
            borderRadius: 15,
            zIndex: 999,
            opacity: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon suite={'Entypo'} name={'chevron-with-circle-left'} size={30} color={'#000000'}/>
        </TouchableOpacity>
        <ScrollView
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              height: imageHeight > deviceHeight ? imageHeight : deviceHeight,
              justifyContent: 'center',
            }}
          >
            <TouchableWithoutFeedback
              onPress={doublePress(closeFun)}
            >
              <ProgressImage
                source={{ uri: imageUrl }}
                style={{ width: deviceWidth, height: imageHeight }}
              />
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </View>
    </Modal>
  )
}

export default ImageView