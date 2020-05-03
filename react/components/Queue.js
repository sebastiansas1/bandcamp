import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';

import Typography from './Typography';
import styles from './styles/QueueStyles';
import { PlaylistContext, PlayerContext } from '../context';
import QueueItem from './QueueItem';
import { ScrollView } from 'react-native-gesture-handler';

export default function Queue() {
  const Playlist = useContext(PlaylistContext);
  const Player = useContext(PlayerContext);
  const [tracks, setTracks] = useState(Playlist.upNext || []);
  const [currentTrack, setCurrentTrack] = useState(Playlist.current || null);

  useEffect(() => {
    setTracks(Playlist.upNext);
    setCurrentTrack(Playlist.current);
  }, [Playlist.upNext, Playlist.current]);

  const onPlay = track => {
    Player.skipTo(track);
  };

  const onRemove = track => {
    Playlist.remove(track);
  };

  return (
    <View style={styles.container}>
      <Typography text="Now Playing" style={styles.title} />
      {currentTrack && <QueueItem key={'queue-item-1'} track={currentTrack} />}
      {tracks.length > 1 && (
        <>
          <Typography text="Next In Queue" style={styles.title} />
          <ScrollView style={styles.scrollView}>
            {tracks.map((track, index) => {
              if (index > 0) {
                return (
                  <QueueItem
                    key={`queue-item-${index}`}
                    track={track}
                    onPlay={() => onPlay(track)}
                    onRemove={() => onRemove(track)}
                  />
                );
              }
            })}
          </ScrollView>
        </>
      )}
    </View>
  );
}
