import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import MovieCard from './MovieCard'
import { useNavigation, ParamListBase } from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/';

const {height, width} = Dimensions.get('window');

interface Props {
  data: number[]
}


export default function TrendingMovies({data}: Props) {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleClick = (item:number) => {
    navigation.navigate('Movie', {
      item: item
    });
  }

  return (
    <View className='mb-8'>
      <Text className='text-white text-xl mx-4 mb-5'>Trending Movies</Text>
      <Carousel 
        data={data}
        renderItem={({item}) => <MovieCard item={item} handleClick={() => handleClick(item) }/>}
        firstItem={1}
        sliderWidth={width}
        vertical={false}
        inactiveSlideOpacity={0.60}
        itemWidth={width*0.62}
        slideStyle={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      />
    </View>
  )
}