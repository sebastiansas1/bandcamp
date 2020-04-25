import { StyleSheet } from 'react-native';

import colors from '../../consts/colors';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: colors.darker,
  },
  trackImageContainer: {
    backgroundColor: colors.black,
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 500,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    margin: 20,
    elevation: 11,
  },
  trackImage: {
    margin: 80,
    borderRadius: 500,
    alignSelf: "center",
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
