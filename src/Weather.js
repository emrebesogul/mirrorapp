import React, {Component} from 'react';
import {Text, TextInput, View, AsyncStorage, TouchableOpacity} from "react-native";

import styles from "./styles";
import {getWeatherSettings} from "../api/get";
import {uploadWeatherSettings} from "../api/post";
import {showAlert} from "../utils";
import responseMessages from '../responseMessages';
import {sendSocketMessage} from './socketConnection';

export default class Weather extends Component {

    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props) {
        super(props);
        this.state = {
            currentCity: "",
            weatherkey: ""
        };
    }

    async componentDidMount() {
        let response = await getWeatherSettings();
        if (response.status === true && response.settings) {
            this.setState({
                currentCity: response.settings.city
            });
            this.setState({
                weatherkey: response.settings.weatherkey
            });
        }
    }

    processUploadWeatherSettings = async () => {
        let response = await uploadWeatherSettings(this.state.currentCity, this.state.weatherkey);
        if (response.status === true) {
            showAlert("Success!", responseMessages.WEATHER_UPLOAD_SUCCESS);
            // Send socket update to web ui
            let userId = await AsyncStorage.getItem("userId");
            await sendSocketMessage('send_weather_forecast', {
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
                    <Text style={styles.headerTitle}>Weather</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.contentText}>Please insert your city of choice and a weather key to activate the
                        weather widget. To get a weather key, please visit https://openweathermap.org/appid</Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.currentCity}
                        placeholder="City"
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholderTextColor='white'
                        onChangeText={(currentCity) => this.setState({currentCity})}
                    />

                    <TextInput
                        style={styles.input}
                        value={this.state.weatherkey}
                        placeholder="Weather key"
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholderTextColor='white'
                        onChangeText={(weatherkey) => this.setState({weatherkey})}
                    />

                    <TouchableOpacity style={styles.button} onPress={this.processUploadWeatherSettings}>
                        <Text style={styles.buttonText}>Setup Weather widget</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
