import React, { Component } from 'react';

import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text,
  AsyncStorage,
} from 'react-native';

import Auth0Lock from 'react-native-lock';

var credentials = require('./auth0-credentials');

var lock = new Auth0Lock(credentials);

var WelcomeView = React.createClass({
    render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.messageBox}>
          <Image
            style={styles.badge}
            source={require('./img/fitbit_logo.png')}
          />
          <Text style={styles.header}>Welcome to Fit Coach</Text>
          <Text style={styles.title}> Let's discover your goals, together. </Text>
        </View>

        <TouchableHighlight
          style={styles.signInButton}
          underlayColor='#949494'
          onPress={this._onLogin}>
          <Text>Log In</Text>
        </TouchableHighlight>
      </View>
    );
  },
  _onLogin: function() {
    lock.show({
      closable: true,
    }, (err, profile, token, heartrate) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("topBadges: "+profile.topBadges);
      if(AsyncStorage.getItem(token.idToken) == null){
        try{
          AsyncStorage.setItem(token.idToken, [profile,{avgsteps:0}]);
        }catch (error) {
          this._appendMessage('AsyncStorage error: ' + error.message);
        }
      }
      console.log("example storage: " + AsyncStorage.getItem(token.idToken));
      this.props.navigator.push({
        name: 'Profile',           
        passProps: {
          profile: profile,
          token: token,
        }
      });
    });
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#2f3f43',
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
    justifyContent: 'center',
  },
  badge: {
    alignSelf: 'center',
    height: 169,
    width: 140,
  },
  title: {
    fontSize: 17,
    textAlign: 'center',
    marginTop: 8,
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    marginTop: 4,
    color: '#FFFFFF',
  },
  signInButton: {
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: '#D9DADF',
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = WelcomeView;
