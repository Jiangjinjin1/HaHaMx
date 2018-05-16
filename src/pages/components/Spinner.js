/**
 * @flow
 */

import React, { Component } from 'react'
import {
  View,
  Text,
  Animated,
  Easing,
  StyleSheet,
} from 'react-native'
import Icon from './Icon'

const styles = StyleSheet.create({
  container: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: 0x0000008C,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rotate: {
    position: 'absolute',
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

class Spinner extends Component {
  constructor() {
    super()
    this.rotating = new Animated.Value(0)
    this.currentLoop = 0
    this.componentMounted = false
  }
  componentDidMount() {
    this.componentMounted = true
    this.animate()
  }

  componentWillUnmount() {
    this.componentMounted = false
  }

  animate() {
    if (!this.componentMounted) {
      return
    }
    this.currentLoop++
    Animated.timing(this.rotating,
      {
        toValue: this.currentLoop,
        duration: 1500,
        easing: Easing.linear,
      }
    ).start(this.animate.bind(this))
  }

  rotating: Animated.Value
  currentLoop: number
  componentMounted: boolean

  render() {
    const mapping: any = {
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    }
    const animatedInterpolation = this.rotating.interpolate(mapping)
    const rotate = { transform: [{ rotate: animatedInterpolation }] }
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.rotate, rotate]}>
          <Icon
            suite="EvilIcons"
            name="spinner-3"
            color="white"
            size={95}
          />
        </Animated.View>
      </View>
    )
  }
}

export default Spinner
