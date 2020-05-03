import { StyleSheet } from 'react-native';

import colors from '../../consts/colors';

export default StyleSheet.create({
  container: {
    marginVertical: 5,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 7
  },
  removeIcon: {
    marginRight: 15,
    alignSelf: 'center',
    zIndex: 5
  },
  image: {
    height: 35,
    width: 35,
    marginRight: 10
  },
  header: {
    flexDirection: 'column'
  },
  title: {
    fontWeight: '500',
    color: colors.white,
    fontSize: 14,
    marginBottom: 4
  },
  artist: {
    fontWeight: '400',
    color: colors.lightGray,
    marginTop: 0,
    marginRight: 5,
    fontSize: 11
  },
  paragraph: {
    position: 'absolute',
    right: 0,
    fontWeight: '500',
    fontSize: 10,
    alignSelf: 'center',
    color: colors.lightGray
  }
});
