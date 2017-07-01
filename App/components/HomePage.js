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

class HomeCom extends Component {
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
    this.props.getData(this.props.info, 'https://api.twitter.com/1.1/statuses/home_timeline.json');
  }

  componentWillReceiveProps(newProps){
    if(newProps.data.dataAPI.length != 0){
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newProps.data.dataAPI),
      });
    }
  }

  renderRow (rowData){
    console.log(rowData);
    return (
      <View style={{marginBottom: 3, backgroundColor: 'white', flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Image
            style={{borderRadius: 45, width: 45, height: 50, margin: 5}}
            source={{uri: rowData.user.profile_image_url}}
          />

        </View>

        <View style={{flex: 6}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{}}>
              {rowData.user.name}
            </Text>
            <Text style={{marginLeft: 5}}>
              @{rowData.user.screen_name}
            </Text>
          </View>

          <Text style={{}}>
            {rowData.text}
          </Text>

          <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
              <Icon name="ios-chatbubbles-outline" size={20}/>
              <View style={{flexDirection: 'row'}}>
                <Icon name="md-repeat" size={20}/>
                <Text style={{}}>{rowData.retweet_count}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Icon name="md-heart-outline" size={20}/>
                <Text style={{}}>{rowData.favorite_count}</Text>
              </View>
          </View>
        </View>
      </View>
    )
  }

  _header(){
    return(
      <View style={styles.header}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('DrawerOpen')}>
          <Image
            style={{width: 50, height: 50}}
            source={require('../images/Twitter_white.png')}
          />
        </TouchableOpacity>
        <Text style={{}}>
          Home
        </Text>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {this._header()}
        <View style={{flex: 9, backgroundColor: 'white'}}>
          <ListView
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
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#1DA1F2',
    justifyContent: 'flex-start',
    alignItems: 'center',
    elevation: 2
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeCom)
