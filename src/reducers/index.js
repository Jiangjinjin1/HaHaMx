/**
 * @flow
 */
import { homeReducer } from './home'
import navReducer from "./routes";
import { combineReducers } from "redux";
import { loadingReducer } from "./loading";

const reducers = {
  nav: navReducer,
  home: homeReducer,
  loading: loadingReducer,
}

export default combineReducers(reducers)
