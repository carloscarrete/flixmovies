import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { Platform } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import MovieList from '../components/MovieList';
import LoadingC from '../components/LoadingC';
import {Result } from '../interfaces/Movies';
import { fetchMovieCast, fetchMovieDetail, fetchSimilarMovies } from '../services/actions';
import Cast from '../components/Cast';
import { image500 } from '../services/api/movies';
import { noImageToShow600 } from '../constants/movies';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useMovies from '../hooks/useMovies';
import useCasting from '../hooks/useCasting';
import useMovieDetails from '../hooks/useMovieDetails';


const { height, width } = Dimensions.get('window');
const ios = Platform.OS === 'ios'
const topMargin = ios ? '' : 'mt-3'

export default function MovieScreen() {

  const { params } = useRoute();
  const { item } = params as { item: Result }

  const {data: similarMovies,isLoadigMovies: isLoading} = useMovies(['movies', 'similar', item.id], () => fetchSimilarMovies(item.id))
  const { data: cast } = useCasting(['cast', item.id], () => fetchMovieCast(item.id));
  const {data: movieDetails} = useMovieDetails(['movieDetails', item.id], () => fetchMovieDetail(item.id));


  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  const storageFavoriteMovie = async (movie: Result) => {
    try {
      const jsonValue = await AsyncStorage.getItem('movies');
      const currentMovies = jsonValue ? JSON.parse(jsonValue) : [];

      const existingMovieIndex = currentMovies.findIndex((m: Result) => m.id === movie.id);

      existingMovieIndex !== -1
        ? currentMovies.splice(existingMovieIndex, 1)
        : currentMovies.push(movie);

      await AsyncStorage.setItem('movies', JSON.stringify(currentMovies));
    } catch (e) {
      console.log(e)
    }
  } 


  useEffect(() => {
    const checkIfFavorited = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('movies');
        const currentMovies = jsonValue ? JSON.parse(jsonValue) : [];
        const isFavorited = currentMovies.some((m: Result) => m.id === item.id);
        setIsFavorited(isFavorited);
      } catch (e) {
        console.log(e);
      }
    };
  
    checkIfFavorited();
  }, [item.id]);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className='flex-1 bg-neutral-900'
    >
      <View className='w-full'>
        <SafeAreaView className={'absolute z-20 w-full flex-row justify-between items-center px-4 mx-0 ' + topMargin}>
          <TouchableOpacity className='rounded-3xl p-1' onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size="24" color='#387ADF' strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {setIsFavorited(!isFavorited), storageFavoriteMovie(item)}}>
            <HeartIcon size="24" color={isFavorited ? 'red' : 'white'} strokeWidth={2} />
          </TouchableOpacity>
        </SafeAreaView>
        {
          isLoading ?
            (
              <LoadingC />
            )
            :
            (
              <View>
                <Image
                  source={{ uri: item.backdrop_path ? image500(item?.backdrop_path) : noImageToShow600() }}
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
            )
        }
      </View>

      <View style={{ marginTop: (height * 0.09) }} className='space-y-3'>
        <Text className='text-white font-bold text-3xl text-center tracking-wider'>
          {item.title}
        </Text>
        <View className="flex-row items-center justify-center">
          <View className={`h-2 w-2 rounded-full ${movieDetails?.status === 'Released' ? 'bg-green-500' : 'bg-orange-500'} mr-1`}></View>
          <Text className='text-neutral-400 text-center text-base font-semibold'>
            {movieDetails?.status} | {movieDetails?.release_date.split('-')[0] ? movieDetails?.release_date.split('-')[0] : new Date().getFullYear()} | {movieDetails?.runtime} min
          </Text>
        </View>
        <View className='flex-row justify-center mx-4 space-x-2'>
          {
            movieDetails?.genres && movieDetails?.genres.map((genre, index) => (
              <Text key={index} className='text-neutral-400 font-semibold text-center text-sm'>{genre.name} </Text>
            ))
          }
        </View>
        <Text className='text-white mx-4 text-base'>
          {item.overview}
        </Text>
      </View>

      {cast && <Cast cast={cast} navigation={navigation} />}

      {similarMovies && <MovieList title='Similar Movies' data={similarMovies} hiddenAll={true} />}
    </ScrollView>
  )
}