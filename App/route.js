import {StackNavigator, DrawerNavigator, DrawerItems, TabNavigator} from 'react-navigation';
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
  }
}
const  Stack= StackNavigator(Route);

const Tabbar = TabNavigator({
    Home_Screen: {
      screen: HomePage
    },
    Profile_Screen: {
      screen: DetailProfilePage
    }
  },
  {
    initialRouteName:'Home_Screen',
    tabBarPosition : 'bottom',
    swipeEnabled :true,
    lazy: true,
    tabBarOptions: {
      showIcon : true,
      showLabel : false,
      style: {
        backgroundColor: 'white',
        borderTopWidth: 1
      },
      indicatorStyle: {
        backgroundColor: 'white'
      },
      activeTintColor: 'red',
      inactiveTintColor: '#1DA1F2',
    }
  }
)

const Navigator = DrawerNavigator({
  Login: {
    screen: Stack
  },
    Main_Screen: {
      screen: Tabbar
    }
  },
  {
    drawerWidth: 300,
    drawerPosition: 'left',
    contentComponent: props => <ProfilePage {...props} />
  }, {initialRouteName:'Login'}
);

export default Navigator
