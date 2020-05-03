import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../consts/colors';

export default StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: Dimensions.get('window').width - 75
  },
  trackTimesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  trackTime: {
    fontSize: 10,
    color: colors.white
  }
});
