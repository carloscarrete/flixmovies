import { View, Text } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';

const { height, width } = Dimensions.get('window');

interface PropsProgressBar {
  downloadProgress: number
  isDownloading: boolean
}

export default function LoadingC() {
  return (
    <View style={{ height, width }} className='flex-1 items-center justify-center'>
      <Progress.CircleSnail size={100} indeterminate={true} color={['#387ADF', 'blue', '#FBA834']} />
    </View>
  )
}

export const ProgressBar = ({downloadProgress, isDownloading}: PropsProgressBar) => {
  return (
    <View style={{ flexDirection: 'column', marginTop: 10}}>
      <Progress.Bar borderRadius={25} color='#516CE5' height={30} width={200} progress={downloadProgress} style={{}} />
      {
        downloadProgress === 1 && <View>
          <Text style={{ color: 'white', textAlign: 'center' }}>Download Complete</Text>
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Now you can install the app</Text>
        </View> 
      }
    </View>)
}