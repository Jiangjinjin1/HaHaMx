/**
 * @flow
 */
import { timeout } from './promise'

export const transformTime = (seconds) => {
  let m
  let s
  m = Math.floor(seconds / 60)
  m = m.toString().length === 1 ? (`0${m}`) : m
  s = Math.floor(seconds - (60 * m))
  s = s.toString().length === 1 ? (`0${s}`) : s
  return `${m}:${s}`
}

export const fetchSystem = async (url: string, params: Object) => {
  let result
  const response = await timeout(180000)(fetch(url, params))
    .catch(() => {
      throw new Error('亲，您的网络连接失败，请重新尝试。')
    })
  try {
    result = await response.json()
    if (!result) {
      throw new Error('系统繁忙，请稍后再试。')
    }
  } catch (error) {
    throw new Error('系统繁忙，请稍后再试。')
  }
  return result || {}
}

export type Reducer<S, A> = (state: S, action: A) => S
export type ResetableReducer = Reducer<Object, { type: string }>

export const reset = (actionType: string, defaultValue: Object = {}) =>
  (reducer: ResetableReducer): ResetableReducer => (state, action) => {
    if (action.type === actionType) {
      return reducer(defaultValue, action)
    }
    return reducer(state, action)
  }

export const replaceReduce = (state, payload, key) => ({
  ...state,
  [key]: payload,
})

export const doublePress = (onPress?: (arg: any) => any, timeout: number = 300) => {
  let touchableTime = 0
  return (...arg: any) => {
    if (onPress) {
      touchableTime++
      setTimeout(() => {
        touchableTime--
      }, timeout)
    }
    if (touchableTime === 2) {
      return onPress(...arg)
    }
    return null
  }
}

export const normalPress = (onPress?: (arg: any) => any, timeout: number = 500) => {
  let touchable = true
  return (...arg: any) => {
    if (touchable && onPress) {
      touchable = false
      setTimeout(() => {
        touchable = true
      }, timeout)
      return onPress(...arg)
    }
    return []
  }
}

export const replaceBr = (content) => content.replace(/<br\s*\/>/g, '\n')

export const getImageUrl = ({
                           loadImg,
                           path,
                           name,
                         }) => loadImg ? `https://image.haha.mx/${path}/big/${name}` : `https://image.haha.mx/${path}/small/${name}`