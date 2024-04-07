import { View, Text, TouchableOpacity, Dimensions, Image, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
const { height, width } = Dimensions.get('window');
const ios = Platform.OS === 'ios'
const topMargin = ios ? '' : 'mt-3'

export default function FavoritesScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const moviesExample: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    return (
        <View className='flex-1 bg-neutral-900'
        >
            <View className='w-full'>
                <SafeAreaView className={'w-full flex-row justify-between items-center px-4 mx-0 ' + topMargin} >
                    <TouchableOpacity className='p-1 rounded-3xl' onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size="24" color='#387ADF' strokeWidth={2} />
                    </TouchableOpacity>
                    <View>
                        <Text className='text-white'>13 Favorites</Text>
                    </View>
                </SafeAreaView>
            </View>
            <View>
                <FlatList
                    data={moviesExample}
                    keyExtractor={(item) => item.toString()}
                    numColumns={Math.floor(width / (width * 0.45 + 10))}
                    renderItem={({ item }) =>
                        <TouchableWithoutFeedback>
                            <View className='items-center m-3'>
                                <Image
                                    source={require('../assets/images/imagePoster2.jpg')}
                                    style={{ width: width * 0.45, height: height * 0.3 }}
                                    className='rounded-2xl'
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    }
                />
            </View>
        </View>

    )
}