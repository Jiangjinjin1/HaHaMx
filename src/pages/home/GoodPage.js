/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  Text,
} from 'react-native'
import _ from 'lodash'
import { compose } from "redux"
import { connect } from 'react-redux'
import RefreshListView, { RefreshState } from "react-native-refresh-list-view";
import { getWebGoodData } from "../../actions/homeAction";
import Card from "../components/Card";

class GoodPage extends Component {
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
    this.props.getJokeData({})
  }

  onHeaderRefresh() {
    this.setState({
      refreshState: RefreshState.HeaderRefreshing
    })
    this.props.getJokeData({
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
    this.setState({
      refreshState: RefreshState.FooterRefreshing
    })
    this.props.getJokeData({
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
    const { webGoodData: { joke = [] } } = this.props
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
    return _.isEmpty(this.props.webGoodData) ? this.withoutData() : this.hasData()
  }
}

const mapProps = (store) => {
  const { home: { webGoodData } } = store
  return {
    webGoodData,
  }
}

const mapActions = (dispatch) => {
  return {
    getJokeData: compose(dispatch, getWebGoodData)
  }
}

export default connect(mapProps, mapActions)(GoodPage)