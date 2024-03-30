import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'

interface Props {
    item: number
}

export default function MovieCard({item}:Props) {
  return (
    <View>
      <TouchableWithoutFeedback>
        <Text>Movie</Text>
      </TouchableWithoutFeedback>
    </View>
  )
}