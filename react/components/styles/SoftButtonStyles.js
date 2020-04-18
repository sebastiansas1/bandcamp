import { StyleSheet } from 'react-native';

import colors from '../../consts/colors';

export default StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'stretch',
  },
  button: {
    alignSelf: 'stretch',
    backgroundColor: colors.darkBlue,
    borderRadius: 12,
    paddingVertical: 12,
    color: colors.white,
  },
});
