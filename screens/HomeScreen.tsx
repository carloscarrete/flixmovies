import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { View, Text, Platform, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { styles } from '../theme/'

import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/MovieList'

const ios = Platform.OS === 'ios'

const HomeScreen = () => {

    const [trendingMovies, setTrendingMovies] = useState([1,2,3]);
    const [upcomingMovies, setUpcominngMovies] = useState([1,2,3]);
    const [topRated, setTopRared] = useState([1,2,3]);

    return (
        <View className='flex-1 bg-neutral-700'>
            <SafeAreaView className={ios ? '-mb-2' : '-mb-3'}>
                <StatusBar style='dark' />
                <View className='flex-row items-center justify-between px-4 py-6 md:py-8'>
                    <Bars3CenterLeftIcon size={24} color='white' strokeWidth={2} />
                    <Text className='text-white font-bold text-2xl' style={styles.secondaryText}>
                        <Text style={styles.text}>Flix</Text>Finder
                    </Text>
                    <MagnifyingGlassIcon size={24} color='white' strokeWidth={2} />
                </View>
                <View>
                </View>
            </SafeAreaView>
            
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 10}}
                
            >

                {/* Carrusel Trending Movies */}
                <TrendingMovies data={trendingMovies}/>
                {/* Upcoming Movies */}
                <MovieList title="Upcoming Movies" data={upcomingMovies} />
                {/* Top Rated Movies */}
                <MovieList title="Top Rated Movies" data={topRated} />
                
            </ScrollView>
        </View>
    )
}

export default HomeScreen