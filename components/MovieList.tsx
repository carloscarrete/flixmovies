import { View, Text, TouchableOpacity, ScrollView, FlatList, Image, Dimensions } from 'react-native'
import React from 'react'
import { styles } from '../theme'
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/';
import { truncateText } from '../utils/truncateText';
import { Result } from '../interfaces/Movies';
import { image185 } from '../services/api/movies';
import { noImageToShow342 } from '../constants/movies';
import { typeListMovie } from '../types/types';

const { height, width } = Dimensions.get('window');

interface Props {
  title: string,
  data: Result[]
  hiddenAll?: boolean,
  typeListMovie: typeListMovie
}

export default function MovieList({ data, title, hiddenAll = false, typeListMovie }: Props) {

  const movieName = 'Gladiador - prueba de película';

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View className='mb-8 space-y-4'>
      <View className='mx-4 flex-row justify-between items-center'>
        <Text className='text-white text-xl'>{title}</Text>                                    
        <TouchableOpacity>
          {hiddenAll ? null : <Text className='text-xl' style={styles.secondaryText} onPress={()=>navigation.navigate('FilterMovies', {typeMovie: typeListMovie})}>See All</Text>}
        </TouchableOpacity>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { navigation.navigate('Movie', { item }) }}>
            <View className='space-y-1 mr-2'>
              <Image
                className='rounded-3xl'                  
                source={item.poster_path ? { uri: image185(item.poster_path) } : require('../assets/images/noImage.png')}
                style={{
                  width: width * 0.40,
                  height: height * 0.29
                }
                }
              />
              <Text className='text-white ml-1 text-center'>
                {truncateText(item.title)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </View>
  )
}