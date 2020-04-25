import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Typography from '../components/Typography';
import Playlist from '../player/Playlist';
import styles from './styles/PlayerScreenStyles';
import colors from '../consts/colors';
import Animated, { Easing } from 'react-native-reanimated';


export default function PlayerScreen() {
  const rotate = useRef(new Animated.Value(0)).current;
  rotate.setValue(0);
  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 360]
  });

  const { artwork } = Playlist.currentTrack;

  useEffect(() => {
    Animated.timing(rotate, {
      toValue: 1,
      easing: Easing.linear,
      duration: 80000,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Typography style={styles.header} text="Player" tag="h1" />
      <View style={{ ...styles.trackImageContainer }}>
        <Animated.Image source={{ uri: artwork, height: 90, width: 90 }} style={{ ...styles.trackImage, transform: [{ rotate: spin }] }} />
        <View style={{ width: 10, height: 10, position: "absolute", backgroundColor: colors.white, alignSelf: "center", top: "48%", borderRadius: 50 }} />
      </View>
      <TouchableOpacity onPress={() => {
        rotate.setValue(0);
        Animated.timing(rotate, {
          toValue: 1,
          easing: Easing.linear,
          duration: 80000,
          useNativeDriver: true
        }).start();
        TrackPlayer.play();
      }}>
        <View style={{ alignSelf: "center", marginTop: 200 }}><Text style={{ color: colors.white, fontSize: 50, fontWeight: "700" }}>PLAY</Text></View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        rotate.setValue(0);
        TrackPlayer.pause();
      }
      }>
        <View style={{ alignSelf: "center", marginTop: 100 }}><Text style={{ color: colors.white, fontSize: 50, fontWeight: "700" }}>PAUSE</Text></View>
      </TouchableOpacity>
    </View>
  );
}
