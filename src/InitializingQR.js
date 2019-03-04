import React from 'react'
import {AsyncStorage} from "react-native";

import {
    View,
    Text
} from 'react-native';

import deviceStorage from './deviceStorage';
import styles from './styles';

export default class InitializingQR extends React.Component {
    async componentDidMount() {
        const ip_address = await deviceStorage.getItem("ip_address");
        if (ip_address) {
            this.props.navigation.navigate('Initializing'); // go to Initializing page to check if webtoken is present
        } else {
            this.props.navigation.navigate('FakePage'); // go to QR-Code scanning page
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
