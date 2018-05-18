/**
 * @flow
 */
import { combineReducers } from "redux"
import navReducer from "./routes"
import { homeReducer } from './home'
import { loadingReducer } from "./loading"
import { commentReducer } from "./comment"
import { reset } from '../utils/common'

const reducers = {
  nav: navReducer,
  home: homeReducer,
  loading: loadingReducer,
  comment: reset('reset/comment')(commentReducer),
}

export default combineReducers(reducers)
