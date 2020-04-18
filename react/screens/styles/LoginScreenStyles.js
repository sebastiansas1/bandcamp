import { StyleSheet } from 'react-native';

import colors from '../../consts/colors';

export default StyleSheet.create({
  scrollView: { flex: 1, marginTop: 50 },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
  topArea: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomArea: {
    flex: 3.5,
    marginHorizontal: 50,
  },
  button: {
    backgroundColor: '#000',
    padding: 25,
    borderRadius: 25,
    marginBottom: 25,
  },
  text: {
    color: '#fff',
  },
  title: {
    fontSize: 28,
    marginLeft: 50,
    fontWeight: '600',
    color: colors.white,
  },
});
