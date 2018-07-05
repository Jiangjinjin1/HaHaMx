/**
 * @flow
 */
import { createStore, compose } from 'redux'
import devToolsEnhancer from 'remote-redux-devtools'
import { Platform, AsyncStorage, NetInfo } from 'react-native'
import { persistStore, persistReducer } from 'redux-persist'
import reducer from './reducers/index'
import middleware from "./utils/middleware"
import { netInfo } from "./actions/deviceInfoAction";

export default (onComplete) => {
  const devEnhancer = devToolsEnhancer({
    name: Platform.OS,
    hostname: 'localhost',
    port: 5678,
  })
  const fn = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'
  const devMac = window[fn] ? window[fn]() : devEnhancer
  const enhancer = __DEV__ ? compose(middleware, devMac /* enhancer */) : middleware

  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['nav', 'setting'],
  }

  const persistedReducer = persistReducer(persistConfig, reducer)

  const store = createStore(
    persistedReducer,
    undefined,
    enhancer
  )

  const storeInit = () => {
    onComplete(store)

    const handleFirstConnectivityChange = (connectionInfo) => {
      store.dispatch(netInfo(connectionInfo))
    }

    NetInfo.getConnectionInfo().then((connectionInfo) => {
      store.dispatch(netInfo(connectionInfo))
    })
    NetInfo.addEventListener(
      'connectionChange',
      (connectionInfo) => handleFirstConnectivityChange(connectionInfo)
    )
  }

  persistStore(store, null, storeInit)

  // return { store, persistor: persistStore(store) }
}