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
import { settingReduce } from "./setting"

const reducers = {
  nav: navReducer,
  home: homeReducer,
  loading: loadingReducer,
  comment: reset('reset/comment')(commentReducer),
  deviceInfo: netInfoReducer,
  setting: settingReduce,
}

export default combineReducers(reducers)
