/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

class ProfileCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUser: {},
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.info.isLogin == true){
      this.setState({
        dataUser: newProps.info.info.user,
      });
    }
  }
  render() {
      const user = this.state.dataUser;
      return (
        <View style={styles.container}>
          <Image
            style={styles.mainIcon}
            source={{uri: user.profile_image_url}}
          />
          <Text style={styles.name}>
            {user.name}
          </Text>
          <Text style={{}}>
            @{user.screen_name}
          </Text>

          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Text style={styles.number}>
              {user.friends_count}
            </Text>
            <Text style={styles.follow}>
              Following
            </Text>
            <Text style={[styles.number, {marginLeft: 10}]}>
              {user.followers_count}
            </Text>
            <Text style={styles.follow}>
              Followers
            </Text>
          </View>

          <TouchableOpacity
            onPress={()=> this.props.navigation.navigate('Profile_Screen')}
            style = {styles.button}
            >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  name="perm-identity" size={30} color='black'
                />
                <Text style={styles.titleButton}>
                  Profile
                </Text>
            </View>
          </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Home_Screen')}
          style = {styles.button}
          >
          <View style={{flexDirection: 'row' , alignItems: 'center'}}>
              <Icon
                name="home" size={30} color='black'
              />
              <Text style={styles.titleButton}>
                Home Timeline
              </Text>
          </View>
        </TouchableOpacity>

        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 25,
    flex: 1,
  },
  mainIcon:{
    marginTop: 15,
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
  },
  name: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "800",
    color: 'black'
  },
  number: {
    fontWeight: "600",
    color: 'black'
  },
  follow: {
    marginLeft: 5
  },
  button: {
    marginTop: 25
  },
  titleButton: {
    fontSize: 18,
    fontWeight: "200",
    marginLeft: 10
  }
});
const mapStateToProps = (state) => {
  return {
    info : state.loginReducer,
  }
}
export default connect(mapStateToProps)(ProfileCom);
