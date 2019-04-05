import React from 'react'
import deviceStorage from './deviceStorage';
import styles from './styles';
import {authorizeToken} from "../api/post";

import {
    View,
    Text,
    BackHandler
} from 'react-native';

export default class Initializing extends React.Component {

    static navigationOptions = {
        header: null
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () => {return true});
    }

    async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {return true});

        let response = await authorizeToken();
        if (response.authorized === true) {
            this.props.navigation.navigate('Home'); // go to main page
        } else {
            deviceStorage.saveItem("access_token", ""); // set back saved token because could not been authorized
            this.props.navigation.navigate('Login'); // go to auth page
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.headerBar}>
                </View>

                <View style={styles.content}>
                    <Text style={styles.initializingText}>Loading user credentials...</Text>
                </View>
            </View>
        )
    }
}
