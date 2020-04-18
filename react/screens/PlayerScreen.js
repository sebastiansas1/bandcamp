import React from 'react';
import { View } from 'react-native';

import Typography from '../components/Typography';
import styles from './styles/PlayerScreenStyles';

export default function PlayerScreen() {
  return (
    <View style={styles.mainContainer}>
      <Typography style={styles.header} text="Player" tag="h1" />
    </View>
  );
}
