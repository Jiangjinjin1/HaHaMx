/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Dimensions,
  DeviceEventEmitter,
  TouchableWithoutFeedback,
} from 'react-native'
import _ from 'lodash'
import { connect } from 'react-redux'
import ProgressImage, { Progress } from "./ProgressImage";
import ImageView from "./ImageView";
import CardFoot from "./CardFoot";
import { getImageUrl, replaceBr } from "../../utils/common";
import { use4G } from "../../actions/settingAction";

const deviceWidth = Dimensions.get('window').width

class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: 0,
      loadImg: props.loadImg
    }
  }

  state: {
    progress: number,
    loadImg: boolean,
  }

  render() {
    const {
      id,
      bad, // 差
      good, // 赞
      comment_num,  // 评论数
      content,  // 文字内容
      user_name,  // 用户名
      user_pic, // 用户头像
      time, // 发布时间
      topic_content, // 主题
      pic, // 图片对象
      root, // 原内容
    } = this.props.data
    const { children = false } = this.props
    const loadImgState = this.state.loadImg
    const loadImgProps = this.props.loadImg
    const loadImg = loadImgProps ? loadImgProps : loadImgState
    const { width = 0, height = 0, path = '', name = '' } = pic || {}
    const countWidth = !children ? 40 : 80
    const imageWidth = deviceWidth - countWidth
    const imageHeight = height * imageWidth / width
    const imageContentHeight = imageHeight > 300 ? 300 : imageHeight
    const imageUrl = getImageUrl({ loadImg, path, name })
    return (
      <View
        style={[{
          marginHorizontal: 10,
          marginTop: 10,
        }, !children ? {
          backgroundColor: '#FDFDFD',
        } : {
          backgroundColor: '#F2F2F2',
          paddingBottom: 10,
        }]}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
          }}>
          <Image
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              marginRight: 5,
            }}
            source={{ uri: user_pic }}/>
          <View>
            <Text style={{ color: '#2A86F7' }}>{user_name}</Text>
            <Text style={{ fontSize: 12, color: '#C6C6C6' }}>{time}</Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
          }}
        >
          {
            !_.isEmpty(content) &&
            <View
              style={{ paddingBottom: 10 }}
            >
              <Text style={{ fontSize: 16, color: '#666666' }}>{replaceBr(content)}</Text>
            </View>
          }
          {
            !_.isEmpty(pic) &&
            <View>
              <TouchableWithoutFeedback
                onPress={loadImg ? () => {
                  DeviceEventEmitter.emit('ImageView', {
                    jid: id,
                    width,
                    height,
                    imageUrl,
                    comment_num,
                    deviceWidth,
                    visible: true,
                  })
                } : () => this.setState({ loadImg: true })}
              >
                <View
                  style={{
                    height: imageContentHeight,
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  {
                    this.state.progress !== 1 &&
                    <View
                      style={{
                        height: imageContentHeight,
                        width: imageWidth,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Progress progress={this.state.progress} showsText
                                animated={false}/>
                    </View>
                  }
                  <ProgressImage
                    style={{ width: imageWidth, height: imageHeight }}
                    source={{ uri: imageUrl }}
                    onProgress={e => {
                      this.setState({
                        progress: e.nativeEvent.loaded / e.nativeEvent.total
                      })
                    }}
                  />
                  {
                    imageHeight > 250 &&
                    <View style={{
                      opacity: 0.4,
                      backgroundColor: '#000000',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'absolute',
                      height: 30,
                      top: imageHeight > 300 ? 270 : imageHeight - 30,
                      width: imageWidth,
                    }}>
                      <Text style={{ color: 'white' }}>点击查看全图</Text>
                    </View>
                  }
                </View>
              </TouchableWithoutFeedback>
            </View>
          }
          {
            !_.isEmpty(root) && <Card data={root} children loadImg={loadImg}/>
          }
        </View>
        {
          !children && <CardFoot good={good} bad={bad} comment_num={comment_num} jid={id}/>
        }
      </View>
    )
  }
}

const mapProps = (store) => {
  return {
    loadImg: use4G(store)
  }
}

const mapActions = (dispatch) => {
  return {}
}

export default connect(mapProps, mapActions)(Card)