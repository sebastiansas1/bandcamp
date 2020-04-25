import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

export default function Icon({ name, color, size, style, onPress, vendor }) {
  switch (vendor) {
    case "material":
      return <MaterialIcon name={name} color={color} size={size} style={style} onPress={onPress} />;
    case "fontisto":
      return <Fontisto name={name} color={color} size={size} style={style} onPress={onPress} />;
    default:
      return <MaterialIcon name={name} color={color} size={size} style={style} onPress={onPress} />;
  }
}
