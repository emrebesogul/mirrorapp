import React, {Component} from 'react';
import {Button, TextInput, View, Text, AsyncStorage} from "react-native";

import styles from "./styles";
import deviceStorage from "./deviceStorage";
import {getCalenderSettings} from "../api/get";
import {uploadCalenderSettings} from "../api/post";
import {showAlert} from "../utils";
import responseMessages from '../responseMessages';
import {sendSocketMessage} from './socketConnection';
import MenuButton from './components/MenuButton';

export default class Wunderlist extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            calenderICS: ""
        };
    }

    async componentDidMount() {
        let response = await getCalenderSettings();
        if (response.status === true && response.settings) {
            this.setState({
                calenderICS: response.settings.calenderICS,
            });
        }
    }

    processUploadWCalenderLink = async () => {
        let response = await uploadCalenderSettings(this.state.calenderICS);
        if (response.status === true) {
            showAlert("Success!", responseMessages.CALENDER_UPLOAD_SUCCESS);
            // Send socket update to web ui
            let token = await AsyncStorage.getItem("access_token");
            await sendSocketMessage('send_calender_entries', {
                token: token
            });

        } else {
            showAlert("Error!", responseMessages.CALENDER_UPLOAD_ERROR);
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.headerBar}>
                    <MenuButton navigation={this.props.navigation}/>
                    <Text style={styles.headerTitle}>Calender</Text>
                    <Text style={styles.toolbarButton}></Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.contentText}>Share your calender and copy the iCal link here</Text>
                    <TextInput style={styles.input} value={this.state.calenderICS} autoCapitalize="none"
                           autoCorrect={false} onChangeText={(calenderICS) => this.setState({calenderICS})}/>

                    <Button title="Setup Calender" color="#C0C0C0" onPress={this.processUploadWCalenderLink}/>
                </View>
            </View>

        );
    }
}
