/**
 * @flow
 */

import { createReducer } from "redux-act"
import { replaceReduce } from "../utils/common"
import { loadingQueue, disOrEnableLoading } from "../actions/loading"

export const loadingReducer = createReducer({
  [loadingQueue]: replaceReduce,
  [disOrEnableLoading]: replaceReduce,
}, {
  loadingQueue: 0,
  disOrEnableLoading: true,
})