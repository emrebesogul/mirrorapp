// init step: check if jwt_token of user is set
// skip auth step and go to main page

import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage
} from 'react-native';

import frontendConfig from './frontendConfig';
import deviceStorage from './deviceStorage';
import styles from './styles';

export default class Initializing extends React.Component {
    async componentDidMount() {
        try {
            // verify current token on backend
            const access_token = await AsyncStorage.getItem("access_token");
            fetch("http://" + frontendConfig.server_address + ':' + frontendConfig.socket_server_port + "/native/authizeToken", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + access_token
                },
                body: ""
            })
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    console.log(response);
                    if (response.authorized === true) {
                        this.props.navigation.navigate('Home'); // go to main page
                    } else {
                        deviceStorage.saveItem("access_token", ""); // set back saved token because could not been authorized
                        this.props.navigation.navigate('Login'); // go to auth page
                    }
                })
        } catch (err) {
            console.log('error: ', err);
            this.props.navigation.navigate('Login');
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
