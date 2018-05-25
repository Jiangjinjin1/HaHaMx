/**
 * @flow
 */
import _ from 'lodash'
import { createAction } from 'redux-act'

export const netSetting = createAction('netSetting', arg => arg, arg => 'netSetting')

export const use4G = (store) => {
  const { deviceInfo: { netInfo }, setting: { netSetting } } = store
  if(_.toLower(netInfo.type) === 'wifi'){
    return true
  }
  return _.toLower(netInfo.effectiveType) === '4g' && netSetting
}