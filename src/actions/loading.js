/**
 * @flow
 */
import _ from 'lodash'
import { createAction } from 'redux-act'

export const loadingQueue = createAction('app/loadingQueue')
export const disOrEnableLoading = createAction('app/disOrEnableLoading')

export const startLoading = () => (store) => {
  const storeloadingQueue = _.get(store, 'loading.loadingQueue')
  return loadingQueue(storeloadingQueue + 1)
}

export const finishLoading = () => (store) => {
  const storeloadingQueue = _.get(store, 'loading.loadingQueue')
  return loadingQueue(Math.max(0, storeloadingQueue - 1))
}

export const disableLoading = () => [loadingQueue(0), disOrEnableLoading(false)]

export const enableLoading = () => disOrEnableLoading(true)

export const disableLoadingAction = (action: any) => {
  const disableLoad: any = disableLoading()
  return [disableLoad, async (state: any) => {
    try {
      const myAction = await action(state)
      return [myAction, enableLoading]
    } catch (e) {
      return [e, enableLoading]
    }
  }]
}
