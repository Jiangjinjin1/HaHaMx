/**
 * @flow
 */

import { createReducer } from "redux-act";
import { newData, picData, textData, webGoodData } from "../actions/homeAction";
import { replaceReduce } from "../utils/common";

export const homeReducer = createReducer({
  [webGoodData]: replaceReduce,
  [newData]: replaceReduce,
  [picData]: replaceReduce,
  [textData]: replaceReduce,
}, {
  webGoodData: {},
  newData: {},
  picData: {},
  textData: {},
})