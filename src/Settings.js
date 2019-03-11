import React, {Component} from 'react';
import {Button} from "react-native";
import MenuButton from './components/MenuButton';
import { Container, Header, Body, Left, Right, Title, Content, Form, Input, Item, Label, Spinner } from 'native-base';
import deviceStorage from "./deviceStorage";
import {socket} from './frontendConfig';

export default class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newPassword: "",
            takingPictures: false
        }
    }

    onChangeText = (key, value) => {
        this.setState({[key]: value})
    }

    async handleCreateFaceId() {
        const access_token = await AsyncStorage.getItem("access_token");
        console.log(access_token)
        console.log("On create face id")
        socket.emit("app_trigger_face_id", {
            token: access_token
        });
    }

    logout = async () => {
        deviceStorage.saveItem("access_token", "");
        this.props.navigation.navigate("Login");
    }

    render() {
        return (
            <Container>
                <Header transparent>
                    <Left>
                        <MenuButton navigation={this.props.navigation} />
                    </Left>
                    <Body>
                        <Title>Settings</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Form>
                        <Item stackedLabel>
                            <Label>New Password</Label>
                            <Input placeholder="New Password" autoCapitalize="none" autoCorrect={false} secureTextEntry onChangeText={val => this.onChangeText('newPassword', val)} />
                        </Item>
                        <Button title="Update Password" onPress={() => {}} />
                    </Form>
                    {this.state.takingPictures ? <View><Spinner color='blue' /><Button title="Creating Face ID..." onPress={() => {}} /></View> : <Button title="Create new Face ID" onPress={() => nPress={this.handleCreateFaceId.bind(this)} />}
                    <Button title="Sign me Out!" onPress={this.logout} />
                </Content>
            </Container>
        );
    }
}
