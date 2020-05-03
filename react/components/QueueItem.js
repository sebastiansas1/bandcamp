import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

import colors from '../consts/colors';
import Typography from './Typography';
import styles from './styles/QueueItemStyles';
import Icon from './Icon';

export default function QueueItem({ track, onPlay, onRemove }) {
  const { title, artwork, artist } = track;

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onPlay}>
      {onRemove && (
        <Icon
          name={'ios-close-circle'}
          color={colors.white}
          size={25}
          onPress={onRemove}
          vendor="ionicons"
          style={styles.removeIcon}
        />
      )}
      <Image source={{ uri: artwork }} style={styles.image} />
      <View style={styles.header}>
        <Typography maxChar={27} style={styles.title} text={title} tag="h2" />
        <Typography maxChar={25} style={styles.artist} text={artist} tag="h2" />
      </View>
      <Icon
        name={'ios-reorder'}
        color={colors.white}
        size={25}
        vendor="ionicons"
        style={{ alignSelf: 'center', position: 'absolute', right: 5 }}
      />
    </TouchableOpacity>
  );
}
