import React, { useEffect, useState } from 'react';
import { View, Image, Text, Dimensions, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import TrackPlayer from 'react-native-track-player';

import ArtistScreenNav from '../components/ArtistScreenNav';
import styles from './styles/ArtistScreenStyles';
import { endpoints } from '../utils/ApiUtility';
import ArtistItemCard from '../components/ArtistItemCard';
import Icon from '../components/Icon';
import colors from '../consts/colors';

TrackPlayer.setupPlayer().then(() => {
  // The player is ready to be used
});

export default function ArtistScreen({ route, navigation: { navigate } }) {
  const { name: artistName, imageUrl, location, url: artistUrl } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [playerState, setPlayerState] = useState(null);

  const [scrollHeight, setScrollHeight] = useState(0);
  const [artistNameOpacity, setArtistNameOpacity] = useState(1);
  const [followBtnOpacity, setFollowBtnOpacity] = useState(1);
  const [headerOpacity, setHeaderOpacity] = useState(0);

  useEffect(() => {
    const absScrollHeight = Math.abs(scrollHeight);
    if (scrollHeight > 0) {
      setArtistNameOpacity((180 - absScrollHeight) / 100);
      setFollowBtnOpacity((120 - absScrollHeight) / 100);
      setHeaderOpacity(-0.5 - followBtnOpacity);
      return;
    }

    if (scrollHeight === 0) {
      setArtistNameOpacity(1);
      setFollowBtnOpacity(1);
      setHeaderOpacity(0);
    }

    if (scrollHeight < 0) {
      setFollowBtnOpacity(1);
      setHeaderOpacity(0);
      setArtistNameOpacity((150 - absScrollHeight) / 100);
    }
  }, [scrollHeight]);

  const getAlbums = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(endpoints.albums, { params: { artistUrl } });
      const filteredAlbums = data.results.filter((item) => item.raw["item_type"] === "album");
      const filteredTracks = data.results.filter((item) => item.raw["item_type"] === "track");
      setAlbums(filteredAlbums);
      setTracks(filteredTracks);
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAlbums();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ArtistScreenNav
        imageUrl={imageUrl}
        onBack={() => navigate('Search')}
        onMore={() => alert('More')}
        followButtonOpacity={followBtnOpacity}
        headerText={artistName}
        headerOpacity={headerOpacity}
      />
      <Image source={{ uri: imageUrl, height: 400, width: Dimensions.get('window').width }} style={styles.image} />
      <ScrollView
        style={styles.mainScrollView}
        onScroll={(e) => setScrollHeight(e.nativeEvent.contentOffset.y)}
        scrollEventThrottle={1}
      >
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 1)']}
          style={styles.gradient}
        />
        <View style={styles.middleContainer}>
          <Text style={{ ...styles.artistName, opacity: artistNameOpacity, fontSize: 60 - artistName.length }}>{artistName}</Text>
          <Text style={{ ...styles.artistLocation, opacity: artistNameOpacity }}>{location}</Text>
        </View>
        {isLoading && <ActivityIndicator style={styles.spinner} />}
        {albums.length > 0 && (
          <View style={styles.albumSection}>
            <Text style={styles.albumsHeading}>Albums</Text>
            {albums.map((album, index) => {
              return (
                <ArtistItemCard
                  key={`album-${index}`}
                  imageUrl={album.imageUrl}
                  imageSize={75}
                  id={index}
                  title={album.title}
                  subtitle={album.raw && album.raw['album_release_date'].slice(0, 12)}
                  paragraph={`Tracks: ${album.tracks && album.tracks.length}`}
                  onPress={() => alert('Hello!')}
                />
              );
            })}
          </View>
        )}
        {tracks.length > 0 && (
          <View style={styles.albumSection}>
            <Text style={styles.albumsHeading}>Tracks</Text>
            {tracks.map((track, index) => {
              return (
                <ArtistItemCard
                  key={`album-${index}`}
                  imageUrl={track.imageUrl}
                  imageSize={55}
                  id={index}
                  title={track.title}
                  subtitle={track.raw.current['publish_date'].slice(3, 11)}
                  paragraph={`Duration: ${convertInMinutes(track.raw.trackinfo[0].duration)}`}
                  onPress={() => {
                    const song = createTrack(track);
                    TrackPlayer.stop();
                    TrackPlayer.add(song);
                    TrackPlayer.play();
                  }}
                  endSlot={
                    <Icon
                      name="play-circle-outline"
                      color={colors.white}
                      size={25}
                      onPress={() => alert('Play!')}
                      style={{ alignSelf: 'center', position: 'absolute', right: 10 }}
                    />
                  }
                />
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const createTrack = (track) => {
  return {
    id: `${track.raw.artist}---${track.title}`,
    url: track.raw.trackinfo[0].file["mp3-128"],
    title: track.title,
    artist: track.raw.artist,
    artwork: track.imageUrl
  }
}

const convertInMinutes = (value) => {
  const duration = String(value);
  const timeInDecimals = String(duration.slice(0, duration.indexOf('.')) / 60);
  let seconds = Math.round(timeInDecimals.slice(timeInDecimals.indexOf('.')) * 60);
  if (seconds < 10) seconds = `0${seconds}`;
  return timeInDecimals.slice(0, timeInDecimals.indexOf('.')) + ':' + seconds;
};
