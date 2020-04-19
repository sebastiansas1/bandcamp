import TrackPlayer from 'react-native-track-player';
import Playlist from './Playlist';

const capabilities = [
  TrackPlayer.CAPABILITY_PLAY,
  TrackPlayer.CAPABILITY_PAUSE,
  TrackPlayer.CAPABILITY_SKIP,
  TrackPlayer.CAPABILITY_SEEK_TO,
  TrackPlayer.CAPABILITY_JUMP_BACKWARD,
  TrackPlayer.CAPABILITY_JUMP_FORWARD,
  TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
  TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
];

const options = {
  stopWithApp: true,
  capabilities,
  compactCapabilities: [capabilities]
};

class Player {

  static state = "stop";

  static init() {
    TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions(options);
    Playlist.init();
  }

  static pause = () => {
    Player.state = "pause";
    TrackPlayer.pause();
  };

  static add = (playable, index) => {
    TrackPlayer.add(playable);
    Playlist.add(playable.id, index);
  };

  static remove = (playable) => {
    Playlist.remove(playable.id);
  };

  static play = async (playable) => {
    TrackPlayer.stop();
    this.add(playable);
    Playlist.current = playable.id;
    TrackPlayer.play();
    Player.state = "play";
  };

  static next = () => TrackPlayer.skipToNext();

  static previous = () => TrackPlayer.skipToPrevious();
}

export default Player;