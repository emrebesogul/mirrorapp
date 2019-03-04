import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation'

import InitializingQR from './src/InitializingQR';
import Initializing from './src/Initializing';
import Login from './src/Login';
import Register from './src/Register';
import Home from './src/Home';
import DragDropApp from "./src/DragDropApp";
import Settings from "./src/Settings";
import Wunderlist from "./src/Wunderlist";
import FakePage from "./src/FakePage";

const AppStackNavigator = createStackNavigator({
    InitializingQR: InitializingQR,
    Initializing: Initializing,
    Login: Login,
    Register: Register,
    Home: Home,
    DragDropApp: DragDropApp,
    Settings: Settings,
    Wunderlist: Wunderlist,
    FakePage: FakePage
});

const App = createAppContainer(AppStackNavigator);

export default App;
