import React from 'react';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import LoginForm from '../forms/LoginForm';
import styles from './styles/LoginScreenStyles';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollView}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={false}
      >
        <View style={styles.topArea}>
          <Text style={styles.title}>bandcamp 2.0</Text>
        </View>
        <View style={styles.bottomArea}>
          <LoginForm navigation={navigation} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
