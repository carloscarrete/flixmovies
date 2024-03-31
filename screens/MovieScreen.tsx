import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { Platform } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';


const { height, width } = Dimensions.get('window');
const ios = Platform.OS === 'ios'
const topMargin = ios ? '' : 'mt-3'

export default function MovieScreen() {

  const movieName = 'Gladiador - prueba de película';

  const { params } = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isFavorited, setIsFavorited] = useState<boolean>(false)
  useEffect(() => {

  }, [])


  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className='flex-1 bg-neutral-900'
    >
      <View className='w-full'>
        <SafeAreaView className={'absolute z-20 w-full flex-row justify-between items-center px-4 m-6' + topMargin}>
          <TouchableOpacity className='rounded-3xl p-1' onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size="24" color='#387ADF' strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFavorited(!isFavorited)}>
            <HeartIcon size="24" color={isFavorited ? 'red' : 'white'} strokeWidth={2} />
          </TouchableOpacity>
        </SafeAreaView>
        <View>
          <Image
            source={require('../assets/images/imagePoster3.jpg')}
            style={{ width: width, height: height * 0.55 }}
          />
          <LinearGradient
            colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
            style={{ width: width, height: height * 0.40 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className='absolute bottom-0'
          />
        </View>
      </View>

      <View style={{ marginTop: (height * 0.09) }} className='space-y-3'>
        <Text className='text-white font-bold text-3xl text-center tracking-wider'>
          {movieName}
        </Text>
        <Text className='text-neutral-400 text-center text-base font-semibold'>
          Released - 2024 - 190 min
        </Text>
        <View className='flex-row justify-center mx-4 space-x-2'>
          <Text className='text-neutral-400 font-semibold text-center text-base'>Action - </Text>
          <Text className='text-neutral-400 font-semibold text-center text-base'>Drama - </Text>
          <Text className='text-neutral-400 font-semibold text-center text-base'>Comedy - </Text>
        </View>
        <Text className='text-white mx-4 text-base'>
          Shouting "Roma Invicta!" as his forces attack, General Maximus Decimus Meridius (Russell Crowe) leads the Roman Army to victory against Germanic barbarians in the year 180 A.D., ending a prolonged war and earning the esteem of elderly Emperor Marcus Aurelius. Although the dying Aurelius has a son, Commodus (Joaquin Phoenix), he decides to appoint temporary leadership to the morally-upstanding Maximus, with a desire to eventually return power to the Roman Senate. Aurelius informs Maximus and offers him time to consider before informing Commodus, who, in a bout of jealousy, murders his father.
        </Text>
      </View>
    </ScrollView>
  )
}