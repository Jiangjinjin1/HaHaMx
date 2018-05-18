/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native'
import _ from 'lodash'
import { connect } from 'react-redux'
import ProgressImage from "./ProgressImage";
import ImageView from "./ImageView";
import RootCard from "./RootCard";
import CardFoot from "./CardFoot";
import { replaceBr } from "../../utils/common";

const deviceWidth = Dimensions.get('window').width

class Card extends Component {
  constructor(){
    super()
    this.state = {
      visible: false,
    }
  }

  state: {
    visible: boolean,
  }

  toggleVisible() {
    this.setState({
      visible: true,
    })
  }

  closeFun() {
    this.setState({
      visible: false,
    })
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
    // console.log('this.props.data:', this.props.data)
    const { width = 0, height = 0, path = '', name = '' } = pic || {}
    const imageWidth = deviceWidth - 40
    const imageHeight = height * imageWidth / width
    const imageContentHeight = imageHeight > 300 ? 300 : imageHeight
    const imageUrl = `https://image.haha.mx/${path}/big/${name}`
    return (
      <View
        style={{
          marginHorizontal: 10,
          marginTop: 10,
          backgroundColor: '#FDFDFD',
        }}
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
                onPress={() => this.toggleVisible()}
              >
                <View
                  style={{
                    height: imageContentHeight,
                    overflow: 'hidden',
                  }}
                >
                  <ProgressImage
                    style={{ width: imageWidth, height: imageHeight }}
                    source={{ uri: imageUrl }}>
                  </ProgressImage>
                  {
                    imageHeight > 250 &&
                    <View style={{
                      opacity: 0.4,
                      backgroundColor: '#000000',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'absolute',
                      height: 30,
                      top: imageHeight > 300 ? 270: imageHeight - 30,
                      width: imageWidth,
                    }}>
                      <Text style={{ color: 'white' }}>点击查看全图</Text>
                    </View>
                  }
                </View>
              </TouchableWithoutFeedback>
              {
                this.state.visible && <ImageView
                  jid={id}
                  width={width}
                  height={height}
                  imageUrl={imageUrl}
                  comment_num={comment_num}
                  deviceWidth={deviceWidth}
                  visible={this.state.visible}
                  closeFun={() => this.closeFun()}
                />
              }
            </View>
          }
          {
            !_.isEmpty(root) && <RootCard data={root}/>
          }
        </View>
        <CardFoot good={good} bad={bad} comment_num={comment_num} />
      </View>
    )
  }
}

const mapProps = (store) => {
  return {}
}

const mapActions = (dispatch) => {
  return {}
}

export default connect(null, mapActions)(Card)