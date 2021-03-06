import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';

import WelcomeView from './welcome-view';
import ProfileView from './profile-view';
import GoalsView from './goals-view';

class Auth0Sample extends Component {
  render() {
      return (
        <Navigator style={styles.navigator}
          initialRoute={{ name: "Welcome"}}
          renderScene= { this.renderScene }
          navigationBar={
             <Navigator.NavigationBar
               style={ styles.nav }
               routeMapper={NavigationBarRouteMapper} />
             }
        />
    );
  }

  renderScene(route, navigator) {
    if (route.name == "Welcome") {
      return <WelcomeView navigator={navigator} {...route.passProps} />
    }
    if (route.name == "Profile") {
      return <ProfileView navigator={navigator} {...route.passProps} />
    }
    if (route.name == "Goals") {
      return <GoalsView navigator={navigator} {...route.passProps} />
    }
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if(index > 0) {
      return (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => { if (index > 0) { navigator.pop() } }}>
          <Text style={ styles.leftNavButtonText }>Back</Text>
        </TouchableHighlight>)
    }
    else { return null }
  },

  RightButton(route, navigator, index, navState) {
    return null
  },

  Title(route, navigator, index, navState) {
    return <Text style={ styles.title }>FitCoach</Text>
  }
};

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  title: {
    marginTop:23,
    fontSize:18,
    textAlign: 'center'
  },
  leftNavButtonText: {
   	fontSize: 18,
    marginLeft:7,
    marginTop:7
  },
  rightNavButtonText: {
    fontSize: 18,
    marginRight:13,
    marginTop:2
  },
  nav: {
    height: 40,
    backgroundColor: '#e2e2e2'
  }
});

AppRegistry.registerComponent('Auth0Sample', () => Auth0Sample);
