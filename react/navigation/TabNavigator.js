import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import colors from '../consts/colors';
import PlayerScreen from '../screens/PlayerScreen';
import { SearchStack } from './StackNavigators';

const TabIcon = ({ name, color }) => <Icon name={name} color={color} size={28} />;

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          switch (route.name) {
            case 'Home':
              return TabIcon({ name: 'dashboard', color });
            case 'Search':
              return TabIcon({ name: 'search', color });
            case 'Messages':
              return TabIcon({ name: 'message', color });
            case 'Player':
              return TabIcon({ name: 'play-circle-filled', color });
            default:
              break;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.blue,
        style: {
          paddingTop: 10,
          backgroundColor: colors.darker,
          borderTopColor: colors.black,
        },
        labelStyle: {
          fontSize: 10,
        },
        keyboardHidesTabBar: false,
        inactiveTintColor: colors.lightDark,
        showLabel: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen name="Messages" component={LoginScreen} />
      <Tab.Screen name="Player" component={PlayerScreen} />
    </Tab.Navigator>
  );
}
