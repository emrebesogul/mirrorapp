import React, {Component} from 'react';
import {Button, Text, TextInput, View} from "react-native";
import deviceStorage from "./deviceStorage";
import styles from "./styles";
import {getWunderlistSettings} from "../api/get";
import {uploadWunderlistSettings} from "../api/post";
import {showAlert} from "../utils";
import responseMessages from '../responseMessages';
import {socket} from './frontendConfig';

export default class Wunderlist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentWunderlistSettings: [],
            todoList: "",
            wl_access_token: "",
            wl_client_id: ""
        };
    }

    async componentDidMount() {
        let response = await getWunderlistSettings();
        if (response.status === true && response.settings) {
            this.setState({
                currentWunderlistSettings: response.settings,
                todoList: response.settings.todo_list,
                wl_access_token: response.settings.client_secret,
                wl_client_id: response.settings.client_id
            });
        }
    }

    processUploadWunderlistSettings = async () => {
        let response = await uploadWunderlistSettings(this.state.todoList, this.state.wl_access_token, this.state.wl_client_id);
        if (response.status === true) {
            showAlert("Success!", responseMessages.WUNDERLIST_UPLOAD_SUCCESS);
            // Send socket update to web ui
            socket.emit('send_wunderlist_settings', {
                message: "update your web ui...!"
            });

        } else {
            showAlert("Error!", responseMessages.WUNDERLIST_UPLOAD_ERROR);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Please register at https://developer.wunderlist.com/ and insert your CLIENT ID and ACCESS TOKEN in
                    the fields below</Text>
                <Text>Please insert your list for the Wunderlist App:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(todoList) => this.setState({todoList})}
                    value={this.state.todoList}
                />

                <Text>Please insert your ACCESS TOKEN for the Wunderlist App:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(wl_access_token) => this.setState({wl_access_token})}
                    value={this.state.wl_access_token}
                />

                <Text>Please insert your CLIENT ID for the Wunderlist App:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(wl_client_id) => this.setState({wl_client_id})}
                    value={this.state.wl_client_id}
                />

                <Button
                    title="Update your To Do List with the credentials and list above"
                    onPress={this.processUploadWunderlistSettings}
                />
            </View>
        );
    }
}
