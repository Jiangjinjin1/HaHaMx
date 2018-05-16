/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  Text,
} from 'react-native'
import _ from 'lodash'
import { compose } from 'redux'
import { connect } from 'react-redux'
import RefreshListView, { RefreshState } from "react-native-refresh-list-view";
import { getNewData } from "../../actions/homeAction";
import Card from "../components/Card";

class NewPage extends Component {
  constructor() {
    super();
    this.state = {
      refreshState: RefreshState.Idle,
    };
  }

  state: {
    refreshState: number,
  }

  componentDidMount() {
    this.props.getNewData({})
  }

  onHeaderRefresh() {
    this.props.getNewData({
      page: 1,
      pullOrPush: 'pull',
      callback: () => {
        this.setState({
          refreshState: RefreshState.Idle
        })
      }
    })
  }

  onFooterRefresh() {
    this.props.getNewData({
      callback: () => {
        this.setState({
          refreshState: RefreshState.Idle
        })
      }
    })
  }

  withoutData() {
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{}</Text>
      </View>
    )
  }

  hasData() {
    const { newData: { joke = [] } } = this.props
    return (
      <View style={{ flex: 1 }}>
        <RefreshListView
          data={joke}
          renderItem={({ item }) => <Card data={item}/>}
          keyExtractor={(item) => String(item.id)}
          refreshState={this.state.refreshState}
          initialNumToRender={3}
          onHeaderRefresh={() => this.onHeaderRefresh()}
          onFooterRefresh={() => this.onFooterRefresh()}
        />
      </View>
    )
  }

  render() {
    return _.isEmpty(this.props.newData) ? this.withoutData() : this.hasData()
  }
}

const mapProps = (store) => {
  const { home: { newData } } = store
  return {
    newData,
  }
}

const mapActions = (dispatch) => {
  return {
    getNewData: compose(dispatch, getNewData)
  }
}

export default connect(mapProps, mapActions)(NewPage)