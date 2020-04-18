import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { TabNavigator } from './react/navigation/TabNavigator';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </>
  );
};