import React from 'react';
import { Text, StyleSheet } from 'react-native';
import font from '../consts/font';

export default function Typography({ maxChar, text, tag, style }) {
  return (
    <Text ellipsizeMode="tail" style={{ ...styles[tag], ...style }}>
      {maxChar && text && text.length > maxChar ? text.substring(0, maxChar) + '...' : text}
    </Text>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: font.size_largest,
  },
  h2: {
    fontSize: font.size_larger,
  },
  h3: {
    fontSize: font.size_large,
  },
  h4: {
    fontSize: font.size_medium,
  },
  p: {
    fontSize: font.size_small,
  },
});
