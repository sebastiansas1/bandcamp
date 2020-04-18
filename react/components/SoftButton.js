import React from 'react';

import { View, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../consts/colors';
import styles from './styles/SoftButtonStyles';

export default function SoftButton({ children, onPress, loading, style }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.85} style={styles.button} onPress={onPress}>
        {!loading && children}
        {loading && <ActivityIndicator color={colors.white} />}
      </TouchableOpacity>
    </View>
  );
}
