import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { truncateText } from '../utils/truncateText';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';

interface Props {
  cast: number[],
  navigation: NativeStackNavigationProp<ParamListBase>
}

export default function Cast({ cast, navigation }: Props) {
  const realName = 'Robert Downey Jr';
  const characterName = 'Ironman';

  return (
    <View className="my-6 px-4">
      <Text className="text-white text-lg mb-4">Cast</Text>
      <FlatList
        horizontal
        data={cast}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Person')}>
              <Image
                className="w-24 h-32 rounded-xl"
                source={require('../assets/images/imagePoster3.jpg')}
              />
              <Text className="text-white text-sm">{truncateText(realName)}</Text>
              <Text className="text-white text-sm">{truncateText(characterName)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
