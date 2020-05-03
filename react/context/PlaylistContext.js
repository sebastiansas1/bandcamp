import React, { useState } from 'react';

const PlaylistContext = React.createContext();

const PlaylistProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);
  const [upNext, setUpNext] = useState([]);
  const [current, setCurrent] = useState({ id: 0 });

  const add = track => {
    if (!isTrackInQueue(track)) {
      setQueue([...queue, track]);
      setUpNext([...queue, track]);
    }
  };

  const clear = async () => {
    setQueue([]);
    setUpNext([]);
  };

  const isTrackInQueue = track => {
    const isFound = queue.find(({ id }) => id === track.id);
    return isFound != null;
  };

  const skipTo = track => {
    const index = queue.findIndex(({ id }) => id === track.id);
    setCurrent(queue[index]);
    setUpNext(queue.slice(index));
    return queue[index];
  };

  const hasNext = () => {
    const index = queue.findIndex(({ id }) => id === current.id);
    return queue[index + 1] != null;
  };

  const nextTrack = () => {
    const index = queue.findIndex(({ id }) => id === current.id);
    setCurrent(queue[index + 1]);
    setUpNext(queue.slice(index + 1));
    return queue[index + 1];
  };

  const hasPrevious = () => {
    const index = queue.findIndex(({ id }) => id === current.id);
    return queue[index - 1] != null;
  };

  const previousTrack = () => {
    const index = queue.findIndex(({ id }) => id === current.id);
    setCurrent(queue[index - 1]);
    setUpNext(queue.slice(index - 1));
    return queue[index - 1];
  };

  const remove = track => {
    const filteredQueue = queue.filter(({ id }) => id !== track.id);
    const filteredUpNext = upNext.filter(({ id }) => id !== track.id);
    setQueue(filteredQueue);
    setUpNext(filteredUpNext);
  };

  return (
    <PlaylistContext.Provider
      value={{
        current,
        setCurrent,
        queue,
        upNext,
        add,
        skipTo,
        hasNext,
        nextTrack,
        hasPrevious,
        previousTrack,
        isTrackInQueue,
        remove,
        clear
      }}>
      {children}
    </PlaylistContext.Provider>
  );
};

const PlaylistConsumer = PlaylistContext.Consumer;

export { PlaylistProvider, PlaylistConsumer };
export default PlaylistContext;
