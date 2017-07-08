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
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import {connect} from 'react-redux';
import {fetchData} from '../action/fetchDataAction';
import CellData from './CellListView';

class HomeCom extends Component {
  static navigationOptions = ({navigation}) => ({
    header: null,
    tabBarIcon: ({tintColor}) => (
        <Image
          style={{ resizeMode: 'contain', flex: 1, tintColor: tintColor}}
          source={require('../images/home.png')}
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
    return(
      <CellData rowData={rowData}/>
    )
  }

  _onRefresh(){
    this.setState({
      refreshing: true,
    });
    this.props.getData(this.props.info, 'https://api.twitter.com/1.1/statuses/home_timeline.json');
    this.setState({
        refreshing: false,
    });
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
        <Text style={styles.headerTitle}>
          Home
        </Text>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {this._header()}
        <View style={{flex: 9, backgroundColor: 'black'}}>
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
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#1DA1F2',
    justifyContent: 'flex-start',
    alignItems: 'center',
    elevation: 2
  },
  headerTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: "600",
    marginLeft: 30
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
