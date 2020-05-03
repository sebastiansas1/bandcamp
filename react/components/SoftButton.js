import React from 'react';

import { View, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../consts/colors';
import styles from './styles/SoftButtonStyles';

export default function SoftButton({ children, onPress, loading, style, buttonStyles }) {
  return (
    <View style={{ ...styles.container, ...style }}>
      <TouchableOpacity activeOpacity={0.85} style={{ ...styles.button, ...buttonStyles }} onPress={onPress}>
        {!loading && children}
        {loading && <ActivityIndicator color={colors.white} />}
      </TouchableOpacity>
    </View>
  );
}
