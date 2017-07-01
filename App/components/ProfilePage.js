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
          <Text style={{}}>
            {user.name}
          </Text>
          <Text style={{}}>
            @{user.screen_name}
          </Text>

          <View style={{flexDirection: 'row'}}>
            <Text style={{}}>
              {user.friends_count} Following
            </Text>
            <Text style={{}}>
              {user.followers_count} Followers
            </Text>
          </View>

          <TouchableOpacity onPress={()=> this.props.navigation.navigate('Profile_Screen')}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  name="perm-identity" size={30}
                />
                <Text style={{}}>
                  Profile
                </Text>
            </View>
          </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home_Screen')}>
          <View style={{flexDirection: 'row' , alignItems: 'center'}}>
              <Icon
                name="home" size={30}
              />
              <Text style={{}}>
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
    marginLeft: 15,
    flex: 1,
  },
  mainIcon:{
    marginTop: 15,
    width: 50,
    height: 50,
    borderRadius: 50
  }
});
const mapStateToProps = (state) => {
  return {
    info : state.loginReducer,
  }
}
export default connect(mapStateToProps)(ProfileCom);
