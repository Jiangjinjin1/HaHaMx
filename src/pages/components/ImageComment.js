/**
 * @flow
 */
import React, { Component } from 'react'
import {
  Text,
  View,
  FlatList,
  Animated,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native'
import _ from 'lodash'
import RefreshListView, { RefreshState } from "react-native-refresh-list-view";
import Icon from "./Icon";
import Comment from "./Comment";

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

export default class ImageComment extends Component {
  constructor() {
    super()
    this.state = {
      displayComment: false,
      refreshState: RefreshState.Idle,
    }
    this.animation = new Animated.Value(1)
  }

  animation: any

  componentDidMount() {
    this.msgListener = DeviceEventEmitter.addListener('toggleComment', () => {
      this.toggleComment()
    })
  }

  componentWillUnmount() {
    if ( this.msgListener ) {
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

  }

  onFooterRefresh() {

  }

  render() {
    const { data: { comments = [], count = 0 } } = this.props
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
          zIndex: 99,
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
              onPress={() => this.toggleComment()}
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
            <ScrollView>
              {
                _.map(comments, (item) => {
                  const newArr = []
                  let newObj = {}
                  let floor = 1
                  _.forEachRight(item, (itemKey, index) => {
                    if ( index === item.length - 1 ) {
                      newObj = {
                        ...itemKey,
                        floor: floor++,
                      }
                    }
                    if ( index > 0 ) {
                      newObj = {
                        ...item[index - 1],
                        floor: floor++,
                        childElement: { ...newObj },
                      }
                    }
                  })
                  newArr.push(newObj)
                  return _.map(newArr, (obj, key) => <Comment {...obj} key={item[0].id}/>)
                })
              }
              <View
                style={{
                  height: 60,
                }}
              >{}</View>
            </ScrollView>
          </View>
        </View>
      </Animated.View>
    )
  }
}