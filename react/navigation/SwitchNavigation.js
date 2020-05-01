import React from 'react';

import { AlbumScreen, ArtistScreen, SearchScreen } from '../screens';

const Stack = createSwithNavigator();

export function SearchStack() {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Artist" component={ArtistScreen} />
      <Stack.Screen name="Album" component={AlbumScreen} />
    </Stack.Navigator>
  );
}
