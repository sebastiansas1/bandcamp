import React, { useState, useContext, useEffect } from 'react';
import TrackPlayer, { Capability } from 'react-native-track-player';
import PlaylistContext from './PlaylistContext';

const capabilities = [
  Capability.Play,
  Capability.Pause,
  Capability.Skip,
  Capability.SeekTo,
  Capability.JumpBackward,
  Capability.JumpForward,
  Capability.SkipToNext,
  Capability.SkipToPrevious
];

const options = {
  stopWithApp: true,
  capabilities,
  compactCapabilities: [capabilities]
};

const PlayerContext = React.createContext();

const PlayerProvider = ({ children }) => {
  const Playlist = useContext(PlaylistContext);
  const [status, setStatus] = useState('stop');

  useEffect(() => {
    TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions(options);
  }, []);

  useEffect(() => {
    TrackPlayer.addEventListener('playback-state', ({ state }) => {
      setStatus(state);
    });
  }, []);

  const play = () => {
    TrackPlayer.play();
  };

  const reset = () => {
    TrackPlayer.reset();
  };

  const loadNPlay = async track => {
    TrackPlayer.stop();
    await Playlist.clear();
    add(track);
    play();
  };

  const pause = () => {
    TrackPlayer.pause();
  };

  const add = track => {
    TrackPlayer.add(track);
    Playlist.add(track);
  };

  const next = () => {
    TrackPlayer.skip(Playlist.nextTrack().id);
  };

  const skipTo = track => {
    TrackPlayer.skip(Playlist.skipTo(track).id);
  };

  const previous = () => {
    TrackPlayer.skipToPrevious(Playlist.previousTrack().id);
  };

  return (
    <PlayerContext.Provider value={{ status, play, loadNPlay, pause, reset, add, next, previous, skipTo }}>
      {children}
    </PlayerContext.Provider>
  );
};

const PlayerConsumer = PlayerContext.Consumer;

export { PlayerProvider, PlayerConsumer };
export default PlayerContext;
