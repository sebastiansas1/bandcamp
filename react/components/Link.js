import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import colors from '../consts/colors';

export default function Link({ text, onPress, color }) {
  return (
    <TouchableOpacity style={{ alignSelf: 'flex-start' }} onPress={onPress}>
      <Text style={{ color: colors.blue, fontSize: 14, ...color }}>{text}</Text>
    </TouchableOpacity>
  );
}
