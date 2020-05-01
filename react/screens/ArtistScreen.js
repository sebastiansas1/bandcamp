import React, { useEffect, useState, useContext } from 'react';
import { View, Image, Text, Dimensions, ActivityIndicator, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

import Bandcamp from '../data/Bandcamp';
import { AlbumCard, ArtistScreenNav, TrackCard, Section } from '../components';
import styles from './styles/ArtistScreenStyles';
import { PlayerContext, PlaylistContext } from '../context';

const OPACITY_HEIGHT = 1.3;

export default function ArtistScreen({ route, navigation: { navigate }, navigation }) {
  const Player = useContext(PlayerContext);
  const Playlist = useContext(PlaylistContext);
  const { name: artistName, imageUrl, location, url: artistUrl } = route.params;
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [playables, setPlayables] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [opacity, setOpacity] = useState({ artist: 1, followBtn: 1, header: 0 });

  useEffect(() => {
    setOpacity({
      artist: OPACITY_HEIGHT - Math.abs(scrollHeight),
      followBtn: OPACITY_HEIGHT - scrollHeight,
      header: -(OPACITY_HEIGHT - scrollHeight)
    });
  }, [scrollHeight, Playlist.current]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {});

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

  const handlePlay = async index => {
    const track = playables[index];
    Playlist.setCurrent(track);
    Player.loadNPlay(track);
  };

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
      <SafeAreaView>
        <ScrollView
          style={styles.mainScrollView}
          onScroll={e => setScrollHeight(e.nativeEvent.contentOffset.y / 100)}
          scrollEventThrottle={1}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 1)']}
            style={styles.gradient}
          />
          <View style={styles.middleContainer}>
            <Text style={{ ...styles.artistName, opacity: opacity.artist, fontSize: 60 - artistName.length }}>
              {artistName}
            </Text>
            <Text style={{ ...styles.artistLocation, opacity: opacity.artist }}>{location}</Text>
          </View>
          {isLoading && <ActivityIndicator style={styles.spinner} />}
          {albums.length > 0 && (
            <Section title="Albums">
              {albums.map((album, index) => (
                <AlbumCard key={`album-${index}`} album={album} onPress={() => navigate('Album', album)} />
              ))}
            </Section>
          )}
          {tracks.length > 0 && (
            <Section title="Tracks">
              {tracks.map((track, index) => {
                return (
                  <TrackCard
                    key={`track-${index}`}
                    track={track}
                    isPlaying={playables[index].id === Playlist.current.id}
                    isQueued={Playlist.isTrackInQueue(playables[index])}
                    onPressPlay={() => handlePlay(index)}
                    onPressQueue={() => Player.add(playables[index])}
                  />
                );
              })}
            </Section>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
