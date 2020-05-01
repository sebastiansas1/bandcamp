import { StyleSheet } from 'react-native';

import colors from '../../consts/colors';

export default StyleSheet.create({
  container: {
    marginVertical: 5,
    flexDirection: 'row',
    marginHorizontal: 20
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginLeft: 10,
    height: 80
  },
  title: {
    top: 2,
    fontWeight: '700',
    color: colors.white,
    fontSize: 13
  },
  subtitle: {
    fontWeight: '500',
    fontSize: 10,
    color: colors.lightGray
  },
  paragraph: {
    top: -2,
    fontWeight: '500',
    fontSize: 10,
    color: colors.lightGray
  },
  image: {
    width: 80,
    height: 80
  }
});
