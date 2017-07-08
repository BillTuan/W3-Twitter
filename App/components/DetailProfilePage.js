/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ListView,
  RefreshControl
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import CellData from './CellListView';

import {connect} from 'react-redux';
import {fetchDataProfile} from '../action/fetchDataProfile';

class Header extends Component {
  render() {
    const {user} = this.props.info;
    return(
      <View style={styles.header}>
        <View style={{flex: 3}}>
          <Image
            style={{flex: 1, resizeMode: 'stretch'}}
            source={{uri: user.profile_banner_url}}
          >
            <TouchableOpacity
              onPress={() => this._backToHome()}
              style = {{padding: 8}}
              >
              <Icon name="ios-arrow-back-outline" size={40} color="white"/>
            </TouchableOpacity>

            <Image
              style={{width: 60, height: 60, borderRadius: 50, borderWidth:3 , borderColor: 'white', margin: 23}}
              source={{uri: user.profile_image_url}}
            />
          </Image>
        </View>
        <View style={{flex: 2, flexDirection: 'row'}}>
          <View style={{flex: 1, marginTop: 20, marginLeft: 10}}>
            <Text style={styles.name}>
              {user.name}
            </Text>
            <Text style={styles.screenName}>
              {user.screen_name}
            </Text>
          </View>
          <View style={{flex: 2, flexDirection: 'row', justifyContent: 'space-around', marginTop: 15}}>
            <Text style={styles.number}>
              {user.statuses_count}
            </Text>
            <Text style={styles.follow}>
              Tweet
            </Text>
            <Text style={styles.number}>
              {user.friends_count}
            </Text>
            <Text style={styles.follow}>
              Following
            </Text>
            <Text style={styles.number}>
              {user.followers_count}
            </Text>
            <Text style={styles.follow}>
              Follower
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

class DetailProfileCom extends Component {
  static navigationOptions =  ({navigation}) => ({
    header: null,
    tabBarIcon: ({tintColor}) => (
        <Image
          style={{ resizeMode: 'contain', flex: 1, tintColor: tintColor}}
          source={require('../images/profile.png')}
        />
    )
  });

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      refreshing: false
    };
  }

  componentWillMount() {
    this.props.getData(this.props.info, 'https://api.twitter.com/1.1/statuses/user_timeline.json');
  }

  componentWillReceiveProps(newProps){
    if(newProps.data.dataAPI.length != 0){
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newProps.data.dataAPI),
      });
    }
  }


  renderRow(rowData){
    return (
      <CellData rowData={rowData} passProps={this.props}/>
    )
  }

  _onRefresh(){
    this.setState({
      refreshing: true,
    });
    this.props.getData(this.props.info, 'https://api.twitter.com/1.1/statuses/user_timeline.json');
    this.setState({
        refreshing: false,
    });
  }
  _header() {
    const {user} = this.props.info;

    return(
      <View style={styles.header}>
        <View style={{flex: 3}}>
          <Image
            style={{flex: 1, resizeMode: 'stretch'}}
            source={{uri: user.profile_banner_url}}
          >
            <TouchableOpacity
              onPress={() =>  this.props.navigation.goBack()}
              style = {{padding: 8}}
              >
              <Icon name="ios-arrow-back-outline" size={40} color="white"/>
            </TouchableOpacity>

            <Image
              style={{width: 60, height: 60, borderRadius: 50, borderWidth:3 , borderColor: 'white', margin: 23}}
              source={{uri: user.profile_image_url}}
            />
          </Image>
        </View>
        <View style={{flex: 2, flexDirection: 'row'}}>
          <View style={{flex: 1, marginTop: 20, marginLeft: 10}}>
            <Text style={styles.name}>
              {user.name}
            </Text>
            <Text style={styles.screenName}>
              {user.screen_name}
            </Text>
          </View>
          <View style={{flex: 2, flexDirection: 'row', justifyContent: 'space-around', marginTop: 15}}>
            <Text style={styles.number}>
              {user.statuses_count}
            </Text>
            <Text style={styles.follow}>
              Tweet
            </Text>
            <Text style={styles.number}>
              {user.friends_count}
            </Text>
            <Text style={styles.follow}>
              Following
            </Text>
            <Text style={styles.number}>
              {user.followers_count}
            </Text>
            <Text style={styles.follow}>
              Follower
            </Text>
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this._header()}
        <View style={{flex: 7}}>
          <ListView
            refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                />
              }
            style={{flex: 1}}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => this.renderRow(rowData)}
            enableEmptySections={true}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 4,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'black'
  },
  name: {
    fontSize: 20,
    fontWeight: "800",
    color: 'black'
  },
  number: {
    fontWeight: "600",
    color: 'black'
  },
  follow: {
    marginLeft: -5
  }
});

const mapStateToProps = (state) => {
  return {
    data: state.dataProfile,
    info: state.loginReducer.info
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getData: (info, apiLink) => dispatch(fetchDataProfile(info, apiLink))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailProfileCom)
