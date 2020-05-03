import React from 'react';
import { View } from 'react-native';
import { Slider } from 'react-native-elements';

import colors from '../consts/colors';
import styles from './styles/SeekBarStyles';
import Typography from './Typography';
import { convertToTime } from '../utils/StringUtility';

export default function SeekBar({ onSeek, onSeekStart, onSeekComplete, isSeeking, position, duration }) {
  return (
    <View style={styles.container}>
      <Slider
        maximumValue={duration}
        onValueChange={onSeek}
        onSlidingStart={onSeekStart}
        onSlidingComplete={onSeekComplete}
        value={position}
        minimumTrackTintColor={(duration && colors.light) || 'transparent'}
        maximumTrackTintColor={colors.lightGray}
        thumbStyle={
          isSeeking ? { width: 25, height: 25, borderRadius: 500 } : { width: 15, height: 15, borderRadius: 500 }
        }
        thumbTintColor={(duration && colors.white) || 'transparent'}
      />
      <View style={styles.trackTimesContainer}>
        <Typography text={duration !== 0 && convertToTime(position)} style={styles.trackTime} />
        <Typography text={duration !== 0 && '-' + convertToTime(duration - position)} style={styles.trackTime} />
      </View>
    </View>
  );
}
