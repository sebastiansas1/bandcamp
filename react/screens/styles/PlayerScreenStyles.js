import { StyleSheet, Dimensions } from 'react-native';

import colors from '../../consts/colors';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: colors.darker,
  },
  trackImageContainer: {
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    borderRadius: 25,
    margin: 20,
    elevation: 11,
  },
  trackImage: {
    borderRadius: 25,
    height: 200,
    width: 200,
    alignSelf: "center",
  },
  header: {
    color: colors.white,
    width: '100%',
    paddingTop: 10,
    textAlign: 'center',
    lineHeight: 30,
    fontSize: 30,
    fontWeight: 'bold',
  },
  musicInfo: {
    alignSelf: "center",
    position: "absolute",
    bottom: 200,
    width: Dimensions.get("window").width - 75
  },
  trackName: {
    alignSelf: "flex-start",
    textAlign: "left",
    color: colors.white,
    fontWeight: "500",
    marginBottom: 5,
  },
  trackTimesContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  trackTime: {
    fontSize: 10,
    color: colors.white
  },
  seekBar: {
    position: "absolute",
    alignSelf: "center",
    zIndex: 1,
    width: Dimensions.get("window").width - 75,
    bottom: 130,
  },
  seekBarSlider: {
    width: 50,
  },
  seekBarThumb: {
    backgroundColor: colors.white,
    position: "absolute"
  },
  seekBarTrack: {
    backgroundColor: colors.white,
  },
  mediaControls: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-around"
  },
  playPauseBtns: {
    alignSelf: "center",
    borderRadius: 500,
    paddingVertical: 50,
  },
  skipBtns: {
    alignSelf: "center",
    paddingHorizontal: 15,
    paddingVertical: 50,
    fontWeight: "100"
  }
});
