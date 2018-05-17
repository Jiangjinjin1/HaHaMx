/**
 * @flow
 */
import { applyMiddleware } from 'redux'
import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener
} from "react-navigation-redux-helpers"
import { finishLoading, startLoading } from "../actions/loading";

const thunkState = ({ dispatch, getState }) => {
  return next => action => {
    if (action && typeof action === 'function') {
      return dispatch(action(getState(), dispatch))
    }
    return next(action)
  }
}

function multiDispatcher({ dispatch }) {
  return next => actions => {
    if (Array.isArray(actions)) {
      return actions.map(action => dispatch(action))
    }
    return next(actions)
  }
}

function promise({ dispatch }) {
  return next => action => {
    if (action && typeof action.then === 'function') {
      dispatch(startLoading())
      const finishLoadingAndDispatch = (input) => {
        dispatch(finishLoading())
        dispatch(input)
      }
      return action.then(finishLoadingAndDispatch).catch(finishLoadingAndDispatch)
    }
    return next(action)
  }
}

const navigationMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
)

export const addListenerRoot = createReduxBoundAddListener("root");

export default applyMiddleware(
  promise,
  thunkState,
  multiDispatcher,
  navigationMiddleware,
)