import React, {Component} from 'react';
import {
    Dimensions,
    Text,
    View,
    StyleSheet
} from 'react-native';
import {BarCodeScanner, Permissions} from 'expo';
import styles from './styles';
import deviceStorage from "./deviceStorage";
import {connectSocket} from './socketConnection';
import {isMirrorURL} from "../utils";

export default class App extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        hasCameraPermission: null
    };

    componentDidMount() {
        this._requestCameraPermission();
    }

    _requestCameraPermission = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };

    _handleBarCodeRead = result => {
        if (isMirrorURL(result.data)) {
            deviceStorage.saveItem("server_address", result.data);
            connectSocket();
            this.props.navigation.navigate('Register');
        }
    };

    render() {
        return (
            <View style={[styles.container, {'alignItems': 'center'}]}>

                <View>
                    <Text style={styles.qrCodeText}>Hello and welcome to MirrorApp. Scan the QR Code on your Smart
                        Mirror to get started.</Text>
                </View>

                {this.state.hasCameraPermission === null
                    ? <Text>Please allow camera usage to connect to your mirror</Text>
                    : this.state.hasCameraPermission === false
                        ? <Text style={{color: '#fff'}}>
                            Camera permission is not granted
                        </Text>
                        : <BarCodeScanner
                            onBarCodeRead={this._handleBarCodeRead}
                            style={{
                                height: Dimensions.get('window').height / 2,
                                width: Dimensions.get('window').width / 1.25,
                            }}
                        />}
            </View>
        );
    }
}
