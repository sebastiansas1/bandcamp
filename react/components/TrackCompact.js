import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import colors from '../consts/colors';
import Typography from './Typography';
import styles from './styles/TrackCompactStyles';
import Icon from './Icon';

export default function TrackCompact({ index, track, artist, onPressPlay, onPressQueue, isPlaying, isQueued }) {
  const { title } = track;

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onPressPlay}>
      <Typography
        maxChar={2}
        style={{
          ...styles.artist,
          alignSelf: 'center',
          width: 15,
          color: isPlaying ? colors.blue : colors.lightGray
        }}
        text={index}
        tag="h2"
      />
      <View style={{ ...styles.header, height: 35 }}>
        <Typography
          maxChar={35}
          style={{ ...styles.title, color: isPlaying ? colors.blue : colors.white }}
          text={title}
          tag="h2"
        />
        <Typography maxChar={25} style={styles.artist} text={artist} tag="h2" />
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
