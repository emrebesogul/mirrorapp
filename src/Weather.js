import React, {Component} from 'react';
import {Button, Text, TextInput, View, AsyncStorage} from "react-native";

import styles from "./styles";
import deviceStorage from "./deviceStorage";
import {getWeatherSettings} from "../api/get";
import {uploadWeatherSettings} from "../api/post";
import {showAlert} from "../utils";
import responseMessages from '../responseMessages';
import {sendSocketMessage} from './socketConnection';
import MenuButton from './components/MenuButton';

export default class Weather extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            currentCity: ""
        };
    }

    async componentDidMount() {
    let response = await getWeatherSettings();
    console.log(response);
    console.log(response.settings);
        if (response.status === true && response.settings) {
            this.setState({
                currentCity: response.settings.city
            });
        }
    }

    processUploadWeatherSettings = async () => {
        let response = await uploadWeatherSettings(this.state.currentCity);
        if (response.status === true) {
            showAlert("Success!", responseMessages.WEATHER_UPLOAD_SUCCESS);
            // Send socket update to web ui
            let token = await AsyncStorage.getItem("access_token");
            await sendSocketMessage('send_weather_forecast', {
                token: token
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
                    <Text style={styles.headerTitle}>Weather</Text>
                    <Text style={styles.toolbarButton}></Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.contentText}>Please insert your city for the Weather widget:</Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.currentCity}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholderTextColor='white'
                        onChangeText={(currentCity) => this.setState({currentCity})}
                    />

                    <Button title="Update your Weather information for the city above" onPress={this.processUploadWeatherSettings} />
                </View>
            </View>
        );
    }
}
