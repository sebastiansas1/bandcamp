import TrackPlayer from 'react-native-track-player';

module.exports = async function () {
  TrackPlayer.addEventListener("remote-play", () => {
    alert("PLAYYYYYY");
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener("remote-pause", () => {
    alert("PAUSEEEE");
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener("remote-stop", () => TrackPlayer.stop());
};