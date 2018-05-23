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
import { getTextData } from "../../actions/homeAction"
import Card from "../components/Card";
import { normalPress } from "../../utils/common";

class TextPage extends Component {
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
    this.props.getTextData({})
  }


  onHeaderRefresh() {
    this.setState({
      refreshState: RefreshState.HeaderRefreshing
    })
    this.props.getTextData({
      page: 1,
      pullOrPush: 'pull',
      callback: (refreshState) => {
        this.setState({
          refreshState,
        })
      }
    })
  }

  onFooterRefresh() {
    this.setState({
      refreshState: RefreshState.FooterRefreshing
    })
    this.props.getTextData({
      callback: (refreshState) => {
        this.setState({
          refreshState,
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
    const { textData: { joke = [] } } = this.props
    return (
      <View style={{ flex: 1 }}>
        <RefreshListView
          data={joke}
          renderItem={({ item }) => <Card data={item}/>}
          keyExtractor={(item) => String(item.id)}
          refreshState={this.state.refreshState}
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
  const { home: { textData } } = store
  return {
    textData,
  }
}

const mapActions = (dispatch) => {
  return {
    getTextData: compose(dispatch, normalPress(getTextData))
  }
}

export default connect(mapProps, mapActions)(TextPage)