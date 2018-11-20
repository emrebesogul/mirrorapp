import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'

import Initializing from './src/Initializing';
import Login from './src/Login';
import Register from './src/Register';
import Home from './src/Home';
import Settings from './src/Settings';

const AppStackNavigator = createStackNavigator({
  Initializing: Initializing,
  Login: Login,
  Register: Register,
  Home: Home,
  Settings: Settings
});

const App = createAppContainer(AppStackNavigator);

export default App;
