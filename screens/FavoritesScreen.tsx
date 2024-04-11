import React, { useEffect, useState } from 'react';
import {Dimensions,FlatList,Image,Platform,RefreshControl,Text,View} from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { Result } from '../interfaces/Movies';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { image342 } from '../services/api/movies';
import { truncateText } from '../utils/truncateText';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height, width } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const topMargin = ios ? '' : 'mt-3';
export default function FavoritesScreen() {    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [refreshing, setRefreshing] = React.useState(false);
    const [favoriteMovies, setFavoriteMovies] = useState<Result[]>([]);
    const getFavoritesMovies = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('movies');
            return jsonValue ? JSON.parse(jsonValue) : [];
        } catch (e) {
            console.log(e);
            return [];
        }
    };

    const fetchData = React.useCallback(async () => {
        const movies = await getFavoritesMovies();
        setFavoriteMovies(movies);
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchData();
        setRefreshing(false);
    }, [fetchData]);

    useEffect(() => {
        fetchData();
    }, [AsyncStorage.getItem('movies')]);


    return (
        <View className='flex-1 bg-neutral-700'>
        <View className='w-full'>
            <SafeAreaView className={'w-full flex-row justify-between items-center px-4 mx-0 ' + topMargin}>
                <TouchableOpacity className='p-1 rounded-3xl' onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size="24" color='#387ADF' strokeWidth={2} />
                </TouchableOpacity>
                <View>
                    <Text className='text-white'>{favoriteMovies.length} Favorites</Text>
                </View>
            </SafeAreaView>
        </View>

            <View className='justify-center items-center pb-16'>
                <FlatList
                    numColumns={Math.floor(width / (width * 0.45 + 10))}
                    data={favoriteMovies}
                    renderItem={({ item }) => (
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Movie', { item })}>
                            <View className='items-center m-2'>
                                <Image
                                    source={{ uri: image342(item.poster_path) }}
                                    className='rounded-2xl'
                                    style={{ width: width * 0.43, height: height * 0.28 }} />
                                <Text className='text-neutral-300'>{truncateText(item.title)}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                    keyExtractor={(item) => item.id.toString()} refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#387ADF']} />
                    }
                />

            </View>

        </View>
    );
};

