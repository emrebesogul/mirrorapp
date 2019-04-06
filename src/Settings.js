import React, {Component} from 'react';
import {View, Text} from "react-native";
import styles from "./styles";
import deviceStorage from "./deviceStorage";
import {sendSocketMessage, handleSocketMessage} from './socketConnection';
import {AsyncStorage, TouchableOpacity} from 'react-native';

export default class Settings extends Component {

    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props) {
        super(props);
        this.state = {
            displayMessage: false,
            message: ""
        }
    }

    async handleCreateFaceId() {
        const access_token = await AsyncStorage.getItem("access_token");
        await sendSocketMessage("app_trigger_face_id", {
            token: access_token
        });
        let app = this;
        await handleSocketMessage('wait_trigger_face_id', function (data) {
            app.setState({
                message: data.message,
                displayMessage: data.displayMessage
            })
        });
    }

    mirrorUnpair = async () => {
        deviceStorage.saveItem("access_token", "");
        AsyncStorage.removeItem("server_address");
        Expo.Util.reload();
    }

    logout = async () => {
        deviceStorage.saveItem("access_token", "");
        Expo.Util.reload();
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.headerBar}>
                    <Text style={styles.headerTitle}>Settings</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.contentText}>In order to use Face Recognition to unlock your Smart Mirror, you need to create a Face ID. Stand in front of the Mirror and press the Button below. Look into the Camera of the Mirror.</Text>
                    {this.state.displayMessage ?
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Processing Images. This may take several minutes</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.button} onPress={this.handleCreateFaceId.bind(this)}>
                            <Text style={styles.buttonText}>Create New Face ID</Text>
                        </TouchableOpacity>
                    }

                    <Text style={styles.contentText}>You can Unpair this App from the currently paired Smart Mirror by pressing the Button below. This will take you back to the QR Code Scanner.</Text>

                    <TouchableOpacity onPress={this.mirrorUnpair} style={styles.button}>
                        <Text style={styles.buttonText}>Unpair</Text>
                    </TouchableOpacity>

                    <Text style={styles.contentText}>Logout of the existing User Profile by clicking the Button below.</Text>

                    <TouchableOpacity style={styles.button} onPress={this.logout}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
