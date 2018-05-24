/**
 * @flow
 */
import React, { Component } from 'react'
import {
  Text,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native'
import _ from 'lodash'
import uuid from 'react-native-uuid'
import { compose } from "redux"
import { connect } from "react-redux"
import RefreshListView, { RefreshState } from "react-native-refresh-list-view"
import Icon from "./Icon"
import Comment from "./Comment"
import { getCurrentComment } from "../../actions/commentAction";
import Spinner from "./Spinner";

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

class ImageComment extends Component {
  constructor() {
    super()
    this.state = {
      jid: 0,
      comment_num: 0,
      displayComment: false,
      refreshState: RefreshState.Idle,
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
    this.setState({
      refreshState: RefreshState.HeaderRefreshing
    })
    const { currentComment: { jid } } = this.props
    this.props.getCurrentComment({ jid, page: 1 })
  }

  onFooterRefresh() {
    this.setState({
      refreshState: RefreshState.FooterRefreshing
    })
    const { currentComment: { page, jid } } = this.props
    this.props.getCurrentComment({
      jid, page: page + 1,
      callback: (refreshState) => {
        this.setState({
          refreshState,
        })
      }
    })
  }

  render() {
    const { currentComment: { comments = [], count = 0 } } = this.props
    const { displayComment } = this.state
    if (!displayComment) return null
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
          height: deviceHeight * 0.6,
          width: deviceWidth,
          backgroundColor: 'white',
          bottom: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -(deviceHeight * 0.4)],
          }),
          position: 'absolute',
          zIndex: 999,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              height: 40,
              borderBottomWidth: 1,
              borderBottomColor: '#DADADA',
            }}
          >
            <Text>{count === 0 ? `暂无评论` : `${count}条评论`}</Text>
            <TouchableOpacity
              onPress={() => {
                this.toggleComment()
                this.props.resetComment()
                this.setState({
                  jid: 0,
                  comment_num: 0,
                })
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
                    height: deviceHeight * 0.6 - 50,
                    width: deviceWidth,
                  }}
                >
                  <Spinner/>
                  <Text style={{color: 'black'}}>正在加载……</Text>
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
                  height: deviceHeight * 0.6 - 50
                }}
                refreshState={this.state.refreshState}
                onHeaderRefresh={() => this.onHeaderRefresh()}
                onFooterRefresh={() => this.onFooterRefresh()}
              />
            }
          </View>
        </View>
      </Animated.View>
    )
  }
}

const mapProps = (store) => {
  const {
    comment: { currentComment = {} },
  } = store
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

export default connect(mapProps, mapActions)(ImageComment)