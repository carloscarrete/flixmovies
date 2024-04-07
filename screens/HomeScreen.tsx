import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { View, Text, Platform, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { styles } from '../theme/'

import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/MovieList'
import { DrawerActions, ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Loading from '../components/LoadingC';
import LoadingC from '../components/LoadingC'
import { fetchNowPlaying, fetchPopularMovies, fetchTopRated, fetchTrendingMovies, fetchUpcoming, } from '../services/actions'
import { Movies, Result } from '../interfaces/Movies'

const ios = Platform.OS === 'ios'

const HomeScreen = () => {

    const [trendingMovies, setTrendingMovies] = useState<Result[]>();
    const [upcomingMovies, setUpcominngMovies] = useState<Result[]>();
    const [topRatedMovies, setTopRatedMovies] = useState<Result[]>();

    const [loading, setLoading] = useState<boolean>(true)

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getRatedMovies();
        /*   getNowPlayingMovies();
          getPopularMovies(); */
    }, [])

    /* Get movies */
    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        if (data && data.results.length > 0) setTrendingMovies(data.results)
        setLoading(false)
        return data
    }

    const getUpcomingMovies = async () => {
        const data = await fetchUpcoming();
        if (data && data.results.length > 0) setUpcominngMovies(data.results)
        return data
    }

    const getRatedMovies = async () => {
        const data = await fetchTopRated();
        if (data && data.results.length > 0) setTopRatedMovies(data.results)
        return data
    }

    const getNowPlayingMovies = async () => {
        const data = await fetchNowPlaying();
        if (data && data.results.length > 0) setTrendingMovies(data.results)
        return data
    }

    const getPopularMovies = async () => {
        const data = await fetchPopularMovies();
        if (data && data.results.length > 0) setTrendingMovies(data.results)
        return data
    }

    return (
        <View className='flex-1 bg-neutral-700'>
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
                loading
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
                        {upcomingMovies && <MovieList title="Upcoming Movies" data={upcomingMovies} />}
                        {/* Top Rated Movies */}
                        {topRatedMovies && <MovieList title="Top Rated Movies" data={topRatedMovies} />}

                    </ScrollView>
            }


        </View>
    )
}

export default HomeScreen