/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  DeviceEventEmitter,
} from 'react-native'
import { compose } from "redux"
import { connect } from "react-redux"
import ImageViewer from 'react-native-image-zoom-viewer'
import ProgressImage from "./ProgressImage"
import RightFunButton from "./RightFunButton"
import { getCurrentComment } from "../../actions/commentAction"
import { Screen } from "../../utils/constant"

const deviceHeight = Screen.height

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

  closeImageView() {
    DeviceEventEmitter.emit('ImageView', {
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
    const containerHeight = imageHeight > deviceHeight ? imageHeight : deviceHeight
    if (!visible) return null
    return (
      <View
        style={{
          zIndex: 99,
          backgroundColor: 'rgba(64, 64, 64, 0.5)',
          width: deviceWidth,
          height: deviceHeight,
          position: 'absolute',
          top: 0,
          left: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#353B46',
            justifyContent: 'center',
            height: deviceHeight,
          }}
        >
          <View
            style={{
              flex: 1,
              height: containerHeight,
              justifyContent: 'center',
              width: deviceWidth,
            }}
          >
            <ImageViewer
              imageUrls={[{
                props: {
                  source: require('./images/xigua.png'),
                },
                freeHeight: true,
                width: deviceWidth,
                height: imageHeight,
              }]}
              renderIndicator={() => null}
              renderImage={() => <ProgressImage
                source={{ uri: imageUrl }}
                style={{ width: deviceWidth, height: imageHeight }}
              />}
            />
          </View>
          <RightFunButton closeImageView={() => this.closeImageView()}/>
        </View>
      </View>
    )
  }
}

const mapActions = (dispatch) => ({
  getCurrentComment: compose(dispatch, getCurrentComment),
  resetComment: compose(dispatch, () => ({ type: 'reset/comment' })),
})

export default connect(null, mapActions)(ImageView)