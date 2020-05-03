import React, { useContext, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import colors from '../consts/colors';
import PlayerScreen from '../screens/PlayerScreen';
import { SearchStack } from './StackNavigators';
import { PlaylistContext, PlayerContext } from '../context';
import { Image } from 'react-native';

const TabIcon = ({ name, color }) => <Icon name={name} color={color} size={28} />;

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  const [playerIcon, setPlayerIcon] = useState(null);
  const Playlist = useContext(PlaylistContext);
  const Player = useContext(PlayerContext);

  useEffect(() => {
    if (Playlist.current.id && Player.status === 'playing') {
      setPlayerIcon(<Image source={{ uri: Playlist.current.artwork }} style={{ height: 28, width: 28 }} />);
    }
  }, [Playlist.current, Player.status]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          switch (route.name) {
            case 'Home':
              return TabIcon({ name: 'dashboard', color });
            case 'Search':
              return TabIcon({ name: 'search', color });
            case 'Player':
              return playerIcon || TabIcon({ name: 'play-circle-filled', color });
            default:
              break;
          }
        }
      })}
      tabBarOptions={{
        activeTintColor: colors.white,
        style: {
          paddingTop: 10,
          backgroundColor: colors.darker,
          borderTopColor: colors.black
        },
        labelStyle: {
          fontSize: 10
        },
        keyboardHidesTabBar: false,
        inactiveTintColor: colors.lightDark,
        showLabel: false
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen name="Player" component={PlayerScreen} />
    </Tab.Navigator>
  );
}
