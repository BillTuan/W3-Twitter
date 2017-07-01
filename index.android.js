

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
 import App from './App/App';
export default class twitter extends Component {
  render() {
    return (
      <App/>
    );
  }
}

AppRegistry.registerComponent('twitter', () => twitter);
