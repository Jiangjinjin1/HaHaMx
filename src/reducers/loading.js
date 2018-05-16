/**
 * @flow
 */

import { createReducer } from "redux-act";
import { replaceReduce } from "../utils/common";
import { loadingQueue, disOrEnableLoading } from "../actions/loading";

export const loadingReducer = createReducer({
  [loadingQueue]: (state, payload) => replaceReduce(state, payload, 'loadingQueue'),
  [disOrEnableLoading]: (state, payload) => replaceReduce(state, payload, 'disOrEnableLoading'),
}, {
  loadingQueue: 0,
  disOrEnableLoading: true,
})