/**
 * @flow
 */

import { createReducer } from "redux-act";
import { newData, picData, textData, webGoodData } from "../actions/homeAction";
import { replaceReduce } from "../utils/common";

export const homeReducer = createReducer({
  [webGoodData]: (state, payload) => replaceReduce(state, payload, 'webGoodData'),
  [newData]: (state, payload) => replaceReduce(state, payload, 'newData'),
  [picData]: (state, payload) => replaceReduce(state, payload, 'picData'),
  [textData]: (state, payload) => replaceReduce(state, payload, 'textData'),
}, {
  webGoodData: {},
  newData: {},
  picData: {},
  textData: {},
})