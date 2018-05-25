/**
 * @flow
 */

import { createAction } from 'redux-act'

export const netInfo = createAction('current netInfo', arg => arg, arg => 'netInfo')