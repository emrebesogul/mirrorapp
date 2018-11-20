import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    AsyncStorage
} from "react-native";

import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import deviceStorage from './deviceStorage';

class Home extends Component {

  static navigationOptions = {
      header: null
  }

  logout = async () => {
    try {
      console.log('user successfully signed out!')
      deviceStorage.saveItem("access_token", "empty");
      this.props.navigation.navigate('Login');
    } catch (err) {
      console.log('error signing out...: ', err)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello from Home screen.</Text>
        <Button
          onPress={this.logout}
          title="Sign Out"
        />
      </View>
    );
  }
}

class Settings extends Component {

  static navigationOptions = {
      header: null
  }

  logout = async () => {
    try {
      console.log('user successfully signed out!')
      deviceStorage.saveItem("access_token", "empty");
      this.props.navigation.navigate('Login');
    } catch (err) {
      console.log('error signing out...: ', err)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello from Settings screen.</Text>
        <Button
          onPress={this.logout}
          title="Sign Out"
        />
      </View>
    );
  }
}


export default createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-home" color={tintColor} size={24} />
      )
    },
    header: {
      visible: false,
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-settings" color={tintColor} size={24} />
      )
    },
    header: {
      visible: false,
    },
  }
}, {
    initialRouteName: 'Home',
    // order: ['Settings', 'Home'],
    activeTintColor: 'white',
    shifting: true
  })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
