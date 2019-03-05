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

const AppStackNavigator = createStackNavigator({
    InitializingQR: InitializingQR,
    Initializing: Initializing,
    Register: Register,
    Home: Home,
    DragDropApp: DragDropApp,
    Settings: Settings,
    Wunderlist: Wunderlist,
    QRScanner: QRScanner,
    Login: Login
});

const App = createAppContainer(AppStackNavigator);

export default App;
