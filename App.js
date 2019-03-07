import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation'

import InitializingQR from './src/InitializingQR';
import Initializing from './src/Initializing';
import Register from './src/Register';
import Home from './src/Home';
import DragDropApp from "./src/DragDropApp";
import Settings from "./src/Settings";
import Wunderlist from "./src/Wunderlist";
import QRScanner from "./src/QRScanner";
import Login from "./src/Login";
import NewHome from "./src/NewHome";

const AppStackNavigator = createStackNavigator({
    InitializingQR: {screen: InitializingQR, navigationOptions: {headerLeft: null}},
    Initializing: {screen: Initializing, navigationOptions: {headerLeft: null}},
    Register: {screen: Register, navigationOptions: {headerLeft: null}},
    Home: {screen: Home, navigationOptions: {headerLeft: null}},
    DragDropApp: {screen: DragDropApp, navigationOptions: {headerLeft: null}},
    Settings: {screen: Settings, navigationOptions: {headerLeft: null}},
    Wunderlist: {screen: Wunderlist, navigationOptions: {headerLeft: null}},
    QRScanner: {screen: QRScanner, navigationOptions: {headerLeft: null}},
    Login: {screen: Login, navigationOptions: {headerLeft: null}},
    NewHome: {screen: NewHome, navigationOptions: {headerLeft: null}}
});

const App = createAppContainer(AppStackNavigator);

export default App;
