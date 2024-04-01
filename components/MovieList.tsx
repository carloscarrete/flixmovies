import { View, Text, TouchableOpacity, ScrollView, FlatList, Image, Dimensions } from 'react-native'
import React from 'react'
import { styles } from '../theme'
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/';
import { truncateText } from '../utils/truncateText';

const { height, width } = Dimensions.get('window');

interface Props {
  title: string,
  data: number[],
  hiddenAll?: boolean
}

export default function MovieList({ data, title, hiddenAll=false }: Props) {

  const movieName = 'Gladiador - prueba de película';

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View className='mb-8 space-y-4'>
      <View className='mx-4 flex-row justify-between items-center'>
        <Text className='text-white text-xl'>{title}</Text>
        <TouchableOpacity>
          {hiddenAll ? null : <Text className='text-xl' style={styles.secondaryText}>See All</Text>}
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Movie')}>
            <View className='space-y-1 mr-1'>
              <Image
                className='rounded-3xl'
                source={require('../assets/images/imagePoster2.jpg')}
                style={{
                  width: width * 0.33,
                  height: height * 0.22
                }
                }
              />
              <Text className='text-white ml-1'>
                {truncateText(movieName)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </View>
  )
}