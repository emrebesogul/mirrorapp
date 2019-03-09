import React from 'react'
import {AsyncStorage} from "react-native";
import {initializeSocket} from './frontendConfig';

import {
    View,
    Text
} from 'react-native';

import deviceStorage from './deviceStorage';

export default class InitializingQR extends React.Component {
    async componentDidMount() {
        let server_address = await deviceStorage.getItem("server_address");
        if (server_address) {
            this.props.navigation.navigate('Initializing'); // go to Initializing page to check if webtoken is present
        } else {
            this.props.navigation.navigate('QRScanner'); // go to QR-Code scanning page
        }
    }

    render() {
        return (
            <View>
                <Text>Loading IP Address</Text>
            </View>
        )
    }
}
