import { StyleSheet } from 'react-native';

import colors from '../../consts/colors';

export default StyleSheet.create({
  container: {
    paddingTop: 45,
    paddingBottom: 5,
    zIndex: 1,
    position: 'absolute',
    top: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  arrowIcon: {
    alignSelf: 'center',
    marginLeft: 10,
  },
  header: {
    paddingVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
    margin: "auto",
    flexDirection: 'row',
  },
  headerImage: {
    padding: 0,
    marginRight: 10,
    borderRadius: 50,
  },
  headerText: {
    color: colors.white,
    fontSize: 15,
    letterSpacing: 0.94,
    fontWeight: '500',
  },
  followText: {
    color: colors.white,
    fontSize: 10,
    letterSpacing: 0.94,
    fontWeight: '500',
  },
  followButton: {
    marginLeft: 140,
    paddingVertical: 11,
    paddingHorizontal: 30,
    borderRadius: 4,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  moreIcon: {
    alignSelf: 'center',
    marginRight: 15,
  },
});
