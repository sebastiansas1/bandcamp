import React, { useState } from 'react';
import TrackPlayer from 'react-native-track-player';

const PlaylistContext = React.createContext();

const PlaylistProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);
  const [current, setCurrent] = useState({ id: 0 });

  const update = () => {
    TrackPlayer.getQueue().then(items => {
      setQueue(items);
    });
    TrackPlayer.getCurrentTrack().then(currentTrackId => {
      const currentTrack = queue.find(item => item.id === currentTrackId);
      if (currentTrack != null) {
        setCurrent(currentTrack);
      }
    });
  };

  const isTrackInQueue = track => {
    const isFound = queue.find(({ id }) => id === track.id);
    return isFound != null;
  };

  const hasNext = () => {
    const index = queue.findIndex(({ id }) => id === current.id);
    return queue[index + 1] != null;
  };

  const hasPrevious = () => {
    const index = queue.findIndex(({ id }) => id === current.id);
    return queue[index - 1] != null;
  };

  return (
    <PlaylistContext.Provider value={{ current, setCurrent, queue, update, hasNext, hasPrevious, isTrackInQueue }}>
      {children}
    </PlaylistContext.Provider>
  );
};

const PlaylistConsumer = PlaylistContext.Consumer;

export { PlaylistProvider, PlaylistConsumer };
export default PlaylistContext;
