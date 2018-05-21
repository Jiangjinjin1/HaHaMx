/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  Text,
} from 'react-native'
import _ from 'lodash'
import ProgressImage, { Progress } from "./ProgressImage"
import CustomButton from "./CustomButton";
import Icon from "./Icon";
import { replaceBr } from "../../utils/common";

class Comment extends Component {
  constructor() {
    super()
  }

  render() {
    const {
      floor,
      childElement,
      light,
      content,
      user_pic,
      user_name,
      time,
    } = this.props
    return (
      <View
        style={[{
          padding: 5,
          marginBottom: 5,
          marginHorizontal: 5,
          borderColor: '#D0D1D2',
        }, user_pic ? {
          borderBottomWidth: 1,
        }: {
          borderWidth: 1,
        }]}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 5,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                marginRight: 5,
              }}
            >
              {
                user_pic && <ProgressImage
                  source={{ uri: user_pic }}
                  style={{ width: 30, height: 30, borderRadius: 15 }}
                  indicator={Progress}
                />
              }
              {
                !user_pic && <Text>{floor}</Text>
              }
            </View>
            <View>
              <Text>{user_name}</Text>
              <Text style={{ fontSize: 12, color: '#666666' }}>{time}</Text>
            </View>
          </View>
          <CustomButton
            text={light}
            rightElement={<Icon
              suite={'Entypo'}
              name={'light-bulb'}
              size={15}
              color={'#404040'}
            />}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          />
        </View>
        {
          !_.isEmpty(childElement) && <Comment {...childElement}/>
        }
        <Text style={{ fontSize: 12, color: '#666666' }}>{replaceBr(content)}</Text>
      </View>
    )
  }
}

export default Comment