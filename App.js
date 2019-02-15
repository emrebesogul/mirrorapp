import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation'

import Initializing from './src/Initializing';
import Login from './src/Login';
import Register from './src/Register';
import Home from './src/Home';
import DragDropApp from "./src/DragDropApp";
import Settings from "./src/Settings";
import Wunderlist from "./src/Wunderlist";

const AppStackNavigator = createStackNavigator({
    Initializing: Initializing,
    Login: Login,
    Register: Register,
    Home: Home,
    DragDropApp: DragDropApp,
    Settings: Settings,
    Wunderlist: Wunderlist
});

const App = createAppContainer(AppStackNavigator);

export default App;
