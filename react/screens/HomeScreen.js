import React from 'react';
import { View } from 'react-native';
import Typography from '../components/Typography';

import styles from './styles/HomeScreenStyles';

export default function HomeScreen() {
  return (
    <View style={styles.mainContainer}>
      <Typography style={styles.header} text="Home" tag="h1" />
      <View style={styles.middleContainer}></View>
    </View>
  );
}
