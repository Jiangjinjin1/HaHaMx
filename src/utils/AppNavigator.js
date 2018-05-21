/**
 * @flow
 */
import React, { Component } from 'react'
import { compose } from "redux";
import { connect } from 'react-redux'
import { createBottomTabNavigator, createStackNavigator } from "react-navigation"
import { addListenerRoot } from "./middleware";
import GoodPage from "../pages/home/GoodPage"
import NewPage from "../pages/home/NewPage"
import PicsPage from "../pages/home/PicsPage"
import TextPage from "../pages/home/TextPage"
import SettingPage from "../pages/home/SettingPage"
import Icon from "../pages/components/Icon"
import { NetInfo } from "react-native";
import { netInfo } from "../actions/deviceInfoAction";
import { getWebGoodData } from "../actions/homeAction";

const HomeNav = createBottomTabNavigator({
  Good: GoodPage,
  New: NewPage,
  Pics: PicsPage,
  Text: TextPage,
  Setting: SettingPage,
}, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let suite, iconName;
      switch (routeName) {
        case 'Good':
          suite = 'MaterialCommunityIcons'
          iconName = 'fire'
          break
        case 'New':
          suite = 'MaterialIcons'
          iconName = 'fiber-new'
          break
        case 'Pics':
          suite = 'FontAwesome'
          iconName = 'picture-o'
          break
        case 'Text':
          suite = 'Feather'
          iconName = 'file-text'
          break
        case 'Setting':
          suite = 'SimpleLineIcons'
          iconName = 'settings'
          break
        default:
          suite = 'MaterialIcons'
          iconName = 'error'
          break
      }
      return <Icon suite={suite} name={iconName} color={tintColor}/>
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
    showLabel: false,
  }
})

export const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeNav,
    path: 'Home',
    navigationOptions: ({ navigation }) => {
      const { state: { index, routes } } = navigation
      let title = ''
      switch (routes[index].routeName){
        case 'Good':
          title = '最火'
          break
        case 'New':
          title = '最新'
          break
        case 'Pics':
          title = '趣图'
          break
        case 'Text':
          title = '段子'
          break
        default:
          title = '首页'
          break
      }
      return {
        title,
      }
    }
  },
}, {
  initialRouteName: 'Home',
})

class AppWithNavigationState extends Component {
  constructor(){
    super()
  }

  render() {
    return (
      <AppNavigator navigation={{
        dispatch: this.props.dispatch,
        state: this.props.nav,
        addListener: addListenerRoot,
      }}/>
    );
  }
}

const mapProps = (state) => ({
  nav: state.nav
});

export default connect(mapProps, null)(AppWithNavigationState)