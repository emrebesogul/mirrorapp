import React, {Component} from 'react';
import {Button, Text, TextInput, View} from "react-native";
import deviceStorage from "./deviceStorage";
import {getWeatherSettings} from "../api/get";
import {uploadWeatherSettings} from "../api/post";
import {showAlert} from "../utils";
import responseMessages from '../responseMessages';
import {socket} from './frontendConfig';
import MenuButton from './components/MenuButton';
import { Container, Header, Body, Left, Right, Title, Content, Form, Input, Item, Label, Spinner } from 'native-base';

export default class Weather extends Component {

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
            socket.emit('send_weather_forecast', {
                message: "update your web ui...!"
            });

        } else {
            showAlert("Error!", responseMessages.WUNDERLIST_UPLOAD_ERROR);
        }
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <MenuButton navigation={this.props.navigation} />
                    </Left>
                    <Body>
                        <Title>Weather</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Form>
                        <Item stackedLabel>
                            <Label>Please insert your city for the Weather widget:</Label>
                            <Input placeholder="Berlin" autoCapitalize="none" autoCorrect={false} onChangeText={(currentCity) => this.setState({currentCity})} />
                        </Item>
                    </Form>
                    <Button title="Update your Weather information for the city above" onPress={this.processUploadWeatherSettings} />
                </Content>
            </Container>
        );
    }
}
