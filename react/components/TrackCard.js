import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import Typography from './Typography';
import styles from './styles/TrackCardStyles';
import Icon from './Icon';
import colors from '../consts/colors';
import { convertToTime } from '../utils/StringUtility';

export default function TrackCard({ track, onPressPlay, onPressQueue, isPlaying, isQueued }) {
  const { title, raw, imageUrl } = track;
  const subtitle = raw.current['publish_date'].slice(3, 11);
  const paragraph = `Duration: ${convertToTime(raw.trackinfo[0].duration)}`;

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onPressPlay}>
      <Image width={20} source={{ uri: imageUrl }} style={{ ...styles.image, width: 55, height: 55 }} />
      <View style={{ ...styles.header, height: 55 }}>
        <Typography maxChar={25} style={styles.title} text={title} tag="h2" />
        <Typography maxChar={40} style={styles.subtitle} text={subtitle} tag="p" />
        <Typography maxChar={40} style={styles.paragraph} text={paragraph} tag="p" />
      </View>
      <Icon
        name={isPlaying ? 'play-circle-filled' : 'playlist-add'}
        color={isQueued && !isPlaying ? colors.lightBlue : colors.white}
        size={25}
        onPress={onPressQueue}
        style={{ alignSelf: 'center', position: 'absolute', right: 0 }}
      />
    </TouchableOpacity>
  );
}
