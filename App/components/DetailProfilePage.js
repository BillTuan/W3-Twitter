/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ListView
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {connect} from 'react-redux';
import {fetchData} from '../action/fetchDataAction';

class DetailProfileCom extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentDidMount() {
    this.props.getData(this.props.info, 'https://api.twitter.com/1.1/statuses/user_timeline.json');
  }


  _backToHome(){
    this.props.getData(this.props.info, 'https://api.twitter.com/1.1/statuses/home_timeline.json');
    this.props.navigation.goBack();
  }
  _header(){
    return(
      <View style={styles.header}>
        <View style={{flex: 2}}>
          <Image
            style={{flex: 1, resizeMode: 'stretch'}}
            source={{uri: this.props.info.user.profile_banner_url}}
          >
            <TouchableOpacity
              onPress={() => this._backToHome()}
              style = {{padding: 8}}
              >
              <Icon name="ios-arrow-back-outline" size={40} color="white"/>
            </TouchableOpacity>

            <Image
              style={{width: 60, height: 60, borderRadius: 50, borderWidth:3 , borderColor: 'white', margin: 23}}
              source={{uri: this.props.info.user.profile_image_url}}
            />
          </Image>
        </View>
        <View style={{flex: 1,}}>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this._header()}
        <View style={{flex: 7}}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 3,
    backgroundColor: 'white'
  }
});

const mapStateToProps = (state) => {
  return {
    data: state.dataReducer,
    info: state.loginReducer.info
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getData: (info, apiLink) => dispatch(fetchData(info, apiLink))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailProfileCom)
