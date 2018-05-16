/**
 * @flow
 */
import React from 'react'
import Image from 'react-native-image-progress'
import { CircleSnail, Circle, Pie, Bar } from 'react-native-progress'

import { createImageProgress } from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';

const CustomerImage = createImageProgress(FastImage)

// const Progress = () => <CircleSnail color={['red', 'green', 'blue']}/>
// const Progress = () => <Circle size={30} indeterminate={true}/>
// const Progress = () => <Pie size={50}/>
const Progress = () => <Bar size={200}/>

const ProgressImage = (props) => {
  const { style, source } = props
  return (
    <Image
      source={source}
      indicator={Progress}
      style={style}
    />
  )
}

export default CustomerImage