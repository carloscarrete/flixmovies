import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { truncateText } from '../utils/truncateText';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { CastElement } from '../interfaces/Cast';
import { image342 } from '../services/api/movies';

interface Props {
  cast: CastElement[]
  navigation: NativeStackNavigationProp<ParamListBase>
}

export default function Cast({ cast, navigation }: Props) {

  //console.log(JSON.stringify(cast[3], null, 3))

  const acting = cast.filter((cast) => cast.known_for_department === 'Acting' );
  //console.log(acting.length)
  const realName = 'Robert Downey Jr';
  const characterName = 'Ironman';
  return (
    <View className="my-6 px-4">
      <Text className="text-white text-lg mb-4">Cast</Text>
      <FlatList
        horizontal
        data={cast}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Person', { item})}>
            <Image
              className="w-24 h-32 rounded-xl"
              source={{ uri: item.profile_path ? image342(item.profile_path) : 'https://via.placeholder.com/342x512' }}
            />
            <Text className="text-white text-sm">{truncateText(item.name)}</Text>
            <Text className="text-slate-500 text-xs">{truncateText(item.character || '')}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
