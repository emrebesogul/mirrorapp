import React from 'react'
import styles from './styles';
import deviceStorage from './deviceStorage';
import {AsyncStorage} from 'react-native';

import {
    View,
    Text, TouchableOpacity
} from 'react-native';
import {connectSocket} from "./socketConnection";

export default class InitializingQR extends React.Component {

    async componentDidMount() {
        let server_address = await deviceStorage.getItem("server_address");

        if (server_address) {
            connectSocket();
            this.props.navigation.navigate('Initializing'); // go to Initializing page to check if webtoken is present
        } else {
            this.props.navigation.navigate('QRScanner'); // go to QR-Code scanning page
        }
    }

    processGoToQRScanner(e) {
        e.preventDefault();
        this.props.navigation.navigate('QRScanner');
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.headerBar}>
                </View>

                <View style={styles.content}>
                    <Text style={styles.initializingText}>Looking for a paired Smart Mirror... To scan a new QR Code, press the Button below.</Text>


                    <TouchableOpacity style={styles.button} onPress={this.processGoToQRScanner.bind(this)}>
                        <Text style={styles.buttonText}>Scan QR Code</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}
