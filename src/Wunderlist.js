import React, {Component} from 'react';
import {TextInput, View, Text, AsyncStorage, TouchableOpacity} from "react-native";

import styles from "./styles";
import {getWunderlistSettings} from "../api/get";
import {uploadWunderlistSettings} from "../api/post";
import {showAlert} from "../utils";
import responseMessages from '../responseMessages';
import {sendSocketMessage} from './socketConnection';

export default class Wunderlist extends Component {

    static navigationOptions = {
        header: null,
        gesturesEnabled: false
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
            let userId = await AsyncStorage.getItem("userId");
            await sendSocketMessage('send_wunderlist_settings', {
                userId: userId
            });

        } else {
            showAlert("Error!", responseMessages.WUNDERLIST_UPLOAD_ERROR);
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.headerBar}>
                    <Text style={styles.headerTitle}>To Do List</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.contentText}>Please register with your Google Account on
                        https://developer.wunderlist.com/ and insert your CLIENT ID and ACCESS TOKEN in the fields
                        below
                    </Text>

                    <TextInput style={styles.input} placeholder="To Do List" placeholderTextColor='white' value={this.state.todoList} autoCapitalize="none"
                               autoCorrect={false} onChangeText={(todoList) => this.setState({todoList})}/>

                    <TextInput style={styles.input} placeholder='ACCESS TOKEN' placeholderTextColor='white' value={this.state.wl_access_token} autoCapitalize="none"
                               autoCorrect={false}
                               onChangeText={(wl_access_token) => this.setState({wl_access_token})}/>

                    <TextInput style={styles.input} placeholder='CLIENT ID' placeholderTextColor='white' value={this.state.wl_client_id} autoCapitalize="none"
                               autoCorrect={false} onChangeText={(wl_client_id) => this.setState({wl_client_id})}/>



                    <TouchableOpacity style={styles.button} onPress={this.processUploadWunderlistSettings}>
                        <Text style={styles.buttonText} >Setup To Do Widget</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}
