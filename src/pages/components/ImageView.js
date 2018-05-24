/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  DeviceEventEmitter,
  TouchableWithoutFeedback,
} from 'react-native'
import { compose } from "redux"
import { connect } from "react-redux"
import ProgressImage, { Progress } from "./ProgressImage"
import Icon from "./Icon";
import { doublePress } from "../../utils/common"
import RightFunButton from "./RightFunButton";
import ImageComment from "./ImageComment";
import { getCurrentComment } from "../../actions/commentAction"

const deviceHeight = Dimensions.get('window').height

class ImageView extends Component {
  constructor() {
    super()
    this.state = {
      jid: 0,
      comment_num: 0,
      progress: 0,
      imageUrl: '',
      visible: false,
      width: 0,
      height: 0,
      deviceWidth: 0,
      currentComment: {},
    }
  }

  closeImageView(){
    DeviceEventEmitter.emit('ImageView',{
      visible: false,
    })
    this.props.resetComment()
  }

  componentDidMount() {
    this.msgListener = DeviceEventEmitter.addListener('ImageView', (state) => {
      this.setState({
        ...state,
      })
      if (state.jid) {
        this.props.getCurrentComment({ jid: state.jid })
      }
    })
  }

  componentWillUnmount() {
    if (this.msgListener) {
      this.msgListener.remove()
    }
  }

  render() {
    const {
      imageUrl,
      visible = false,
      width,
      height,
      deviceWidth,
    } = this.state
    const imageHeight = deviceWidth * height / width
    if (!visible) return null
    return (
      <View
        style={{
          zIndex: 999,
          backgroundColor: 'rgba(64, 64, 64, 0.5)',
          width: deviceWidth,
          height: deviceHeight,
          position: 'absolute',
          top: 0,
          left: 0,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#353B46',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => this.closeImageView()}
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
                onPress={doublePress(() => this.closeImageView())}
              >
                <ProgressImage
                  source={{ uri: imageUrl }}
                  style={{ width: deviceWidth, height: imageHeight }}
                  indicator={() => <Progress progress={this.state.progress} showsText
                                             animated={false}/>}
                  onProgress={e => {
                    this.setState({
                      progress: e.nativeEvent.loaded / e.nativeEvent.total
                    })
                  }}
                />
              </TouchableWithoutFeedback>
            </View>
          </ScrollView>
          <ImageComment />
          <RightFunButton/>
        </View>
      </View>
    )
  }
}

const mapProps = (store) => {
  return {

  }
}

const mapActions = (dispatch) => {
  return {
    getCurrentComment: compose(dispatch, getCurrentComment),
    resetComment: compose(dispatch, () => ({ type: 'reset/comment' })),
  }
}

export default connect(null, mapActions)(ImageView)