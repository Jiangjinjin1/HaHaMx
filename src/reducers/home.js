/**
 * @flow
 */

import { createReducer } from "redux-act"
import {
  newData,
  picData,
  textData,
  webGoodData,
  webGoodDataRefreshState,
  newDataRefreshState,
  picDataRefreshState,
  textDataRefreshState,
} from "../actions/homeAction"
import { replaceReduce } from "../utils/common"
import { RefreshState } from "react-native-refresh-list-view"

export const homeReducer = createReducer({
  [webGoodData]: replaceReduce,
  [webGoodDataRefreshState]: replaceReduce,
  [newData]: replaceReduce,
  [newDataRefreshState]: replaceReduce,
  [picData]: replaceReduce,
  [picDataRefreshState]: replaceReduce,
  [textData]: replaceReduce,
  [textDataRefreshState]: replaceReduce,
}, {
  webGoodData: {},
  webGoodDataRefreshState: RefreshState.Idle,
  newData: {},
  newDataRefreshState: RefreshState.Idle,
  picData: {},
  picDataRefreshState: RefreshState.Idle,
  textData: {},
  textDataRefreshState: RefreshState.Idle,
})