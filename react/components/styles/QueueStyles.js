import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../consts/colors';

export default StyleSheet.create({
  container: {
    margin: 20
  },
  scrollView: {
    height: Dimensions.get('window').height / 2.77
  },
  title: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 10
  }
});
