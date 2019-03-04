// init step: check if jwt_token of user is set
// skip auth step and go to main page

import React from 'react'
import {
    View,
    Text
} from 'react-native';

import deviceStorage from './deviceStorage';
import styles from './styles';
import {authorizeToken} from "../api/post";

export default class Initializing extends React.Component {
    async componentDidMount() {
        let response = await authorizeToken();
        if (response.authorized === true) {
            this.props.navigation.navigate('Home'); // go to main page
        } else {
            deviceStorage.saveItem("access_token", ""); // set back saved token because could not been authorized
            this.props.navigation.navigate('QRScanner'); // go to auth page
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Loading</Text>
            </View>
        )
    }
}
