import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation'

import InitializingQR from './src/InitializingQR';
import Initializing from './src/Initializing';
import Register from './src/Register';
import Home from './src/Home';
import QRScanner from "./src/QRScanner";
import Login from "./src/Login";

const AppStackNavigator = createStackNavigator({
    InitializingQR: {screen: InitializingQR, navigationOptions: {headerLeft: null}},
    Initializing: {screen: Initializing, navigationOptions: {headerLeft: null}},
    Register: {screen: Register, navigationOptions: {headerLeft: null}},
    Home: {screen: Home, navigationOptions: {headerLeft: null}},
    QRScanner: {screen: QRScanner, navigationOptions: {headerLeft: null}},
    Login: {screen: Login, navigationOptions: {headerLeft: null}}
});

const AppContainer = createAppContainer(AppStackNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
