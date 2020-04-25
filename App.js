import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { TabNavigator } from './react/navigation/TabNavigator';
import Player from './react/player/Player';


export default function App() {
  Player.init();
  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </>
  );
};