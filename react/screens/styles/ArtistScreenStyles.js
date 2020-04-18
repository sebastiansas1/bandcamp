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
    marginTop: 200,
    width: '100%',
    marginBottom: 80,
  },
  artistName: {
    color: colors.white,
    paddingHorizontal: 50,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  artistLocation: {
    color: colors.light,
    marginTop: 30,
    paddingHorizontal: 50,
    textAlign: 'center',
    fontWeight: '500',
  },
  albumSection: {
    backgroundColor: colors.black,
    paddingBottom: 30,
  },
  albumsHeading: {
    color: colors.white,
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '700',
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
