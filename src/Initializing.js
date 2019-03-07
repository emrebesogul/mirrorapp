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

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () => {return true});
    }

    async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {return true});

        let response = await authorizeToken();
        if (response.authorized === true) {
            this.props.navigation.navigate('NewHome'); // go to main page
        } else {
            deviceStorage.saveItem("access_token", ""); // set back saved token because could not been authorized
            this.props.navigation.navigate('Login'); // go to auth page
        }
    }

    render() {
        return (
            <View style={styles.initializing}>
                <Text style={styles.initializingText}>Loading user credentials...</Text>
            </View>
        )
    }
}
