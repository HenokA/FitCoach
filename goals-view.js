import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  ListView,
  Alert,
  AsyncStorage,
} from 'react-native';

const GoalsView = React.createClass({
  
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.messageBox}>

          <Text style={styles.header}>{this.props.profile.firstName}, let's set some goals!</Text>
          <Text style={styles.title}>Goals</Text>
          <Text style={styles.title}>Average steps per day: </Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={this.changeSteps}/>
          <Text style={styles.title}>Number of Badges: </Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={this.changeSteps}/>
              

        </View>
        
      </View>
    );
  },
  changeSteps: (text) => {
    try{
      var item = AsyncStorage.getItem(this.props.token.idToken);
      item[1].avgsteps = text;
    }catch (error) {
      this._appendMessage('AsyncStorage error: ' + error.message);
    }
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
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#2f3f43',
    padding: 12,
    alignItems: 'center',
  },
  header:{
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
    color: '#FFFFFF',
    fontFamily: 'Helvetica',
    fontWeight: 'bold'
  },
  input:{
    marginLeft: 12,
    fontSize: 16,
    marginRight: 12
  },
  messageBox: {
    flex: 1,
    justifyContent: 'center',
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
    width: 240,
  },
  title: {
    fontSize: 17,
    textAlign: 'center',
    marginTop: 20,
    color: '#FFFFFF',
  },
  callApiButton: {
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: '#D9DADF',
    margin: 10,
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

module.exports = GoalsView;
