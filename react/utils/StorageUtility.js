import { AsyncStorage } from 'react-native';

const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value) {
      // value previously stored
      return value;
    }
  } catch (e) {}
};

export default { getToken };
