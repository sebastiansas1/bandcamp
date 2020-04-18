import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SearchScreen from '../screens/SearchScreen';
import ArtistScreen from '../screens/ArtistScreen';

const Stack = createStackNavigator();

export function SearchStack() {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Artist" component={ArtistScreen} />
    </Stack.Navigator>
  );
}
