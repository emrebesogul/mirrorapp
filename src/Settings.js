import React, {Component} from 'react';
import {Button, View, Text, TextInput} from "react-native";
import { StackActions, NavigationActions } from 'react-navigation';
import MenuButton from './components/MenuButton';
import styles from "./styles";
import deviceStorage from "./deviceStorage";
import {sendSocketMessage, handleSocketMessage} from './socketConnection';
import {AsyncStorage} from 'react-native';
import {showAlert} from "../utils";

export default class Settings extends Component {

    static navigationOptions = {
        header: null
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
                        <View><Button title={this.state.message} color="white" disabled={true} onPress={(e) => {
                            console.log("Triggering face id")
                        }
                        }/></View> :
                        <Button title="Create new Face ID!" color="white" onPress={this.handleCreateFaceId.bind(this)}/>}

                    <Button title="Unpair this mirror!" color="white" onPress={this.mirrorUnpair} />
                    <Button title="Sign me Out!" color="white" onPress={this.logout} />
                </View>
            </View>
        );
    }
}
