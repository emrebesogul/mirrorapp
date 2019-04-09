import React, {Component} from 'react';
import {TextInput, View, Text, AsyncStorage, TouchableOpacity} from "react-native";

import styles from "./styles";
import {uploadDjangoIP} from "../api/post";
import {showAlert} from "../utils";
import responseMessages from '../responseMessages';
import {sendSocketMessage} from './socketConnection';

export default class DjangoConfig extends Component {

    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props) {
        super(props);
        this.state = {
            djangoIP: ""
        };
    }

    processUploadDjangoIP = async () => {
        console.log("Processing djangoIP")
        let response = await uploadDjangoIP(this.state.djangoIP);
        if (response.status === true) {
            showAlert("Success!", responseMessages.DJANGOIP_UPLOAD_SUCCESS);
        } else {
            showAlert("Error!", responseMessages.DJANGOIP_UPLOAD_ERROR);
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.headerBar}>
                    <Text style={styles.headerTitle}>Django Config</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.contentText}>By setting the Django IP address, you can setup your Face ID. To use this Feature, insert the IP address of your Django Server. </Text>
                    <TextInput style={styles.input} placeholder='172.34.10.96' placeholderTextColor='white' value={this.state.djangoIP} autoCapitalize="none"
                           autoCorrect={false} onChangeText={(djangoIP) => this.setState({djangoIP})}/>

                    <TouchableOpacity style={styles.button} onPress={this.processUploadDjangoIP}>
                        <Text style={styles.buttonText}>Setup Django IP address</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}
