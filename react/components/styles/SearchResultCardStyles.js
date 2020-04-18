import { StyleSheet } from 'react-native';

import colors from '../../consts/colors';

export default StyleSheet.create({
  container: {
    marginVertical: 5,
    flexDirection: 'row',
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
    height: 55,
  },
  title: {
    top: 2,
    fontWeight: '700',
    color: colors.white,
    fontSize: 15,
  },
  subtitle: {
    top: -2,
    fontWeight: '500',
    fontSize: 10,
    color: colors.lightGray,
  },
  paragraph: {
    fontWeight: '500',
    fontSize: 10,
    color: colors.lightGray,
    bottom: 2,
  },
  image: {
    width: 55,
    height: 55,
  },
  arrowIcon: {
    position: 'absolute',
    alignSelf: 'center',
    right: 8,
  },
});
