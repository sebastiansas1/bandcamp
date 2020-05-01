import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { TabNavigator } from './react/navigation/TabNavigator';
import { PlayerProvider } from './react/context/PlayerContext';
import { PlaylistProvider } from './react/context/PlaylistContext';

export default function App() {
  return (
    <>
      <PlaylistProvider>
        <PlayerProvider>
          <StatusBar barStyle="light-content" />
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </PlayerProvider>
      </PlaylistProvider>
    </>
  );
}
