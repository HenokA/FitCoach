import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Alert,
} from 'react-native';

var ProfileView = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.messageBox}>

          <Image
            style={styles.avatar}
            source={{uri: this.props.profile.picture}}
          />

          <Text style={styles.title}>Welcome {this.props.profile.name}</Text>
          <Text style={styles.title}>Age {this.props.profile.age}</Text>
          <Text style={styles.title}>Gender {this.props.profile.lastName}</Text>

        </View>
        <TouchableHighlight
          style={styles.callApiButton}
          underlayColor='#949494'
          onPress={this._onCallApi}>
          <Text>Get Info</Text>
        </TouchableHighlight>
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
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#15204C',
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
});

module.exports = ProfileView;
