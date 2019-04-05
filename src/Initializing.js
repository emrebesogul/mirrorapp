import React from 'react'
import deviceStorage from './deviceStorage';
import styles from './styles';
import {authorizeToken} from "../api/post";

import {
    View,
    Text
} from 'react-native';

export default class Initializing extends React.Component {

    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
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
