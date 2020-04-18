import { StyleSheet } from 'react-native';

import colors from '../../consts/colors';

export default StyleSheet.create({
  header: {
    width: '100%',
    paddingTop: 10,
    textAlign: 'center',
    lineHeight: 30,
    fontSize: 30,
    fontWeight: 'bold',
  },
  mainContainer: {
    paddingTop: 50,
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  middleContainer: {
    flex: 5.7,
    width: '100%',
    marginTop: 10,
    paddingTop: 30,
    paddingHorizontal: 25,
    backgroundColor: colors.light,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
});
