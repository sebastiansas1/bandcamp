import { StyleSheet } from 'react-native';

import colors from '../../consts/colors';

export default StyleSheet.create({
  field: {
    width: '100%',
    backgroundColor: colors.dark,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 12,
    color: colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 14,
    color: colors.white,
    flex: 1,
    padding: 10,
  },
  label: {
    fontSize: 12,
    color: colors.lightestBlue,
  },
  error: {
    fontSize: 12,
    color: colors.danger,
  },
});
