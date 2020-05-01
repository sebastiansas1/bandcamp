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
    Playlist.update();
    updateStatus();
  }, []);

  const play = () => {
    TrackPlayer.play();
    Playlist.update();
    updateStatus();
  };

  const reset = () => {
    TrackPlayer.reset();
    Playlist.updateQueue();
    updateStatus();
  };

  const updateStatus = async () => {
    TrackPlayer.getState().then(state => {
      setStatus(state);
    });
  };

  const loadNPlay = async track => {
    TrackPlayer.stop();
    add(track);
    play();
    Playlist.update();
    updateStatus();
  };

  const pause = () => {
    TrackPlayer.pause();
    Playlist.update();
    updateStatus();
  };

  const add = track => {
    TrackPlayer.add(track);
    Playlist.update();
    updateStatus();
  };

  const next = () => {
    TrackPlayer.skipToNext();
    Playlist.update();
    updateStatus();
  };

  const previous = () => {
    TrackPlayer.skipToPrevious();
    Playlist.update();
    updateStatus();
  };

  return (
    <PlayerContext.Provider value={{ status, play, loadNPlay, pause, reset, add, next, previous }}>
      {children}
    </PlayerContext.Provider>
  );
};

const PlayerConsumer = PlayerContext.Consumer;

export { PlayerProvider, PlayerConsumer };
export default PlayerContext;
