import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import Typography from './Typography';
import styles from './styles/TrackCardStyles';
import Icon from './Icon';
import colors from '../consts/colors';

export default function TrackCard({ track, onPress, isPlaying }) {
  const { title, raw, imageUrl } = track;
  const subtitle = raw.current['publish_date'].slice(3, 11);
  const paragraph = `Duration: ${convertInMinutes(raw.trackinfo[0].duration)}`;

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onPress}>
      <Image width={20} source={{ uri: imageUrl }} style={{ ...styles.image, width: 55, height: 55 }} />
      <View style={{ ...styles.header, height: 55 }}>
        <Typography maxChar={25} style={styles.title} text={title} tag="h2" />
        <Typography maxChar={40} style={styles.subtitle} text={subtitle} tag="p" />
        <Typography maxChar={40} style={styles.paragraph} text={paragraph} tag="p" />
      </View>
      <Icon
        name={isPlaying ? "play-circle-filled" : "play-circle-outline"}
        color={colors.white}
        size={25}
        onPress={onPress}
        style={{ alignSelf: 'center', position: 'absolute', right: 10 }}
      />
    </TouchableOpacity>
  );
}

const convertInMinutes = (value) => {
  const duration = String(value);
  const timeInDecimals = String(duration.slice(0, duration.indexOf('.')) / 60);
  let seconds = Math.round(timeInDecimals.slice(timeInDecimals.indexOf('.')) * 60);
  if (seconds < 10) seconds = `0${seconds}`;
  return timeInDecimals.slice(0, timeInDecimals.indexOf('.')) + ':' + seconds;
};