import React, {Component} from 'react';
import {Button, Image, Text, View} from "react-native";
import styles from "./styles";
import MenuButton from './components/MenuButton';
import { Container, Header, Body, Left, Right, Title, Content, Form, Input, Item, Label, Spinner } from 'native-base';
import deviceStorage from "./deviceStorage";

export default class Settings extends Component {

    static navigationOptions = {
        drawerLabel: 'Settings',
        headerMode: 'none',
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            newPassword: '',
            takingPictures: false
        }
    }

    logout = async () => {
        deviceStorage.saveItem("access_token", "");
        this.props.navigation.navigate("Login");
    }

    render() {
        return (
            <Container>
                <Header>
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
                            <Input placeholder="New Password" autoCapitalize="none" autoCorrect={false} onChangeText={val => this.onChangeText('newPassword', val)} />
                        </Item>
                        <Button title="Update Password" onPress={() => {}} />
                    </Form>
                    {this.state.takingPictures ? <View><Spinner color='blue' /><Button title="Setting Face ID" onPress={() => {}} /></View> : <Button title="Set Face ID" onPress={() => {}} />}
                    <Button title="Sign me Out!" onPress={this.logout} />
                </Content>
            </Container>
        );
    }
}
