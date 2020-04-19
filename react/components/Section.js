import React from 'react';

import styles from './styles/SectionStyles';
import { View, Text } from 'react-native';

export default function Section({ title, children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{title}</Text>
      {children}
    </View>
  );
}
