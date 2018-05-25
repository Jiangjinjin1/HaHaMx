/**
 * @flow
 */
import { createReducer } from "redux-act"
import { replaceReduce } from "../utils/common"
import { netInfo } from "../actions/deviceInfoAction"

export const netInfoReducer = createReducer({
  [netInfo]: replaceReduce,
}, {
  netInfo: {},
})