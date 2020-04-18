import { StyleSheet } from 'react-native';

import colors from '../../consts/colors';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: colors.darker,
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
});
