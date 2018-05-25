/**
 * @flow
 */
import { createReducer } from "redux-act";
import { replaceReduce } from "../utils/common";
import { netSetting } from "../actions/settingAction"

export const settingReduce = createReducer({
  [netSetting]: replaceReduce
},{
  netSetting: false,
})