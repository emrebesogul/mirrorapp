import React, {Component} from "react";
import {
    View,
    Text,
    Button
} from "react-native";

import {createBottomTabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import deviceStorage from './deviceStorage';

import styles from './styles';

import {getUserData} from "../api/get";

import Wunderlist from './Wunderlist';
import Settings from './Settings';
import DragDropApp from './DragDropApp';
import Weather from './Weather';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: ""
        };
    }

    async componentDidMount() {
        let response = await getUserData();
        if (response.status === true) {
            this.setState({
                username: response.username
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome: {this.state.username}</Text>
                <Text>Hello from Home screen.</Text>
            </View>
        );
    }
}


//
//
//

export default createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-home" color={tintColor} size={24}/>
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
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-settings" color={tintColor} size={24}/>
            )
        },
        header: {
            visible: false,
        },
    },
    Wunderlist: {
        screen: Wunderlist,
        navigationOptions: {
            tabBarLabel: 'Wunderlist',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-settings" color={tintColor} size={24}/>
            )
        },
        header: {
            visible: false,
        },
    },
    Weather: {
        screen: Weather,
        navigationOptions: {
            tabBarLabel: 'Weather',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-settings" color={tintColor} size={24}/>
            )
        },
        header: {
            visible: false,
        },
    },
    DragDropApp: {
        screen: DragDropApp,
        tabBarLabel: 'DragDropApp',
        tabBarIcon: ({tintColor}) => (
            <Icon name="ios-home" color={tintColor} size={24}/>
        )
    }
}, {
    initialRouteName: 'Home',
    // order: ['Settings', 'Home'],
    activeTintColor: 'white',
    shifting: true
})
