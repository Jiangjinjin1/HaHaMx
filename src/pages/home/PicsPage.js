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
import { getPicData, picDataRefreshState } from "../../actions/homeAction";
import Card from "../components/Card";

class PicsPage extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.changeRefreshState(RefreshState.HeaderRefreshing)
    this.props.getPicsData({
      page: 1,
      pullOrPush: 'pull',
    })
  }


  onHeaderRefresh() {
    this.props.changeRefreshState(RefreshState.HeaderRefreshing)
    this.props.getPicsData({
      page: 1,
      pullOrPush: 'pull',
    })
  }

  onFooterRefresh() {
    this.props.changeRefreshState(RefreshState.FooterRefreshing)
    this.props.getPicsData({})
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
    const { picData: { joke = [] }, picDataRefreshState } = this.props
    return (
      <View style={{ flex: 1 }}>
        <RefreshListView
          data={joke}
          renderItem={({ item }) => <Card data={item}/>}
          keyExtractor={(item) => String(item.id)}
          refreshState={picDataRefreshState}
          initialNumToRender={3}
          onHeaderRefresh={() => this.onHeaderRefresh()}
          onFooterRefresh={() => this.onFooterRefresh()}
        />
      </View>
    )
  }

  render() {
    return _.isEmpty(this.props.picData) ? this.withoutData() : this.hasData()
  }
}

const mapProps = (store) => {
  const { home: { picData, picDataRefreshState } } = store
  return {
    picData,
    picDataRefreshState,
  }
}

const mapActions = (dispatch) => ({
  getPicsData: compose(dispatch, getPicData),
  changeRefreshState: compose(dispatch, picDataRefreshState),
})

export default connect(mapProps, mapActions)(PicsPage)