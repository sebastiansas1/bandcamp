import { StyleSheet, Dimensions } from 'react-native';

import colors from '../../consts/colors';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.black,
  },
  mainScrollView: {
    height: Dimensions.get('window').height - 160,
  },
  middleContainer: {
    marginTop: 100,
    width: '100%',
    marginBottom: 80,
  },
  albumName: {
    color: colors.white,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  albumDetail: {
    color: colors.lightGray,
    marginTop: 10,
    paddingHorizontal: 50,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 12,
  },
  albumImage: {
    alignSelf: "center",
    marginBottom: 20,
  },
  albumImageContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    
    elevation: 11,
  },
  gradient: {
    left: 0,
    right: 0,
    top: 50,
    height: 400,
    position: 'absolute',
  },
  image: {
    padding: 0,
    margin: 0,
    zIndex: -1,
    position: 'absolute',
    alignSelf: 'center',
  },
  spinner: {
    color: colors.lightGray,
  },
  arrowIcon: {
    zIndex: 1,
    top: 60,
    left: 10,
    position: 'absolute',
  },
  moreIcon: {
    zIndex: 1,
    top: 60,
    right: 20,
    position: 'absolute',
  },
});
