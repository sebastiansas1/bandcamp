import React, { useEffect, useState, useContext } from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

import { ArtistScreenNav, SoftButton, Icon } from '../components';
import styles from './styles/AlbumScreenStyles';
import PlayerContext from '../context/PlayerContext';
import PlaylistContext from '../context/PlaylistContext';
import TrackCompact from '../components/TrackCompact';
import colors from '../consts/colors';

const OPACITY_HEIGHT = 1.3;

export default function AlbumScreen({ route, navigation: { goBack }, navigation }) {
  const Player = useContext(PlayerContext);
  const Playlist = useContext(PlaylistContext);
  const { title: albumName, artist, imageUrl, raw } = route.params;
  const [tracks, setTracks] = useState([]);
  const [playables, setPlayables] = useState([]);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [opacity, setOpacity] = useState({ album: 1, header: 0 });

  useEffect(() => {
    setOpacity({
      album: OPACITY_HEIGHT - Math.abs(scrollHeight),
      header: -(OPACITY_HEIGHT - scrollHeight)
    });
  }, [scrollHeight, Playlist.current]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {});

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const trackInfo = raw.trackinfo;
    setTracks(trackInfo.map(track => transformToTrack(track)));
    setPlayables(trackInfo.map(track => transformToPlayable(track, artist, imageUrl)));
  }, []);

  const handlePlay = async index => {
    const track = playables[index];
    Playlist.setCurrent(track);
    Player.loadNPlay(track);
  };

  return (
    <View style={styles.mainContainer}>
      <ArtistScreenNav
        onBack={goBack}
        onMore={() => alert('More')}
        followButtonOpacity={0}
        headerText={albumName}
        headerOpacity={opacity.header}
      />
      <Image
        source={{ uri: imageUrl, height: 400, width: Dimensions.get('window').width }}
        style={styles.image}
        blurRadius={90 * opacity.album}
      />
      <ScrollView
        style={styles.mainScrollView}
        onScroll={e => setScrollHeight(e.nativeEvent.contentOffset.y / 100)}
        scrollEventThrottle={1}>
        <LinearGradient
          colors={[
            'rgba(0, 0, 0, 0.0)',
            'rgba(0, 0, 0, 0.8)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)'
          ]}
          style={styles.gradient}
        />
        <View style={styles.middleContainer}>
          <View style={styles.albumImageContainer}>
            <Image
              source={{ uri: imageUrl, height: 160, width: 160 }}
              style={{ ...styles.albumImage, opacity: opacity.album }}
            />
          </View>
          <Text style={{ ...styles.albumName, opacity: opacity.album, fontSize: 25 }}>{albumName}</Text>
          <Text style={{ ...styles.albumDetail, opacity: opacity.album }}>
            Album by {artist} • {raw.current['release_date'].slice(7, 11)}
          </Text>
        </View>
        <TouchableOpacity style={styles.playBtn} activeOpacity={0.7}>
          {/* <Icon name="ios-play" style={styles.playBtnIcon} vendor="ionicons" /> */}
          <Text style={styles.playBtnText}>LISTEN ALBUM</Text>
        </TouchableOpacity>
        <View style={{ backgroundColor: colors.black, paddingBottom: 90, paddingTop: 20 }}>
          {tracks.map((track, index) => {
            return (
              <TrackCompact
                key={`track-${index}`}
                index={index + 1}
                track={track}
                artist={artist}
                isPlaying={playables[index].id === Playlist.current.id}
                isQueued={Playlist.isTrackInQueue(playables[index])}
                onPressPlay={() => handlePlay(index)}
                onPressQueue={() => Player.add(playables[index])}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const transformToPlayable = (item, artist, imageUrl) => {
  return {
    id: `${artist}---${item.title}`,
    url: item.file['mp3-128'],
    title: item.title,
    artist,
    artwork: imageUrl
  };
};

const transformToTrack = item => {
  return {
    title: item.title || 'Unknown',
    duration: item.duration
  };
};
