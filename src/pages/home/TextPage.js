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
import { connect } from "react-redux"
import RefreshListView, { RefreshState } from "react-native-refresh-list-view"
import { getTextData, textDataRefreshState } from "../../actions/homeAction"
import Card from "../components/Card";

class TextPage extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.changeRefreshState(RefreshState.HeaderRefreshing)
    this.props.getTextData({
      page: 1,
      pullOrPush: 'pull',
    })
  }


  onHeaderRefresh() {
    this.props.changeRefreshState(RefreshState.HeaderRefreshing)
    this.props.getTextData({
      page: 1,
      pullOrPush: 'pull',
    })
  }

  onFooterRefresh() {
    this.props.changeRefreshState(RefreshState.FooterRefreshing)
    this.props.getTextData({})
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
    const { textData: { joke = [] }, textDataRefreshState } = this.props
    return (
      <View style={{ flex: 1 }}>
        <RefreshListView
          data={joke}
          renderItem={({ item }) => <Card data={item}/>}
          keyExtractor={(item) => String(item.id)}
          refreshState={textDataRefreshState}
          initialNumToRender={5}
          onHeaderRefresh={() => this.onHeaderRefresh()}
          onFooterRefresh={() => this.onFooterRefresh()}
        />
      </View>
    )
  }

  render() {
    return _.isEmpty(this.props.textData) ? this.withoutData() : this.hasData()
  }
}

const mapProps = (store) => {
  const { home: { textData, textDataRefreshState } } = store
  return {
    textData,
    textDataRefreshState,
  }
}

const mapActions = (dispatch) => ({
    getTextData: compose(dispatch, getTextData),
    changeRefreshState: compose(dispatch, textDataRefreshState),
  })

export default connect(mapProps, mapActions)(TextPage)