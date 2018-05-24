/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  YellowBox,
} from 'react-native';
import { Provider } from 'react-redux'
import createStore from './src/store'
import AppWithNavigationState from './src/utils/AppNavigator'
import Loading from "./src/pages/Loading"
import { checkRnUpdate } from "./src/utils/update"
import ImageView from "./src/pages/components/ImageView"
import ImageComment from "./src/pages/components/ImageComment";

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
    if (!__DEV__) {
      checkRnUpdate()
    }
    YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Setting a timer'])
  }

  render() {
    if (this.state.store === null) {
      return null
    }
    return (
      <Provider store={this.state.store}>
        <View
          style={{ flex: 1 }}
        >
          <AppWithNavigationState/>
          <Loading/>
          <ImageView  style={{position: 'absolute', zIndex: 99}}/>
          <ImageComment style={{position: 'absolute', zIndex: 999}}/>
        </View>
      </Provider>
    );
  }
}
