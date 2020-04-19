import { StyleSheet } from 'react-native';

import colors from '../../consts/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    paddingBottom: 30,
  },
  heading: {
    color: colors.white,
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '700',
  },
});
