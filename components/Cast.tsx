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
              className="w-24 h-32 rounded-xl mr-2"
              source={item.profile_path ? { uri: image342(item.profile_path) } : require('../assets/images/noImage.png')}
            />
            <Text className="text-white text-sm text-center">{truncateText(item.name)}</Text>
            <Text className="text-slate-500 text-xs text-center">{truncateText(item.character || '')}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
