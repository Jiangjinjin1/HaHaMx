/**
 * @flow
 */

import { createReducer } from "redux-act"
import { replaceReduce } from "../utils/common"
import { currentComment } from "../actions/commentAction"

export const commentReducer = createReducer({
  [currentComment]: (state, payload) => replaceReduce(state, payload, 'currentComment'),
}, {
  currentComment: {},
})