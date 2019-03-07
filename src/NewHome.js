import React from 'react'
import styles from './styles';

import {
    View,
    Text,
} from 'react-native';

import {createDrawerNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import Wunderlist from './Wunderlist';

class NewHome extends React.Component {

    render() {
        return (
            <NewHomeNavigator />
        )
    }
}

const NewHomeNavigator = createDrawerNavigator({
    Home: {screen: HomeScreen},
    Settings: {screen: SettingsScreen},
    Wunderlist: {screen: Wunderlist}
})

export default createAppContainer(NewHomeNavigator);
