import React, { useEffect, useState } from 'react';
import { View, Image, Text, Dimensions, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

import Bandcamp from '../data/Bandcamp';
import { AlbumCard, ArtistScreenNav, TrackCard, Section } from '../components';
import styles from './styles/ArtistScreenStyles';
import Player from '../player/Player';
import Playlist from '../player/Playlist';

const OPACITY_HEIGHT = 1.3;

export default function ArtistScreen({ route, navigation: { navigate }, navigation }) {
  const { name: artistName, imageUrl, location, url: artistUrl } = route.params;
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [playables, setPlayables] = useState([]);
  const [current, setCurrent] = useState({ trackId: Playlist.currentTrack && Playlist.currentTrack.id, isPlaying: Player.state === "play" });
  const [isLoading, setIsLoading] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [opacity, setOpacity] = useState({ artist: 1, followBtn: 1, header: 0 });

  useEffect(() => {
    setOpacity({
      artist: (OPACITY_HEIGHT - Math.abs(scrollHeight)),
      followBtn: (OPACITY_HEIGHT - scrollHeight),
      header: -(OPACITY_HEIGHT - scrollHeight)
    });
  }, [scrollHeight, current]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCurrent({ trackId: Playlist.currentTrack && Playlist.currentTrack.id, isPlaying: Player.state === "play" });
    });

    return unsubscribe;
  }, [navigation]);

  const getData = async () => {
    setIsLoading(true);
    const data = await Bandcamp.getArtistData(artistUrl);
    setPlayables(data.playables);
    setTracks(data.tracks);
    setAlbums(data.albums);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ArtistScreenNav
        imageUrl={imageUrl}
        onBack={() => navigate('Search')}
        onMore={() => alert('More')}
        followButtonOpacity={opacity.followBtn}
        headerText={artistName}
        headerOpacity={opacity.header}
      />
      <Image source={{ uri: imageUrl, height: 400, width: Dimensions.get('window').width }} style={styles.image} />
      <ScrollView
        style={styles.mainScrollView}
        onScroll={(e) => setScrollHeight(e.nativeEvent.contentOffset.y / 100)}
        scrollEventThrottle={1}
      >
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 1)']}
          style={styles.gradient}
        />
        <View style={styles.middleContainer}>
          <Text style={{ ...styles.artistName, opacity: opacity.artist, fontSize: 60 - artistName.length }}>{artistName}</Text>
          <Text style={{ ...styles.artistLocation, opacity: opacity.artist }}>{location}</Text>
        </View>
        {isLoading && <ActivityIndicator style={styles.spinner} />}
        {albums.length > 0 && (
          <Section title="Albums">
            {albums.map((album, index) => (
              <AlbumCard
                key={`album-${index}`}
                album={album}
                onPress={() => navigate("Album", album)}
              />
            ))}
          </Section>
        )}
        {tracks.length > 0 && (
          <Section title="Tracks">
            {tracks.map((track, index) => {
              return <TrackCard
                key={`track-${index}`}
                track={track}
                isPlaying={playables[index].id === Playlist.currentTrack.id}
                onPress={() => {
                  if (playables[index].id === Playlist.currentTrack.id) {
                    setCurrent({ trackId: Playlist.currentTrack.id, isPlaying: !current.isPlaying });
                  } else {
                    setCurrent({ trackId: Playlist.currentTrack.id, isPlaying: true });
                  }
                  Player.play(playables[index]);
                }}
              />;
            })}
          </Section>
        )}
      </ScrollView>
    </View>
  );
}