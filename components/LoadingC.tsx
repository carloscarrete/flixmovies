import { View, Text } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';

const { height, width } = Dimensions.get('window');

export default function LoadingC() {
  return (
    <View style={{height, width}} className='flex-1 items-center justify-center'>
      <Progress.CircleSnail size={100} indeterminate={true} color={['#387ADF', 'blue', '#FBA834']} />
    </View>
  )
}