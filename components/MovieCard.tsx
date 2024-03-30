import { View, Image, TouchableWithoutFeedback, Dimensions } from 'react-native'
import React from 'react'

const {height, width} = Dimensions.get('window');


interface Props {
    item: number
    handleClick?: () => void
}

export default function MovieCard({item, handleClick}:Props) {
  return (
    <View>
      <TouchableWithoutFeedback onPress={handleClick}>
       <Image
          className='rounded-3xl'
          source={require('../assets/images/imagePoster1.jpg')}
          style={{
            width: width*0.6,
            height: height*0.4
          }
          }
        /> 
      </TouchableWithoutFeedback>
    </View>
  )
}