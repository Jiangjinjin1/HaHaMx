/**
 * @flow
 */
import React, { Component } from 'react'
import {
  Modal,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import { compose } from "redux"
import { connect } from "react-redux"
import ProgressImage from "./ProgressImage"
import Icon from "./Icon";
import { doublePress } from "../../utils/common"
import RightFunButton from "./RightFunButton";
import ImageComment from "./ImageComment";
import { getCurrentComment } from "../../actions/commentAction"

const deviceHeight = Dimensions.get('window').height

class ImageView extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.getCurrentComment({ jid: this.props.jid, comment_num: this.props.comment_num })
  }

  componentWillUnmount() {
    this.props.resetComment()
  }

  render() {
    const {
      imageUrl,
      visible = false,
      closeFun,
      width,
      height,
      deviceWidth,
      currentComment,
    } = this.props
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
          <ImageComment data={currentComment}/>
          <RightFunButton/>
        </View>
      </Modal>
    )
  }
}

const mapProps = (store) => {
  const { comment: { currentComment = {} } } = store
  return {
    currentComment,
  }
}

const mapActions = (dispatch) => {
  return {
    getCurrentComment: compose(dispatch, getCurrentComment),
    resetComment: compose(dispatch, () => ({ type: 'reset/comment' })),
  }
}

export default connect(mapProps, mapActions)(ImageView)