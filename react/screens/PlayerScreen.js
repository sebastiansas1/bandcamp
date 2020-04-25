import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { Slider } from 'react-native-elements';
import TrackPlayer from 'react-native-track-player';

import { Icon, Typography } from '../components';
import Playlist from '../player/Playlist';
import Player from '../player/Player';
import styles from './styles/PlayerScreenStyles';
import colors from '../consts/colors';
import { convertToTime } from '../utils/StringUtility';


export default function PlayerScreen() {
  const [isPlaying, setIsPlaying] = useState(Player.state === "play");
  const [isSeeking, setIsSeeking] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(Date.now());
  const [updateInterval, setUpdateInterval] = useState(null);
  const { artwork, title, artist } = Playlist.currentTrack;

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
    if (!artwork) return;
    Player.next();
  };

  const skipPrev = () => {
    if (!artwork) return;
    Player.previous();
  };


  const getDuration = async () => {
    const dur = await TrackPlayer.getDuration();
    setDuration(dur);
  };

  const getPosition = async () => {
    const pos = await TrackPlayer.getPosition();
    setPosition(pos);
  };

  const onSeeking = (wtf) => {
    console.log(wtf);
  };

  const onSeekingStart = () => {
    setIsSeeking(true);
  };

  const onSeekComplete = async (pos) => {
    setIsSeeking(false);
    await TrackPlayer.seekTo(pos);
    await getPosition();
  };

  useEffect(() => {
    getDuration();
    getPosition();
    setUpdateInterval(setInterval(() => setDate(Date.now()), 1000));
  }, []);

  useEffect(() => {
    if (!isSeeking) {
      getPosition();
    };
    () => {
      clearInterval(updateInterval);
    };
  }, [date]);

  const activeColor = duration && colors.white || colors.lightGray;

  return (
    <View style={styles.mainContainer}>
      {/* <Typography style={styles.header} text={title} tag="h1" /> */}
      <View style={{ ...styles.trackImageContainer }}>
        <Image source={{ uri: artwork }} style={{ ...styles.trackImage }} />
      </View>
      <View style={styles.musicInfo}>
        <Typography text={title} maxChar={40} style={{ ...styles.trackName, fontSize: 15, color: colors.white, fontWeight: "700" }} />
        <Typography text={artist} maxChar={40} style={{ ...styles.trackName, fontSize: 13, color: colors.light }} />
      </View>
      <View style={styles.seekBar}>
        <Slider
          maximumValue={duration}
          onValueChange={onSeeking}
          onSlidingStart={onSeekingStart}
          onSlidingComplete={onSeekComplete}
          value={position}
          minimumTrackTintColor={duration && colors.light || "transparent"}
          maximumTrackTintColor={colors.lightGray}
          thumbTouchSize={{ width: 50, height: 50 }}
          trackStyle={styles.seekBarTrack}
          thumbTintColor={duration && colors.white || "transparent"}
        />
        <View style={styles.trackTimesContainer}>
          <Typography text={convertToTime(position)} style={styles.trackTime} />
          <Typography text={"-" + convertToTime(duration - position)} style={styles.trackTime} />
        </View>
      </View>
      <View style={styles.mediaControls}>
        <Icon name="skip-previous" onPress={skipPrev} color={activeColor} style={styles.skipBtns} size={45} />
        {isPlaying && <Icon name="pause-circle-filled" onPress={pauseMusic} color={activeColor} style={styles.playPauseBtns} size={75} />}
        {!isPlaying && <Icon name="play-circle-filled" onPress={playMusic} color={activeColor} style={styles.playPauseBtns} size={75} />}
        <Icon name="skip-next" onPress={skipNext} color={activeColor} style={styles.skipBtns} size={45} />
      </View>
    </View>
  );
}
