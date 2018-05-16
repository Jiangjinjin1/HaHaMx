/**
 * @flow
 */
import {
  createNavigationReducer,
} from 'react-navigation-redux-helpers'
import { AppNavigator } from "../utils/AppNavigator"

const navReducer = createNavigationReducer(AppNavigator);

export default navReducer