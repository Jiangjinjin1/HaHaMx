/**
 * @flow
 */
import _ from 'lodash'
import { createAction } from 'redux-act'
import { getJokeList } from "../api/api"
import { RefreshState } from "react-native-refresh-list-view"


export const webGoodData = createAction('get Web Good Data', arg => arg, arg => ('webGoodData'))
export const webGoodDataRefreshState = createAction('get Web Good Data RefreshState', arg => arg, arg => ('webGoodDataRefreshState'))
export const newData = createAction('get new Data', arg => arg, arg => ('newData'))
export const newDataRefreshState = createAction('get Web Good Data RefreshState', arg => arg, arg => ('newDataRefreshState'))
export const picData = createAction('get pic Data', arg => arg, arg => ('picData'))
export const picDataRefreshState = createAction('get Web Good Data RefreshState', arg => arg, arg => ('picDataRefreshState'))
export const textData = createAction('get text Data', arg => arg, arg => ('textData'))
export const textDataRefreshState = createAction('get Web Good Data RefreshState', arg => arg, arg => ('textDataRefreshState'))

const merge = ({
                 oldData,
                 newData,
                 push,
               }: {
  oldData: Object,
  newData: Object,
  push: boolean,
}) => {
  const oldJoke = _.get(oldData, 'joke', [])
  const newJoke = _.get(newData, 'joke', [])
  const arr = [...oldJoke]
  !_.isEmpty(newJoke) && _.forEachRight(newJoke, (item2, index2) => {
    const findIndex = _.findIndex(arr, { id: item2.id })
    if (findIndex > -1) {
      arr.splice(findIndex, 1, item2)
    } else {
      push ? arr.push(item2) : arr.unshift(item2)
    }
  })
  return {
    page: push ? _.get(newData, 'page', 1) : _.get(oldData, 'page', 1),
    joke: arr,
  }
}


export const getWebGoodData = ({
                                 page,
                                 pullOrPush = 'push',
                               }: {
  page?: number,
  pullOrPush?: string,
}) => async (store) => {
  const data = _.get(store, 'home.webGoodData') || {}
  const currentPage = _.get(store, 'home.webGoodData.page') || 0
  const result = await getJokeList({
    type: 'web_good',
    page: page ? page : Number(currentPage) + 1,
  })
  if (_.get(result, 'joke', []).length === 0) {
    return webGoodDataRefreshState(RefreshState.NoMoreData)
  }
  return [webGoodData({
    ...merge({
      oldData: data,
      newData: result,
      push: pullOrPush === 'push',
    })
  }), webGoodDataRefreshState(RefreshState.Idle)]
}


export const getNewData = ({
                             page,
                             pullOrPush = 'push',
                           }: {
  page?: number,
  pullOrPush?: string,
}) => async (store) => {
  const data = _.get(store, 'home.newData') || {}
  const currentPage = _.get(store, 'home.newData.page') || 0
  const result = await getJokeList({
    type: 'new',
    page: page ? page : Number(currentPage) + 1,
  })
  if (_.get(result, 'joke', []).length === 0) {
    return newDataRefreshState(RefreshState.NoMoreData)
  }
  return [newData({
    ...merge({
      oldData: data,
      newData: result,
      push: pullOrPush === 'push',
    })
  }), newDataRefreshState(RefreshState.Idle)]
}


export const getPicData = ({
                             page,
                             pullOrPush = 'push',
                           }: {
  page?: number,
  pullOrPush?: string,
}) => async (store) => {
  const data = _.get(store, 'home.picData') || {}
  const currentPage = _.get(store, 'home.newData.picData') || 0
  const result = await getJokeList({
    type: 'pic',
    page: page ? page : Number(currentPage) + 1,
  })
  if (_.get(result, 'joke', []).length === 0) {
    return picDataRefreshState(RefreshState.NoMoreData)
  }
  return [picData({
    ...merge({
      oldData: data,
      newData: result,
      push: pullOrPush === 'push',
    })
  }), picDataRefreshState(RefreshState.Idle)]
}


export const getTextData = ({
                              page,
                              callback,
                              pullOrPush = 'push',
                            }: {
  page?: number,
  callback?: () => void,
  pullOrPush?: string,
}) => async (store) => {
  const data = _.get(store, 'home.textData') || {}
  const currentPage = _.get(store, 'home.textData.page') || 0
  const result = await getJokeList({
    type: 'text',
    page: page ? page : Number(currentPage) + 1,
  })
  if (_.get(result, 'joke', []).length === 0) {
    return textDataRefreshState(RefreshState.NoMoreData)
  }
  return [textData({
    ...merge({
      oldData: data,
      newData: result,
      push: pullOrPush === 'push',
    })
  }), textDataRefreshState(RefreshState.Idle)]
}

