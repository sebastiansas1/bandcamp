import React from 'react';
import { TextInput, Text, View } from 'react-native';
import colors from '../consts/colors';

import styles from './styles/InputFieldStyles';

export default function InputField({
  type,
  value,
  label,
  onChange,
  placeholder,
  error,
  startSlot,
  endSlot,
  fieldStyle,
}) {
  const secureTextEntry = type === 'password';
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={{ ...styles.field, ...fieldStyle }}>
        {startSlot}
        <TextInput
          keyboardAppearance="dark"
          style={styles.input}
          placeholderTextColor={colors.lightGray}
          autoCapitalize={'none'}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
        />
        {endSlot}
      </View>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
}
