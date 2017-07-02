/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {doLogin} from '../action/loginAction';
import {connect} from 'react-redux';

class LoginCom extends Component {
  static navigationOptions = {
    title: "Twitter",
    headerTintColor: '#1DA1F2',
    headerColor: 'black'
  };
  componentWillReceiveProps(newProps) {
    if(newProps.login.isLogin){
      this.props.navigation.navigate('Home_Screen');
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 100, height: 100}}
          source={require('../images/Twitter.png')}
        />
        <Icon.Button
          name="twitter"
          backgroundColor="#1DA1F2"
          onPress = {() => this.props.doLogin()}
          >
          Sign in with Twitter
        </Icon.Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white'
  },
});

const mapStateToProps = (state) => {
  return {
    login: state.loginReducer
  }
}
function mapDispatchToProps(dispatch) {
  return {
    doLogin: () => dispatch(doLogin())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginCom);
