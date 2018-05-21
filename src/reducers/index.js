/**
 * @flow
 */
import { combineReducers } from "redux"
import navReducer from "./routes"
import { homeReducer } from './home'
import { reset } from '../utils/common'
import { loadingReducer } from "./loading"
import { commentReducer } from "./comment"
import { netInfoReducer } from "./deviceInfo"

const reducers = {
  nav: navReducer,
  home: homeReducer,
  loading: loadingReducer,
  comment: reset('reset/comment')(commentReducer),
  deviceInfo: netInfoReducer,
}

export default combineReducers(reducers)
