import React, { useState, useEffect, useContext } from 'react';
import { View, Image } from 'react-native';
import { Slider } from 'react-native-elements';
import TrackPlayer from 'react-native-track-player';

import { Icon, Typography } from '../components';
import styles from './styles/PlayerScreenStyles';
import colors from '../consts/colors';
import { convertToTime } from '../utils/StringUtility';
import { PlayerContext, PlaylistContext } from '../context';

export default function PlayerScreen() {
  const Player = useContext(PlayerContext);
  const Playlist = useContext(PlaylistContext);
  const [isPlaying, setIsPlaying] = useState(Player.status === 'playing');
  const [isSeeking, setIsSeeking] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(Date.now());
  const [updateInterval, setUpdateInterval] = useState(null);
  const { artwork, title, artist } = Playlist.current;

  const playMusic = () => {
    if (!artwork) return;
    Player.play();
    setIsPlaying(true);
  };

  const pauseMusic = () => {
    if (!artwork) return;
    Player.pause();
    setIsPlaying(false);
  };

  const skipNext = () => {
    if (!artwork || !Playlist.hasNext()) return;
    Player.next();
  };

  const skipPrev = () => {
    if (!artwork) return;
    const secondsStarted = Number(convertToTime(position).slice(3, 5));
    if (secondsStarted > 5) {
      TrackPlayer.seekTo(0);
      return;
    }
    if (Playlist.hasPrevious()) {
      Player.previous();
    }
  };

  const getDuration = async () => {
    const dur = await TrackPlayer.getDuration();
    setDuration(dur);
  };

  const getPosition = async () => {
    const pos = await TrackPlayer.getPosition();
    setPosition(pos);
  };

  const onSeeking = pos => {
    setPosition(pos);
  };

  const onSeekingStart = () => {
    setIsSeeking(true);
  };

  const onSeekComplete = async pos => {
    setIsSeeking(false);
    await TrackPlayer.seekTo(pos);
    await getPosition();
  };

  useEffect(() => {
    getDuration();
    getPosition();
    setUpdateInterval(setInterval(() => setDate(Date.now()), 1000));
    setIsPlaying(Player.status === 'playing');
  }, []);

  useEffect(() => {
    if (!isSeeking) {
      getPosition();
    }
    () => {
      return clearInterval(updateInterval);
    };
  }, [date]);

  const activeColor = (duration && colors.white) || colors.lightGray;

  return (
    <View style={styles.mainContainer}>
      <View style={{ ...styles.trackImageContainer }}>
        <Image source={{ uri: artwork }} style={{ ...styles.trackImage }} />
      </View>
      <View style={styles.musicInfo}>
        <Typography
          text={title}
          maxChar={40}
          style={{ ...styles.trackName, fontSize: 15, color: colors.white, fontWeight: '700' }}
        />
        <Typography text={artist} maxChar={40} style={{ ...styles.trackName, fontSize: 13, color: colors.light }} />
      </View>
      <View style={styles.seekBar}>
        <Slider
          maximumValue={duration}
          onValueChange={onSeeking}
          onSlidingStart={onSeekingStart}
          onSlidingComplete={onSeekComplete}
          value={position}
          minimumTrackTintColor={(duration && colors.light) || 'transparent'}
          maximumTrackTintColor={colors.lightGray}
          thumbStyle={
            isSeeking ? { width: 25, height: 25, borderRadius: 500 } : { width: 15, height: 15, borderRadius: 500 }
          }
          trackStyle={styles.seekBarTrack}
          thumbTintColor={(duration && colors.white) || 'transparent'}
        />
        <View style={styles.trackTimesContainer}>
          <Typography text={convertToTime(position)} style={styles.trackTime} />
          <Typography text={'-' + convertToTime(duration - position)} style={styles.trackTime} />
        </View>
      </View>
      <View style={styles.mediaControls}>
        {/* <Icon name="queu" onPress={skipNext} color={activeColor} style={styles.skipBtns} size={35} /> */}
        <Icon name="skip-previous" onPress={skipPrev} color={activeColor} style={styles.skipBtns} size={35} />
        {isPlaying && (
          <Icon
            name="pause-circle-filled"
            onPress={pauseMusic}
            color={activeColor}
            style={styles.playPauseBtns}
            size={75}
          />
        )}
        {!isPlaying && (
          <Icon
            name="play-circle-filled"
            onPress={playMusic}
            color={activeColor}
            style={styles.playPauseBtns}
            size={75}
          />
        )}
        <Icon name="skip-next" onPress={skipNext} color={activeColor} style={styles.skipBtns} size={35} />
        {/* <Icon name="skip-next" onPress={skipNext} color={activeColor} style={styles.skipBtns} size={35} /> */}
      </View>
    </View>
  );
}
