import { View, Text, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import MovieList from '../components/MovieList';
import LoadingC from '../components/LoadingC';
import { fetchPeopleDetails, fetchPeopleMoviesDetailsCredits } from '../services/actions';
import { image500 } from '../services/api/movies';
import { CastElement } from '../interfaces/Cast';
import { getGender } from '../constants/movies';
import usePerson from '../hooks/usePerson';
import usePeopleCredits from '../hooks/usePeopleCredits';

const { height, width } = Dimensions.get('window');
const ios = Platform.OS === 'ios'
const verticaalMargin = ios ? '' : 'my-3'

export default function PersonScreen() {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const { params } = useRoute();
  const { item } = params as { item: CastElement }

  const {data: personDetails, isLoadingPerson: isLoading} = usePerson(['person', item.id], () => fetchPeopleDetails(item.id));
  const {data: personMovies} = usePeopleCredits(['movies', 'similar', item.id], () => fetchPeopleMoviesDetailsCredits(item.id));

  return (
    <ScrollView className='bg-neutral-900 flex-1'>
      <SafeAreaView className={'z-20 w-full flex-row justify-between items-center px-4' + verticaalMargin}>
        <TouchableOpacity className='rounded-3xl p-1' onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size="24" color='#387ADF' strokeWidth={2} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavorited(!isFavorited)}>
          <HeartIcon size="24" color={isFavorited ? 'red' : 'white'} strokeWidth={2} />
        </TouchableOpacity>
      </SafeAreaView>

      {
        isLoading
          ?
          (<LoadingC />)
          :
          (
            <View>
              <View className='flex-row justify-center' style={{
                shadowColor: 'red',
                shadowRadius: 40,
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 1,
              }}>

                <View className='items-center rounded-3xl overflow-hidden h-72 w-72 border-4 border-neutral-400'>
                  <Image
                    source={{ uri: image500(item?.profile_path ?? 'default_path') }}
                    style={{ width: width * 0.70, height: height * 0.40 }}
                  />
                </View>

              </View>
              <View className='mt-6'>
                <Text className='text-white text-3xl text-center'>{item.character}</Text>
                <Text className='text-neutral-400 text-base text-center'>{item.name}</Text>
              </View>
              <View className='mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-800 rounded-3xl'>
                <View className='px-2 items-center'>
                  <Text className='text-white text-lg font-semibold'>Gender</Text>
                  <Text className='text-neutral-400 text-base'>{getGender(item.gender)}</Text>
                </View>
                <View className='px-2 items-center'>
                  <Text className='text-white text-lg font-semibold'>Birthday</Text>
                  <Text className='text-neutral-400 text-base'>{personDetails?.birthday || "Not available"}</Text>
                </View>
                <View className='px-2 items-center'>
                  <Text className='text-white text-lg font-semibold'>Popularity</Text>
                  <Text className='text-neutral-400 text-base'>{item.popularity}</Text>
                </View>
              </View>
              <View className='my-6 mx-4 space-y-2 bg-neutral-800 rounded-md p-4'>
                <Text className='text-white text-lg'>Biography</Text>
                <Text className='text-neutral-400 tracking-wide'>
                  {personDetails?.biography || "Not available"}
                  </Text>
              </View>
                  {personMovies && <MovieList title='Movies' data={personMovies} hiddenAll={true} />}   
            </View>
          )
      }
    </ScrollView>
  )
}