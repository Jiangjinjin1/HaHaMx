/**
 * @flow
 */
import React from 'react'
import {
  View,
} from 'react-native'
import CustomButton from "./CustomButton";
import Icon from "./Icon";

const CardFoot = (props) => {
  const { good = '', bad = '', comment_num = '' } = props
  return (
    <View
      style={{
        flexDirection: 'row',
        borderTopColor: '#E9E9EF',
        borderTopWidth: 1,
        marginTop: 10,
        justifyContent: 'space-around',
        height: 40,
        alignItems: 'center',
      }}
    >
      <CustomButton
        leftElement={<Icon
          suite={'FontAwesome'}
          name={'thumbs-up'}
          size={20}
          color={'#DDDDDD'}
          style={{marginRight: 5}}
        />}
        text={good}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      />
      <CustomButton
        leftElement={<Icon
          suite={'FontAwesome'}
          name={'thumbs-down'}
          size={20}
          color={'#DDDDDD'}
          style={{marginRight: 5}}
        />}
        text={bad}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      />
      <CustomButton
        leftElement={<Icon
          suite={'FontAwesome'}
          name={'commenting-o'}
          size={20}
          color={'#DDDDDD'}
          style={{marginRight: 5}}
        />}
        text={comment_num}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      />
    </View>
  )
}

export default CardFoot