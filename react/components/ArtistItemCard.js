import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import Typography from './Typography';
import styles from './styles/ArtistItemCardStyles';

export default function ArtistItemCard({ id, imageUrl, imageSize, title, subtitle, paragraph, onPress, endSlot }) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={() => onPress(id)}>
      <Image width={20} source={{ uri: imageUrl }} style={{ ...styles.image, width: imageSize, height: imageSize }} />
      <View style={{ ...styles.header, height: imageSize }}>
        <Typography maxChar={25} style={styles.title} text={title} tag="h2" />
        <Typography maxChar={40} style={styles.subtitle} text={subtitle} tag="p" />
        <Typography maxChar={40} style={styles.paragraph} text={paragraph} tag="p" />
      </View>
      {endSlot}
    </TouchableOpacity>
  );
}
