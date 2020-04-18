import React from 'react';

import { View, Image, TouchableOpacity } from 'react-native';
import Typography from './Typography';
import colors from '../consts/colors';
import Icon from './Icon';
import styles from './styles/SearchResultCardStyles';

export default function SearchResultCard({ id, imageUrl, title, subtitle, paragraph, onPress, roundImage }) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={() => onPress(id)}>
      <Image width={20} source={{ uri: imageUrl }} style={{ ...styles.image, borderRadius: roundImage ? 50 : 0 }} />
      <View style={styles.header}>
        <Typography maxChar={25} style={styles.title} text={title} tag="h2" />
        <Typography maxChar={40} style={styles.subtitle} text={subtitle} tag="p" />
        <Typography maxChar={40} style={styles.paragraph} text={paragraph} tag="p" />
      </View>
      <Icon name="chevron-right" color={colors.white} size={25} style={styles.arrowIcon} />
    </TouchableOpacity>
  );
}
