import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, TouchableWithoutFeedback, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import { Dimensions } from 'react-native';
import { truncateText } from '../utils/truncateText';
import LoadingC from '../components/LoadingC';
import { debounce } from 'lodash';
import { fetchMoviesByTitle } from '../services/actions';
import { Result } from '../interfaces/Movies';
import { image342 } from '../services/api/movies';

const { height, width } = Dimensions.get('window');
export default function SearchScreen() {

    const [results, setResults] = useState<Result[]>();
    const [results2, set2] = useState([12345,23,45,]);
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [loading, setLoading] = useState<boolean>(false)

    const handleTextChange = async (text: string) => {
        if(text.length>2){
            setLoading(true)
            fetchMoviesByTitle(text).then(data => setResults(data.results)).finally(() => setLoading(false))
        }
    }
    const handleTextDebounce = useCallback(debounce(handleTextChange, 450), []);


    return (
        <SafeAreaView className='flex-1 bg-neutral-900'>
            <View className='flex-row items-center mx-4 mb-3 justify-between '>
                <TextInput
                    className='bg-neutral-800 p-3 text-white rounded-3xl flex-1'
                    placeholder='Search'
                    placeholderTextColor='white'
                    onChangeText={handleTextDebounce}
                />
                <TouchableOpacity className='bg-neutral-800 rounded-full p-3' onPress={() => navigation.goBack()}>
                    <XMarkIcon size={24} color='white' />
                </TouchableOpacity>
            </View>

            
            {loading ? (<LoadingC/>)  
            : 
            results && results.length > 0
                    ?
                    (<View className='flex-1 h-full overflow-y-scrol mb-3'>
                        <Text className='text-white mx-6'>Results: ({results.length})</Text>
                        <View className='justify-center items-center'>
                            {/* FlatList */}
                            <FlatList
                                data={results}
                                renderItem={({ item }) => (
                                    <TouchableWithoutFeedback
                                        onPress={() => navigation.navigate('Movie', { item })}>
                                        <View className='items-center m-3'>
                                            <Image
                                                className='rounded-2xl'
                                                source={{ uri: image342(item.poster_path) }}
                                                style={{ width: width * 0.40, height: height * 0.30 }}
                                            />
                                            <Text className='text-neutral-300'>{truncateText(item.title, 22)}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )}
                                keyExtractor={item => item.id.toString()}
                                numColumns={Math.floor(width / (width * 0.45 + 10))}
                            />
                        </View>
                    </View>)
                    :
                    (
                        <View className='flex-1 justify-center items-center'>
                            <Text className='text-white'>No results found</Text>
                            <Text className='text-neutral-400'>Try another search</Text>
                            <Image
                                className='rounded-2x mt-3'
                                source={require('../assets/images/popcorn.png')}
                                style={{ width: width * 0.40, height: height * 0.30 }}
                            />
                        </View>
                    )
            }
        </SafeAreaView>
    )
}
