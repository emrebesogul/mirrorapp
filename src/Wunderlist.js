import React, {Component} from 'react';
import {Button, TextInput, View, Text} from "react-native";

import styles from "./styles";
import deviceStorage from "./deviceStorage";
import {getWunderlistSettings} from "../api/get";
import {uploadWunderlistSettings} from "../api/post";
import {showAlert} from "../utils";
import responseMessages from '../responseMessages';
import {socket} from './frontendConfig';
import MenuButton from './components/MenuButton';

export default class Wunderlist extends Component {

    static navigationOptions = {
        header: null
    }

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

                <View style={styles.headerBar}>
                    <MenuButton navigation={this.props.navigation} />
                    <Text style={styles.headerTitle}>To Do List</Text>
                    <Text style={styles.toolbarButton}></Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.contentText}>Please register with your Google Account at https://developer.wunderlist.com/ and insert your CLIENT ID and ACCESS TOKEN in the fields below</Text>
                    <TextInput style={styles.input} value={this.state.todoList} autoCapitalize="none" autoCorrect={false} onChangeText={(todoList) => this.setState({todoList})} />

                    <Text style={styles.contentText}>ACCESS TOKEN</Text>
                    <TextInput style={styles.input} value={this.state.wl_access_token} autoCapitalize="none" autoCorrect={false} onChangeText={(wl_access_token) => this.setState({wl_access_token})} />

                    <Text style={styles.contentText}>CLIENT ID</Text>
                    <TextInput style={styles.input} value={this.state.wl_client_id} autoCapitalize="none" autoCorrect={false} onChangeText={(wl_client_id) => this.setState({wl_client_id})} />

                    <Button title="Setup To Do Widget" onPress={this.processUploadWunderlistSettings} />
                </View>
            </View>

        );
    }
}
