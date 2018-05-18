/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  YellowBox,
  StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux'
import createStore from './src/store'
import AppWithNavigationState from './src/utils/AppNavigator'
import Loading from "./src/pages/Loading"

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super()
    this.state = {
      store: null,
    }
  }

  componentDidMount() {
    createStore((store) => {
      this.setState({
        store,
      })
    })
    YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])
  }

  render() {
    if ( this.state.store === null ) {
      return null
    }
    return (
      <Provider store={this.state.store}>
        <View
          style={{flex: 1}}
        >
          <AppWithNavigationState/>
          <Loading/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
