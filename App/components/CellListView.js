/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

const like = require('../images/like.png');
const likeGif = require('../images/like_gif.gif');
const unlike = require('../images/unlike.png');

export default class CellDataCom extends Component {

  constructor(props) {
    super(props);

    this.state = {
      likeImage: unlike,
      likeStatus: false
    };
  }

  clickLike(){
    if(!this.state.likeStatus){
      this.setState({
        likeImage: likeGif,
        likeStatus: !this.state.likeStatus
      })

      setTimeout(() => {
        this.setState({
          likeImage: like,
        });
      }, 3200)
    }else{
      this.setState({
        likeImage: unlike,
        likeStatus: !this.state.likeStatus
      });
    }
  }
  render() {
    var rowData = this.props.rowData;
    var date = new Date(rowData.created_at);
    var time = moment(date).fromNow();
    return (
      <View style={{marginBottom: 1, backgroundColor: '#FFFFFF', flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Image
            style={{borderRadius: 50, width: 45, height: 45, margin: 5}}
            source={{uri: rowData.user.profile_image_url}}
          />
        </View>
        <View style={{flex: 5}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.name}>
              {rowData.user.name}
            </Text>
            <Text style={[styles.screenName,{marginLeft: 5}]}>
              @{rowData.user.screen_name} - {time}
            </Text>
          </View>

          <Text style={styles.text}>
            {rowData.text}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
              <Icon name="ios-chatbubbles-outline" size={20}/>
              <View style={{flexDirection: 'row'}}>
                <Icon name="md-repeat" size={20}/>
                <Text style={{color: 'black'}}> {rowData.retweet_count}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                  {/* <Icon name="md-heart-outline" size={20}/> */}
                  <TouchableOpacity onPress={() => this.clickLike()}>
                    <Image
                      style={{width: 20, height: 20}}
                      source={this.state.likeImage}
                    />
                  </TouchableOpacity>
                <Text style={{marginTop: 3, marginLeft: 3, color:'black'}}>{rowData.favorite_count}</Text>
              </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    color: 'black',
    fontWeight: '100',
    fontSize: 16
  },
  screenName: {
    fontSize: 15,
    marginTop: 1
  },
  text: {
    marginTop: 5,
    color: 'black'
  }
});
