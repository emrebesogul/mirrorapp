import React, {Component} from 'react';
import {Button, View, Text, TextInput, NativeModules} from "react-native";
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
            newPassword: "",
            displayMessage: false,
            message: ""
        }
    }

    onChangeText = (key, value) => {
        this.setState({[key]: value})
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

    updatePassword = async () => {
        showAlert("Feature not implemented...");
    }

    mirrorUnpair = async () => {
        deviceStorage.saveItem("access_token", "");
        AsyncStorage.removeItem("server_address");
        NativeModules.DevSettings.reload();
    }

    logout = async () => {
        deviceStorage.saveItem("access_token", "");
        NativeModules.DevSettings.reload();
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.headerBar}>
                    <MenuButton navigation={this.props.navigation}/>
                    <Text style={styles.headerTitle}>Settings</Text>
                    <Text style={styles.toolbarButton}></Text>
                </View>

                <View style={styles.content}>
                    <TextInput
                        style={styles.input}
                        placeholder='New Password'
                        autoCapitalize="none"
                        secureTextEntry={true}
                        placeholderTextColor='white'
                        onChangeText={val => this.onChangeText('newPassword', val)}
                    />
                    <Button title="Update Password!" color="#C0C0C0" onPress={this.updatePassword} />

                    {this.state.displayMessage ?
                        <View><Button title={this.state.message} color="#C0C0C0" disabled={true} onPress={(e) => {
                            console.log("Triggering face id")
                        }
                        }/></View> :
                        <Button title="Create new Face ID" color="#C0C0C0" onPress={this.handleCreateFaceId.bind(this)}/>}

                    <Button title="Unpair this mirror!" color="#C0C0C0" onPress={this.mirrorUnpair} />
                    <Button title="Sign me Out!" color="#C0C0C0" onPress={this.logout} />
                </View>
            </View>
        );
    }
}
