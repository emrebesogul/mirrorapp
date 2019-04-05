import React, {Component} from 'react';
import {Button, TextInput, View, Text, AsyncStorage} from "react-native";

import styles from "./styles";
import deviceStorage from "./deviceStorage";
import {getCalendarSettings} from "../api/get";
import {uploadCalendarSettings} from "../api/post";
import {showAlert} from "../utils";
import responseMessages from '../responseMessages';
import {sendSocketMessage} from './socketConnection';
import MenuButton from './components/MenuButton';

export default class Calendar extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            calendarICS: ""
        };
    }

    async componentDidMount() {
        let response = await getCalendarSettings();
        if (response.status === true && response.settings) {
            this.setState({
                calendarICS: response.settings.calendarICS,
            });
        }
    }

    processUploadWCalendarLink = async () => {
        let response = await uploadCalendarSettings(this.state.calendarICS);
        if (response.status === true) {
            showAlert("Success!", responseMessages.CALENDAR_UPLOAD_SUCCESS);
            // Send socket update to web ui
            let token = await AsyncStorage.getItem("access_token");
            await sendSocketMessage('send_calendar_entries', {
                token: token
            });

        } else {
            showAlert("Error!", responseMessages.CALENDAR_UPLOAD_ERROR);
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.headerBar}>
                    <Text style={styles.headerTitle}>Calendar</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.contentText}>Share your calendar and copy the iCal link here</Text>
                    <TextInput style={styles.input} value={this.state.calendarICS} autoCapitalize="none"
                           autoCorrect={false} onChangeText={(calendarICS) => this.setState({calendarICS})}/>

                    <Button title="Setup Calender" color="white" onPress={this.processUploadWCalendarLink}/>
                </View>
            </View>

        );
    }
}
