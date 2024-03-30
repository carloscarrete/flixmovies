import { View, Text } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import MovieCard from './MovieCard'

interface Props {
  data: number[]
}

const datos = [1,2,3]

export default function TrendingMovies({data}: Props) {
  return (
    <View className='mb-8'>
      <Text className='text-white text-xl mx-4 mb-5'>Trending Movies</Text>
      <Text className='text-white text-xl mx-4 mb-5'>Trending Movies</Text>
      <Carousel 
        data={data}
        renderItem={({item}) => <Text>{item}</Text>}
        firstItem={1}
        sliderWidth={400}
        inactiveSlideOpacity={0.60}
        itemWidth={200}
        slideStyle={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      />
    </View>
  )
}