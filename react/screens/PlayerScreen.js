import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import Typography from '../components/Typography';
import styles from './styles/PlayerScreenStyles';

import TrackPlayer from 'react-native-track-player';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../consts/colors';

// TrackPlayer.setupPlayer().then(() => {
//   // The player is ready to be used
// });

// const track = {
//   id: '#1',
//   url: 'https://t4.bcbits.com/stream/d165e9d785c66fa9e99531c22fb5b630/mp3-128/2758497599?p=0&ts=1587317625&t=4d8bcdc613c68df9e6a38b03577ad60fcf98157f&token=1587317625_0018b2563b884a978f56d2b9cd14aa39dca33a38', // Load media from the network

//   title: 'Avaritia',
//   artist: 'deadmau5',
//   album: 'while(1<2)',
//   genre: 'Progressive House, Electro House',
//   date: '2014-05-20T07:00:00+00:00', // RFC 3339
//   artwork: 'https://en.wikipedia.org/wiki/Avaritia_(instrumental)#/media/File:Avaritia-album-artwork.jpg',
// };


// TrackPlayer.add([track]).then(function () {
//   // The tracks were added
// });

export default function PlayerScreen() {
  const [player, setPlayer] = useState(null);

  const getPlayerState = async () => {
    const data = await TrackPlayer.getState();
    setPlayer(data);
  }

  useEffect(() => {
    getPlayerState();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Typography style={styles.header} text="Player" tag="h1" />
      <TouchableOpacity onPress={() => TrackPlayer.play()}>
        <View style={{ alignSelf: "center", marginTop: 200 }}><Text style={{ color: colors.white, fontSize: 50, fontWeight: "700" }}>PLAY</Text></View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => TrackPlayer.pause()}>
        <View style={{ alignSelf: "center", marginTop: 100 }}><Text style={{ color: colors.white, fontSize: 50, fontWeight: "700" }}>PAUSE</Text></View>
      </TouchableOpacity>
    </View>
  );
}
