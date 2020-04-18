import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import axios from 'axios';

import InputField from '../components/InputField';
import colors from '../consts/colors';
import Link from '../components/Link';
import SoftButton from '../components/SoftButton';

export default function LoginForm({ navigation }) {
  const [email, setEmail] = useState('sebastiansasmangel@gmail.com');
  const [password, setPassword] = useState('SDxDm123-');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const url = 'https://intelliguard.herokuapp.com/api/users/login';
    const data = { email: email.toLowerCase(), password };
    setIsSubmitting(true);
    try {
      await axios.post(url, data);
      setError('');
      navigation.navigate('Home');
    } catch (error) {
      setError('Unable to verify your identity');
    }
    setIsSubmitting(false);
  };

  return (
    <View>
      <InputField
        placeholder="Email address"
        value={email}
        type="email"
        onChange={(value) => setEmail(value)}
        fieldStyle={styles.fieldStyle}
      />
      <InputField
        placeholder="Password"
        value={password}
        type="password"
        onChange={(value) => setPassword(value)}
        fieldStyle={styles.fieldStyle}
      />
      <Link text="Forgot password?" onPress={() => alert('Contact system administrator')} />
      <View style={styles.buttonContainer}>
        <SoftButton onPress={handleLogin} loading={isSubmitting}>
          <Text style={styles.text}>Sign in</Text>
        </SoftButton>
        <Text style={styles.error}>{error}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    textAlign: 'center',
    width: 200,
    alignSelf: 'center',
    marginTop: 50,
  },
  fieldStyle: {
    backgroundColor: colors.darkBlue,
  },
  error: {
    color: colors.danger,
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 12,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: '500',
  },
});
