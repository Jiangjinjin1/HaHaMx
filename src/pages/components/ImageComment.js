/**
 * @flow
 */
import React, { Component } from 'react'
import {
  Text,
  View,
  Animated,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native'
import _ from 'lodash'
import uuid from 'react-native-uuid'
import { compose } from "redux"
import { connect } from "react-redux"
import RefreshListView, { RefreshState } from "react-native-refresh-list-view"
import { commentRefreshState, getCurrentComment } from "../../actions/commentAction"
import Icon from "./Icon"
import Comment from "./Comment"
import Spinner from "./Spinner"
import { Screen } from '../../utils/constant'

const deviceWidth = Screen.width
const deviceHeight = Screen.height

class ImageComment extends Component {
  constructor() {
    super()
    this.state = {
      jid: 0,
      comment_num: 0,
      displayComment: false,
      refreshState: RefreshState.Idle,
      needReset: true,
    }
    this.animation = new Animated.Value(1)
  }

  animation: any

  componentDidMount() {
    this.msgListener = DeviceEventEmitter.addListener('toggleComment', (state) => {
      this.toggleComment()
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

  toggleComment() {
    Animated.spring(this.animation, { toValue: (!this.state.displayComment ? 0 : 1) }).start()
    this.setState({
      displayComment: !this.state.displayComment,
    })
  }

  onHeaderRefresh() {
    this.props.commentRefreshStateAction(RefreshState.HeaderRefreshing)
    const { currentComment: { jid } } = this.props
    this.props.getCurrentComment({ jid, page: 1 })
  }

  onFooterRefresh() {
    this.props.commentRefreshStateAction(RefreshState.FooterRefreshing)
    const { currentComment: { page, jid } } = this.props
    this.props.getCurrentComment({
      jid, page: page + 1,
    })
  }

  render() {
    const { currentComment: { comments = [], count = 0 } } = this.props
    return (
      <Animated.View
        style={{
          transform: [
            {
              translateY: this.animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, deviceHeight],
              }),
            }],
          height: deviceHeight,
          width: deviceWidth,
          bottom: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -deviceHeight],
          }),
          position: 'absolute',
          backgroundColor: 'transparent',
          zIndex: 999,
          top: 0,
          left: 0,
        }}
      >
        <View
          style={{
            flex: 1,
            width: deviceWidth,
            backgroundColor: 'rgba(0,0,0, .5)'
          }}
        >
          <View style={{ height: deviceHeight * 0.2 }}>{}</View>
          <View
            style={{
              height: deviceHeight * 0.8,
              backgroundColor: 'white',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                height: 39,
                borderBottomWidth: 1,
                borderBottomColor: '#DADADA',
              }}
            >
              <Text>{count === 0 ? `暂无评论` : `${count}条评论`}</Text>
              <TouchableOpacity
                onPress={() => {
                  this.toggleComment()
                  if (this.state.needReset) {
                    this.props.resetComment()
                    this.setState({
                      jid: 0,
                      comment_num: 0,
                      refreshState: RefreshState.Idle,
                    })
                  }
                }}
                style={{
                  position: 'absolute',
                  right: 20,
                  top: 8,
                }}
              >
                <Icon
                  suite={'EvilIcons'}
                  name={'close'}
                  size={30}
                  color={'#000000'}
                />
              </TouchableOpacity>
            </View>
            <View style={{ overflow: 'hidden' }}>
              {
                (this.state.comment_num > 0 && count === 0) &&
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: deviceHeight * 0.8 - 40,
                    width: deviceWidth,
                  }}
                >
                  <Spinner/>
                  <Text style={{ color: 'black' }}>正在加载……</Text>
                </View>
              }
              {
                !_.isEmpty(comments) && <RefreshListView
                  data={comments}
                  renderItem={({ item }) => {
                    const newArr = []
                    let newObj = {}
                    let floor = 1
                    _.forEachRight(item, (itemKey, index) => {
                      if (index === item.length - 1) {
                        newObj = {
                          ...itemKey,
                          floor: floor++,
                        }
                      }
                      if (index > 0) {
                        newObj = {
                          ...item[index - 1],
                          floor: floor++,
                          childElement: { ...newObj },
                        }
                      }
                    })
                    newArr.push(newObj)
                    return _.map(newArr, (obj) => <Comment {...obj} key={uuid.v4()}/>)
                  }}
                  keyExtractor={() => uuid.v4()}
                  initialNumToRender={10}
                  style={{
                    height: deviceHeight * 0.8 - 40
                  }}
                  refreshState={this.props.commentRefreshState}
                  onHeaderRefresh={() => this.onHeaderRefresh()}
                  onFooterRefresh={() => this.onFooterRefresh()}
                />
              }
            </View>
          </View>
        </View>
      </Animated.View>
    )
  }
}

const mapProps = (store) => {
  const {
    comment: { currentComment = {}, commentRefreshState },
  } = store
  return {
    currentComment,
    commentRefreshState,
  }
}

const mapActions = (dispatch) => ({
  getCurrentComment: compose(dispatch, getCurrentComment),
  commentRefreshStateAction: compose(dispatch, commentRefreshState),
  resetComment: compose(dispatch, () => ({ type: 'reset/comment' })),
})

export default connect(mapProps, mapActions)(ImageComment)