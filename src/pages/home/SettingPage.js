/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  Text,
  Switch,
} from 'react-native'
import { compose } from "redux"
import { connect } from "react-redux"
import { netSetting } from "../../actions/settingAction"

class SettingPage extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text>使用4G加载图片</Text>
          </View>
          <Switch
            value={this.props.netSetting}
            onValueChange={(val) => this.props.useFourG(val)}
          />
        </View>
      </View>
    )
  }
}

const mapProps = (store) => {
  const { setting: { netSetting } } = store
  return {
    netSetting,
  }
}

const mapActions = (dispatch) => {
  return {
    useFourG: compose(dispatch, netSetting)
  }
}

export default connect(mapProps, mapActions)(SettingPage)