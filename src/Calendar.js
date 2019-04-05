import React, {Component} from 'react';
import {TextInput, View, Text, AsyncStorage, TouchableOpacity} from "react-native";

import styles from "./styles";
import deviceStorage from "./deviceStorage";
import {getCalendarSettings} from "../api/get";
import {uploadCalendarSettings} from "../api/post";
import {showAlert} from "../utils";
import responseMessages from '../responseMessages';
import {sendSocketMessage} from './socketConnection';

export default class Calendar extends Component {

    static navigationOptions = {
        header: null,
        gesturesEnabled: false
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
        console.log("Processing stuff")
        let response = await uploadCalendarSettings(this.state.calendarICS);
        if (response.status === true) {
            showAlert("Success!", responseMessages.CALENDAR_UPLOAD_SUCCESS);
            // Send socket update to web ui
            let userId = await AsyncStorage.getItem("userId");
            await sendSocketMessage('send_calendar_entries', {
                userId: userId
            });

        } else {
            showAlert("Error!", responseMessages.CALENDAR_UPLOAD_ERROR);
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.headerBar}>
                    <Text style={styles.headerTitle}>Calendar Settings</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.contentText}>By setting up a Calendar, you can display all your daily appointments on your Mirror. To use this Feature, share your private Calendar and paste the iCal link below. </Text>
                    <TextInput style={styles.input} placeholder='https://calender.ics' placeholderTextColor='white' value={this.state.calendarICS} autoCapitalize="none"
                           autoCorrect={false} onChangeText={(calendarICS) => this.setState({calendarICS})}/>

                    <TouchableOpacity style={styles.button} onPress={this.processUploadWCalendarLink}>
                        <Text style={styles.buttonText}>Setup Calendar</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}
