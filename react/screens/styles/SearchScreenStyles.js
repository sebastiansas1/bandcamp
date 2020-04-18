import { StyleSheet, Dimensions } from 'react-native';

import colors from '../../consts/colors';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: colors.darker,
  },
  middleContainer: {
    flex: 1,
    width: '100%',
    marginTop: 10,
    paddingTop: 30,
    backgroundColor: colors.light,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  resultsContainer: {
    paddingHorizontal: 5,
    height: Dimensions.get('window').height - 185,
    marginBottom: 65,
    marginTop: -10,
  },
  header: {
    width: '100%',
    paddingTop: 30,
    textAlign: 'left',
    lineHeight: 30,
    fontSize: 30,
    fontWeight: 'bold',
  },
  startSlot: {
    marginLeft: 5,
  },
  endSlot: {
    marginRight: 5,
  },
});
