import React from 'react';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';

import colors from '../consts/colors';
import Typography from './Typography';
import styles from './styles/TrackCompactStyles';
import { convertToTime } from '../utils/StringUtility';

export default function TrackCompact({ index, track, artist, onPress, isPlaying }) {
  const { title, duration } = track;
  const paragraph = convertToTime(duration);

  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onPress}>
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
        <Typography maxChar={40} style={styles.paragraph} text={paragraph} tag="p" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
