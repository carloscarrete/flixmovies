import { View, Image, TouchableWithoutFeedback, Dimensions } from 'react-native'
import React from 'react'
import { Result } from '../interfaces/Movies';
import { image500 } from '../services/api/movies';

const { height, width } = Dimensions.get('window');


interface Props {
  item: Result
  handleClick?: () => void
}

export default function MovieCard({ item, handleClick }: Props) {
  return (
    <View>
      <TouchableWithoutFeedback onPress={handleClick}>
        <Image
          className='rounded-3xl'
          source={{uri: image500(item.poster_path)}}
          style={{
            width: width * 0.6,
            height: height * 0.4
          }
          }
        />
      </TouchableWithoutFeedback>
    </View>
  )
}