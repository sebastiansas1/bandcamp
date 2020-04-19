import TrackPlayer, { Capability } from 'react-native-track-player';
import Playlist from './Playlist';

const capabilities = [
  Capability.Play,
  Capability.Pause,
  Capability.Skip,
  Capability.SeekTo,
  Capability.JumpBackward,
  Capability.JumpForward,
  Capability.SkipToNext,
  Capability.SkipToPrevious,
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