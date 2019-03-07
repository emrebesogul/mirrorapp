import React from 'react'
import {AsyncStorage} from "react-native";
import styles from './styles';
import deviceStorage from './deviceStorage';

import {
    View,
    Text
} from 'react-native';

export default class InitializingQR extends React.Component {

    async componentDidMount() {
        let server_address = await deviceStorage.getItem("server_address");
        await deviceStorage.saveItem("server_address", "http://localhost:5000");    // just for debugging

        if (server_address) {
            this.props.navigation.navigate('Initializing'); // go to Initializing page to check if webtoken is present
        } else {
            this.props.navigation.navigate('QRScanner'); // go to QR-Code scanning page
        }
    }

    render() {
        return (
            <View style={styles.initializing}>
                <Text style={styles.initializingText}>Loading IP Address of Smart Mirror...</Text>
            </View>
        )
    }
}
