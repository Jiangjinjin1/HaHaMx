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
import RefreshListView, { RefreshState } from "react-native-refresh-list-view"
import { getWebGoodData, webGoodDataRefreshState } from "../../actions/homeAction"
import Card from "../components/Card"

class GoodPage extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.changeRefreshState(RefreshState.HeaderRefreshing)
    this.props.getJokeData({
      page: 1,
      pullOrPush: 'pull',
    })
  }

  onHeaderRefresh() {
    this.props.changeRefreshState(RefreshState.HeaderRefreshing)
    this.props.getJokeData({
      page: 1,
      pullOrPush: 'pull',
    })
  }

  onFooterRefresh() {
    this.props.changeRefreshState(RefreshState.FooterRefreshing)
    this.props.getJokeData({})
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
    const { webGoodData: { joke = [] }, webGoodDataRefreshState } = this.props
    return (
      <View style={{ flex: 1 }}>
        <RefreshListView
          data={joke}
          renderItem={({ item }) => <Card data={item}/>}
          keyExtractor={(item) => String(item.id)}
          refreshState={webGoodDataRefreshState}
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
  const { home: { webGoodData, webGoodDataRefreshState } } = store
  return {
    webGoodData,
    webGoodDataRefreshState,
  }
}

const mapActions = (dispatch) => {
  return {
    getJokeData: compose(dispatch, getWebGoodData),
    changeRefreshState: compose(dispatch, webGoodDataRefreshState),
  }
}

export default connect(mapProps, mapActions)(GoodPage)