import React, { useEffect, useState } from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

import { ArtistScreenNav } from '../components';
import styles from './styles/AlbumScreenStyles';
import Player from '../player/Player';
import Playlist from '../player/Playlist';
import TrackCompact from '../components/TrackCompact';
import colors from '../consts/colors';

const OPACITY_HEIGHT = 1.3;

export default function AlbumScreen({ route, navigation: { navigate } }) {
  const { title: albumName, artist, imageUrl, raw } = route.params;
  const [tracks, setTracks] = useState([]);
  const [playables, setPlayables] = useState([]);
  const [current, setCurrent] = useState({ track: Playlist.current, isPlaying: Player.state === "play" });
  const [scrollHeight, setScrollHeight] = useState(0);
  const [opacity, setOpacity] = useState({ album: 1, header: 0 });

  useEffect(() => {
    setOpacity({
      album: (OPACITY_HEIGHT - Math.abs(scrollHeight)),
      header: -(OPACITY_HEIGHT - scrollHeight)
    });
  }, [scrollHeight, current]);

  useEffect(() => {
    const trackInfo = raw.trackinfo;
    setTracks(trackInfo.map((track) => transformToTrack(track)));
    setPlayables(trackInfo.map((track) => transformToPlayable(track, artist, imageUrl)));
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ArtistScreenNav
        onBack={() => navigate('Artist')}
        onMore={() => alert('More')}
        followButtonOpacity={0}
        headerText={albumName}
        headerOpacity={opacity.header}
      />
      <Image source={{ uri: imageUrl, height: 400, width: Dimensions.get('window').width }} style={styles.image} blurRadius={90 * opacity.album} />
      <ScrollView
        style={styles.mainScrollView}
        onScroll={(e) => setScrollHeight(e.nativeEvent.contentOffset.y / 100)}
        scrollEventThrottle={1}
      >
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 1)']}
          style={styles.gradient}
        />
        <View style={styles.middleContainer}>
          <View style={styles.albumImageContainer}>
            <Image source={{ uri: imageUrl, height: 160, width: 160 }} style={{...styles.albumImage, opacity: opacity.album }} />
          </View>
          <Text style={{ ...styles.albumName, opacity: opacity.album, fontSize: 25 }}>{albumName}</Text>
          <Text style={{ ...styles.albumDetail, opacity: opacity.album }}>Album by {artist} • {raw.current["release_date"].slice(7, 11)}</Text>
        </View>
        <View style={{backgroundColor: colors.black, paddingBottom: 90, paddingTop: 20}}>
        {tracks.map((track, index) => {
          return <TrackCompact
            key={`track-${index}`}
            index={index + 1}
            track={track}
            isPlaying={playables[index].id === Playlist.current}
            onPress={() => {
              if (playables[index].id === Playlist.current) {
                setCurrent({ track: Playlist.current, isPlaying: !current.isPlaying });
              } else {
                setCurrent({ track: Playlist.current, isPlaying: true });
              }
              Player.play(playables[index]);
            }}
          />;
        })}
        </View>
      </ScrollView>
    </View>
  );
}

const transformToPlayable = (item, artist, imageUrl) => {
  return {
    id: `${artist}---${item.title}`,
    url: item.file["mp3-128"],
    title: item.title,
    artist,
    artwork: imageUrl,
  };
};

const transformToTrack = (item) => {
  return {
    title: item.title,
    duration: item.duration
  };
};