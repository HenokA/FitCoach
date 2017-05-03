import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ListView,
  Alert,
  AsyncStorage,
} from 'react-native';

const ProfileView = React.createClass({
  // getInitialState(){
  //   return {
  //     var dataSource = new ListView.DataSource(
  //       {rowHasChanged: (r1, r2) => r1 !== r2});
  //     this.state = {
  //       dataSource: dataSource.cloneWithRows([
  //         'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
  //       ])
  //     }; 
  //   } 
  // },
  
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.messageBox}>
          <Image
            style={styles.avatar}
            source={{uri: this.props.profile.picture}}
          />
          <Text style={styles.header}>Welcome {this.props.profile.name}</Text>
          <Text style={styles.title}>Average Daily Steps: {this.props.profile.averageDailySteps}</Text>
          <Text style={styles.title}>Running Stride {this.props.profile.strideLengthRunning}cm</Text>
          <Text style={styles.title}>Walking Stride: {this.props.profile.strideLengthWalking}cm </Text>
          <Text style={styles.title}>Weight: {this.props.profile.weight}lbs </Text>
          <Text style={styles.title}>Top Badge: {this.props.profile.topBadges}</Text>

        </View>

        <View style={styles.buttons}>
          <TouchableHighlight
            style={styles.goalButton}
            underlayColor='#949494'
            onPress={this._onGoalClick}>
            <Text>Set Goals</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.callApiButton}
            underlayColor='#949494'
            onPress={this._onCallApi}>
            <Text>Get Info</Text>
          </TouchableHighlight>
        </View>

      </View>
    );
  },
  _onCallApi: function() {
    fetch('https://api.fitbit.com/1/user/228BJ7/profile.json', {
        method: "POST",
        headers: new Headers({
          'Authorization': 'Bearer ' + this.props.token.idToken,
          'Content-Type': 'base64',
        }),
      }
    )
      .then((response) => response.text())
      .then((responseText) => {
        console.log(responseText),
        Alert.alert(
          'Request Successful',
          'We got the secured data successfully',
          [
            {text: 'OK'},
          ]
        )
      })
      .catch((error) => {
        Alert.alert(
          'Request Failed',
          'Please download the API seed so that you can call it',
          [
            {text: 'OK'},
          ]
        )
      });
  },
  _onGoalClick: function(){
    this.props.navigator.push({
        name: 'Goals',           
        passProps: {
          profile: this.props.profile,
          token: this.props.token,
        }
      });
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#2f3f43',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttons:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',

  },
  header:{
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
    color: '#FFFFFF',
    fontFamily: 'Helvetica',
    fontWeight: 'bold'
  },
  messageBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  badge: {
    alignSelf: 'center',
    height: 110,
    width: 102,
    marginBottom: 80,
  },
  avatar: {
    alignSelf: 'center',
    height: 128,
    width: 200,
  },
  title: {
    fontSize: 17,
    textAlign: 'center',
    marginTop: 20,
    color: '#FFFFFF',
  },
  callApiButton: {
    height: 30,
    alignSelf: 'auto',
    backgroundColor: '#00b0b9',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalButton: {
    height: 30,
    alignSelf: 'auto',
    backgroundColor: '#74ae46',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

module.exports = ProfileView;
