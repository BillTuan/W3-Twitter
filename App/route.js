import {StackNavigator, DrawerNavigator, DrawerItems} from 'react-navigation';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import React, { Component } from 'react';

import LoginPage from './components/Login';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import DetailProfilePage from './components/DetailProfilePage';

const Route = {
  Login_Screen:{
    screen: LoginPage
  },
  Home_Screen: {
    screen: HomePage
  },
  Profile_Screen: {
    screen: DetailProfilePage
  }
}
const Stack = StackNavigator(Route);


const Navigator = DrawerNavigator({
    Main_Screen: {
      screen: Stack
    }
  },
  {
    drawerWidth: 300,
    drawerPosition: 'left',
    contentComponent: props => <ProfilePage {...props} />
  }
);

export default Navigator
