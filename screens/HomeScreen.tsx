import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, Text, Platform, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { styles } from '../theme/'

import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/MovieList'
import { DrawerActions, ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import LoadingC from '../components/LoadingC'
import { fetchTopRated, fetchTrendingMovies, fetchUpcoming, } from '../services/actions'
import useMovies from '../hooks/useMovies'
import { typeListMovie } from '../types/types';
import ModalCheckVersion from '../components/ModalCheckVersion'

const ios = Platform.OS === 'ios'



const HomeScreen = () => {

    const {data:trendingMovies, isLoading} = useMovies(['movies'], () => fetchTrendingMovies())
    const {data:upcomingMovies} = useMovies(['movies', 'upcoming'], () => fetchUpcoming())
    const {data:topRatedMovies} = useMovies(['movies', 'topRated'], () => fetchTopRated())

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    return (
        <View className='flex-1 bg-neutral-700'>
            <ModalCheckVersion />
            <SafeAreaView className={ios ? '-mb-2' : '-mb-3'}>
                <StatusBar style='dark' />
                <View className='flex-row items-center justify-between px-4 py-6 md:py-8'>
                    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                        <Bars3CenterLeftIcon size={24} color='white' strokeWidth={2} />
                    </TouchableOpacity>
                    <Text className='text-white font-bold text-2xl' style={styles.secondaryText}>
                        <Text style={styles.text}>Flix</Text>Finder
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size={24} color='white' strokeWidth={2} />
                    </TouchableOpacity>
                </View>
                <View>
                </View>
            </SafeAreaView>

            {
                isLoading
                    ?
                    <LoadingC />
                    :
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 10 }}

                    >

                        {/* Carrusel Trending Movies */}
                        {trendingMovies && <TrendingMovies data={trendingMovies} />}
                        {/* Upcoming Movies */}
                        {upcomingMovies && <MovieList title="Upcoming Movies" data={upcomingMovies} typeListMovie='upcoming' />} 
                        {/* Top Rated Movies */}
                        {topRatedMovies && <MovieList title="Top Rated Movies" data={topRatedMovies} typeListMovie='topRated' />}
                    </ScrollView>
            }


        </View>
    )
}

export default HomeScreen