/**
 * @flow
 */

import { createReducer } from "redux-act"
import { replaceReduce } from "../utils/common"
import { commentRefreshState, currentComment } from "../actions/commentAction"
import { RefreshState } from "react-native-refresh-list-view"

export const commentReducer = createReducer({
  [currentComment]: replaceReduce,
  [commentRefreshState]: replaceReduce,
}, {
  currentComment: {},
  commentRefreshState: RefreshState.Idle,
})