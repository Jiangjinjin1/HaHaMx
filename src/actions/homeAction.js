/**
 * @flow
 */
import _ from 'lodash'
import { createAction } from 'redux-act'
import { getJokeList } from "../api/api"

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
  !_.isEmpty(newJoke) && _.forEach(newJoke, (item2, index2) => {
    const findIndex = _.findIndex(oldJoke, { id: item2.id })
    if ( findIndex > -1 ) {
      arr.splice(findIndex, 1, item2)
    } else {
      push ? arr.push(item2) : arr.unshift(item2)
    }
  })
  return {
    page: push ? _.get(newData, 'page', 1) : _.get(oldData, 'page', 1),
    joke: [...arr]
  }
}

export const webGoodData = createAction('get Web Good Data')

export const getWebGoodData = ({
                                 page,
                                 callback,
                                 pullOrPush = 'push',
                               }: {
  page?: number,
  callback?: () => void,
  pullOrPush?: string,
}) => async (store) => {
  const data = _.get(store, 'home.webGoodData') || {}
  const currentPage = _.get(store, 'home.webGoodData.page') || 0
  const result = await getJokeList({
    type: 'web_good',
    page: page ? page : Number(currentPage) + 1,
  })
  callback && callback()
  return webGoodData({
    ...merge({
      oldData: data,
      newData: result,
      push: pullOrPush === 'push',
    })
  })
}

export const newData = createAction('get new Data')

export const getNewData = ({
                             page,
                             callback,
                             pullOrPush = 'push',
                           }: {
  page?: number,
  callback?: () => void,
  pullOrPush?: string,
}) => async (store) => {
  const data = _.get(store, 'home.newData') || {}
  const currentPage = _.get(store, 'home.newData.page') || 0
  const result = await getJokeList({
    type: 'new',
    page: page ? page : Number(currentPage) + 1,
  })
  callback && callback()
  return newData({
    ...merge({
      oldData: data,
      newData: result,
      push: pullOrPush === 'push',
    })
  })
}

export const picData = createAction('get pic Data')

export const getPicData = ({
                             page,
                             callback,
                             pullOrPush = 'push',
                           }: {
  page?: number,
  callback?: () => void,
  pullOrPush?: string,
}) => async (store) => {
  const data = _.get(store, 'home.picData') || {}
  const currentPage = _.get(store, 'home.newData.picData') || 0
  const result = await getJokeList({
    type: 'pic',
    page: page ? page : Number(currentPage) + 1,
  })
  callback && callback()
  return picData({
    ...merge({
      oldData: data,
      newData: result,
      push: pullOrPush === 'push',
    })
  })
}

export const textData = createAction('get text Data')

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
  callback && callback()
  return textData({
    ...merge({
      oldData: data,
      newData: result,
      push: pullOrPush === 'push',
    })
  })
}

