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

                    {this.state.displayMessage ?
                        <Text style={styles.faceIdText} >{this.state.message}</Text> :
                        <TouchableOpacity style={styles.button} onPress={this.handleCreateFaceId.bind(this)}>
                            <Text style={styles.buttonText}>Create New Face ID</Text>
                        </TouchableOpacity>
                    }

                    <TouchableOpacity onPress={this.mirrorUnpair} style={styles.button}>
                        <Text style={styles.buttonText}>Unpair</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.logout}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
