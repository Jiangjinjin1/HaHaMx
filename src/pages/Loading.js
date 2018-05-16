/**
 * @flow
 */
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'
import { connect } from 'react-redux'
import Spinner from './components/Spinner'

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const Loading = ({
                   isLoading
                 }: {
  isLoading: boolean,
}) => {
  if ( !isLoading ) {
    return null
  }
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <Spinner/>
        <Text style={{color: 'black'}}>正在加载……</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

function mapProps(store) {
  return {
    isLoading: store.loading.loadingQueue > 0 && store.loading.disOrEnableLoading,
  }
}

export default connect(mapProps)(Loading)
