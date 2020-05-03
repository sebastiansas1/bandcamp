import { StyleSheet, Dimensions } from 'react-native';

import colors from '../../consts/colors';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: colors.darker
  },
  title: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 50
  },
  trackImageContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    shadowColor: '#000',
    bottom: -20,
    position: 'absolute',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    borderRadius: 25,
    elevation: 11
  },
  trackImage: {
    zIndex: 1,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    position: 'absolute',
    bottom: -20,
    height: Dimensions.get('screen').height / 2.8,
    width: Dimensions.get('window').width,
    alignSelf: 'center'
  },
  header: {
    color: colors.white,
    width: '100%',
    paddingTop: 10,
    textAlign: 'center',
    lineHeight: 30,
    fontSize: 30,
    marginBottom: 50,
    fontWeight: 'bold'
  },
  musicInfo: {
    alignSelf: 'center',
    width: Dimensions.get('window').width - 75,
    marginBottom: 20
  },
  trackName: {
    alignSelf: 'center',
    textAlign: 'center',
    color: colors.white,
    fontWeight: '500'
  }
});
