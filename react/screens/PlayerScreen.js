import React, { useState, useEffect, useContext } from 'react';
import { View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TrackPlayer, { useProgress, Event } from 'react-native-track-player';

import { Typography } from '../components';
import styles from './styles/PlayerScreenStyles';
import colors from '../consts/colors';
import { convertToTime } from '../utils/StringUtility';
import { PlayerContext, PlaylistContext } from '../context';
import MediaControls from '../components/MediaControls';
import SeekBar from '../components/SeekBar';
import Queue from '../components/Queue';

export default function PlayerScreen() {
  const Player = useContext(PlayerContext);
  const Playlist = useContext(PlaylistContext);
  const [isSeeking, setIsSeeking] = useState(false);
  const { artwork, title, artist } = Playlist.current;
  const { position, duration } = useProgress(100);
  const [trackPosition, setTrackPosition] = useState(position);

  const playMusic = () => {
    if (!artwork) return;
    Player.play();
  };

  const pauseMusic = () => {
    if (!artwork) return;
    Player.pause();
  };

  const skipNext = () => {
    if (!artwork || !Playlist.hasNext()) return;
    Player.next();
  };

  const skipPrev = () => {
    if (!artwork) return;
    const secondsStarted = Number(convertToTime(trackPosition).slice(3, 5));
    if (secondsStarted > 5) {
      TrackPlayer.seekTo(0);
      return;
    }
    if (Playlist.hasPrevious()) {
      Player.previous();
    }
  };

  const onSeek = pos => {
    setTrackPosition(pos);
  };

  const onSeekStart = () => {
    setIsSeeking(true);
  };

  const onSeekComplete = async pos => {
    setIsSeeking(false);
    await TrackPlayer.seekTo(pos);
  };

  useEffect(() => {
    if (!isSeeking) setTrackPosition(position);
    if (duration && duration - trackPosition < 1 && duration - trackPosition > -1 && Playlist.hasNext()) {
      Player.next();
    }
  }, [position]);

  return (
    <View style={styles.mainContainer}>
      {artwork && <Queue />}
      <View style={{ position: 'absolute', bottom: 30, alignSelf: 'center', zIndex: 1 }}>
        <View style={{ ...styles.trackImageContainer }}>
          {artwork && (
            <LinearGradient
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 1)']}
              style={styles.trackImage}
            />
          )}
          <Image source={{ uri: artwork }} blurRadius={20} style={{ ...styles.trackImage, zIndex: -1 }} />
        </View>
        {artwork && (
          <View style={styles.musicInfo}>
            <Typography
              text={title}
              maxChar={80}
              style={{
                ...styles.trackName,
                fontSize: 18 - title.length / 50,
                color: colors.white,
                fontWeight: '700',
                marginBottom: 15
              }}
            />
            <Typography text={artist} maxChar={50} style={{ ...styles.trackName, fontSize: 12, color: colors.light }} />
          </View>
        )}
        <SeekBar
          onSeek={onSeek}
          onSeekStart={onSeekStart}
          onSeekComplete={onSeekComplete}
          isSeeking={isSeeking}
          position={trackPosition}
          duration={duration}
        />
        <MediaControls
          onLike={() => {}}
          onPause={pauseMusic}
          onPlay={playMusic}
          onSkipNext={skipNext}
          onSkipPrevious={skipPrev}
          isPlaying={Player.status === 'playing'}
          activeColor={Playlist.current.artwork ? colors.white : colors.lightGray}
        />
      </View>
    </View>
  );
}
