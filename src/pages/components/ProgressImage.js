/**
 * @flow
 */
import React from 'react'
import { CircleSnail, Circle, Pie, Bar } from 'react-native-progress'
import { createImageProgress } from 'react-native-image-progress'
import FastImage from 'react-native-fast-image'

// const Progress = () => <Bar size={200}/>
// const Progress = () => <CircleSnail color={['red', 'green', 'blue']}/>
export const Progress = (props) => <Circle size={30} {...props} />
// const Progress = () => <Pie size={50}/>

const CustomerImage = createImageProgress(FastImage)

export default CustomerImage