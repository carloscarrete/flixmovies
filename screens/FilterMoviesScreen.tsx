import { View, Text, Dimensions, Platform } from 'react-native'
import React from 'react'
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native'
import { Result } from '../interfaces/Movies';
import useInfiniteMovies from '../hooks/useInfiniteMovies';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { typeListMovie } from '../types/types';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'react-native';
import { truncateText } from '../utils/truncateText';
import { image500 } from '../services/api/movies';
import { noImageToShow600 } from '../constants/movies';

const { height, width } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const topMargin = ios ? '' : 'mt-3';

export default function FilterMoviesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const params = useRoute();
  const {} = params.params as { movies: Result[] }
  const { typeMovie } = params.params as { typeMovie: typeListMovie }
  const { infiniteQueryMovies } = useInfiniteMovies({ searchQuery: 'Kung Fu Panda', pageParam: 1, keyTitle: 'upcomingg', typeMovie })
  return (
    <View className='flex-1 bg-neutral-700'>
      <View className='w-full'>
        <SafeAreaView className={'w-full flex-row justify-between items-center px-4 mx-0 ' + topMargin}>
          <TouchableOpacity className='p-1 rounded-3xl' onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size="24" color='#387ADF' strokeWidth={2} />
          </TouchableOpacity>
          <View>
            <Text className='text-white'>Upcoming Movies</Text>
          </View>
        </SafeAreaView>
        <View className='flex-1 h-full overflow-y-scrol mb-3'>
          <Text className='text-white mx-6'>Results</Text>
          <View className='' style={{
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").height,
          }}>
            <FlashList 
              data={infiniteQueryMovies.data?.pages.flatMap(page => page.results)}
              keyExtractor={item => item.id.toString()}
              numColumns={Math.floor(width / (width * 0.45 + 10))}
              onEndReached={() => infiniteQueryMovies.fetchNextPage()}
              onEndReachedThreshold={0.5}
              estimatedItemSize={150}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Movie', { item })}
                >
                  <View className='items-center m-3'>
                    <Image
                      className='rounded-2xl'
                      source={{ uri: item.poster_path ? image500(item?.poster_path) : noImageToShow600() }}
                      style={{ width: width * 0.40, height: height * 0.30 }}
                    />
                    <Text className='text-neutral-300'>{truncateText(item.title, 22)}</Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          </View>
        </View>
      </View>
    </View>
  )
}