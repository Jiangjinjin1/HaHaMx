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
import RefreshListView, { RefreshState } from "react-native-refresh-list-view"
import { getNewData, newDataRefreshState } from "../../actions/homeAction"
import Card from "../components/Card"

class NewPage extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.changeRefreshState(RefreshState.HeaderRefreshing)
    this.props.getNewData({
      page: 1,
      pullOrPush: 'pull',
    })
  }

  onHeaderRefresh() {
    this.props.changeRefreshState(RefreshState.HeaderRefreshing)
    this.props.getNewData({
      page: 1,
      pullOrPush: 'pull',
    })
  }

  onFooterRefresh() {
    this.props.changeRefreshState(RefreshState.FooterRefreshing)
    this.this.props.getNewData({})
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
    const { newData: { joke = [] }, newDataRefreshState } = this.props
    return (
      <View style={{ flex: 1 }}>
        <RefreshListView
          data={joke}
          renderItem={({ item }) => <Card data={item}/>}
          keyExtractor={(item) => String(item.id)}
          refreshState={newDataRefreshState}
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
  const { home: { newData, newDataRefreshState } } = store
  return {
    newData,
    newDataRefreshState,
  }
}

const mapActions = (dispatch) => ({
  getNewData: compose(dispatch, getNewData),
  changeRefreshState: compose(dispatch, newDataRefreshState),
})

export default connect(mapProps, mapActions)(NewPage)