import React from 'react';
import { View } from 'react-native';

import Icon from './Icon';
import styles from './styles/MediaControlsStyles';

export default function MediaControls({
  onSkipNext,
  onSkipPrevious,
  onPlay,
  onPause,
  onQueue,
  onLike,
  activeColor,
  isPlaying
}) {
  return (
    <View style={styles.container}>
      <Icon
        name="ios-heart-empty"
        onPress={onLike}
        color={activeColor}
        style={styles.sideBtns}
        size={30}
        vendor="ionicons"
      />
      <Icon name="skip-previous" onPress={onSkipPrevious} color={activeColor} style={styles.sideBtns} size={35} />
      {isPlaying && (
        <Icon name="pause-circle-filled" onPress={onPause} color={activeColor} style={styles.playPauseBtns} size={75} />
      )}
      {!isPlaying && (
        <Icon name="play-circle-filled" onPress={onPlay} color={activeColor} style={styles.playPauseBtns} size={75} />
      )}
      <Icon name="skip-next" onPress={onSkipNext} color={activeColor} style={styles.sideBtns} size={35} />
      <Icon
        name="ios-albums"
        onPress={onQueue}
        color={activeColor}
        style={styles.sideBtns}
        size={30}
        vendor="ionicons"
      />
    </View>
  );
}
