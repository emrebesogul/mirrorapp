import React from 'react'
import styles from './styles';

import {
    View,
    Text,
} from 'react-native';

import {Platform, Dimensions} from 'react-native';
import {createDrawerNavigator, createAppContainer} from 'react-navigation';
import Settings from './Settings';
import Wunderlist from './Wunderlist';
import DragDropApp from './DragDropApp';
import Weather from './Weather';

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
    drawerWidth: WIDTH*0.5,

}

class NewHome extends React.Component {

    render() {
        return (
            <NewHomeNavigator />
        )
    }
}

const NewHomeNavigator = createDrawerNavigator({
    DragDropApp: {screen: DragDropApp, navigationOptions: {drawerLabel: () => null}},
    Settings: {screen: Settings},
    Wunderlist: {screen: Wunderlist},
    Weather: {screen: Weather}
}, DrawerConfig)

export default createAppContainer(NewHomeNavigator);
