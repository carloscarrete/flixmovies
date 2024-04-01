import { View, Text, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import MovieList from '../components/MovieList';

const { height, width } = Dimensions.get('window');
const ios = Platform.OS === 'ios'
const verticaalMargin = ios ? '' : 'my-3'

export default function PersonScreen() {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [personMovies, setPersonMovies] = useState([1,2,3,4,5]);

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

      <View>
        <View className='flex-row justify-center' style={{
          shadowColor: 'red',
          shadowRadius: 40,
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 1,
        }}>

          <View className='items-center rounded-3xl overflow-hidden h-72 w-72 border-4 border-neutral-400'>
            <Image
              source={require('../assets/images/imagePoster1.jpg')}
              style={{ width: width * 0.70, height: height * 0.40 }}
            />
          </View>

        </View>
        <View className='mt-6'>
          <Text className='text-white text-3xl text-center'>Harry Potter </Text>
          <Text className='text-neutral-400 text-base text-center'>Daniel Radcliffe</Text>
        </View>
        <View className='mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-800 rounded-3xl'>
          <View className='px-2 items-center'>
            <Text className='text-white text-lg font-semibold'>Gender</Text>
            <Text className='text-neutral-400 text-base'>Male</Text>
          </View>
          <View className='px-2 items-center'>
            <Text className='text-white text-lg font-semibold'>Birthday</Text>
            <Text className='text-neutral-400 text-base'>23-07-1989</Text>
          </View>
          <View className='px-2 items-center'>
            <Text className='text-white text-lg font-semibold'>Know for</Text>
            <Text className='text-neutral-400 text-base'>Acting</Text>
          </View>
          <View className='px-2 items-center'>
            <Text className='text-white text-lg font-semibold'>Popularity</Text>
            <Text className='text-neutral-400 text-base'>78.63</Text>
          </View>
        </View>
        <View className='my-6 mx-4 space-y-2 bg-neutral-800 rounded-md p-4'>
          <Text className='text-white text-lg'>Biography</Text>
          <Text className='text-neutral-400 tracking-wide'>
            Daniel Radcliffe (born July 23, 1989, Fulham, London, England) British actor best known for his on-screen portrayal of the boy wizard Harry Potter.
            Radcliffe began acting at age six when he appeared as a monkey in a school play. After passing up an opportunity to audition for a television production of Charles Dickens’s Oliver Twist, he caught the attention of television producer Kate Harwood, who was impressed by his “charm and simplicity,” and he was cast in the title role of David Copperfield (1999). Two years later Radcliffe appeared in the film The Tailor of Panama (2001).</Text>
        </View>
        <MovieList title='Movies' data={personMovies} hiddenAll={true} />
      </View>
    </ScrollView>
  )
}