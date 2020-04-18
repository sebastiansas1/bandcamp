import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default function Icon({ name, color, size, style, onPress }) {
  return <MaterialIcon name={name} color={color} size={size} style={style} onPress={onPress} />;
}
