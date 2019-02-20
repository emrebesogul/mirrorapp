import React, {Component} from 'react';
import {Button, Text, TextInput, View} from "react-native";
import deviceStorage from "./deviceStorage";
import styles from "./styles";
import {showAlert} from "../utils";
import responseMessages from '../responseMessages';
import {socket} from './frontendConfig';

export default class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentCity: ""
        };
    }

    async componentDidMount() {
    /*
    let response = await getWunderlistSettings();
        if (response.status === true && response.settings) {
            this.setState({
                currentWunderlistSettings: response.settings,
                todoList: response.settings.todo_list,
                wl_access_token: response.settings.client_secret,
                wl_client_id: response.settings.client_id
            });
        }
    */
    }

    logout = async () => {
        deviceStorage.saveItem("access_token", "");
        this.props.navigation.navigate('Login');
    }

    processUploadWeatherSettings = async () => {
        /*
        let response = await uploadWunderlistSettings(this.state.todoList, this.state.wl_access_token, this.state.wl_client_id);
        if (response.status === true) {
            showAlert("Success!", responseMessages.WUNDERLIST_UPLOAD_SUCCESS);
            // Send socket update to web ui
            socket.emit('update_to_do_list', {
                message: "update your web ui...!"
            });

        } else {
            showAlert("Error!", responseMessages.WUNDERLIST_UPLOAD_ERROR);
        }
        */
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Please insert your city for the Weather widget:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(currentCity) => this.setState({currentCity})}
                    value={this.state.currentCity}
                />

                <Button
                    title="Update your Weather information for the city above"
                    onPress={this.processUploadWeatherSettings}
                />

                <Button
                    onPress={this.logout}
                    title="Sign Out"
                />
            </View>
        );
    }
}
