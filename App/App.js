/* @flow */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import Navigator from './route';
import {Provider, connect} from 'react-redux';
import {addNavigationHelpers} from 'react-navigation';
import store from './configStore';

const App = ({dispatch, nav}) => {
  return(
    <Navigator
      navigation = {addNavigationHelpers({
        dispatch,
        state: nav
      })}
    />
  )
}
const mapStateToProps = (state) => {
  return {
    nav: state.nav
  }
}
const AppWithNavigation = connect(mapStateToProps)(App)

export default class AppCom extends Component {
  render(){
    return(
      <Provider store = {store}>
        <AppWithNavigation/>
    </Provider>
    )
  }
}
