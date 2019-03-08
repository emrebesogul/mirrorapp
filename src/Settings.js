import React, {Component} from 'react';
import {Button, Image, Text, View} from "react-native";
import styles from "./styles";
import MenuButton from './components/MenuButton';
import { Container, Header, Body, Left, Right, Title, Content } from 'native-base';
import deviceStorage from "./deviceStorage";

export default class Settings extends Component {

    static navigationOptions = {
        drawerLabel: 'Settings',
        headerMode: 'none',
        header: null
    };

    logout = async () => {
        deviceStorage.saveItem("access_token", "");
        this.props.navigation.navigate('Login');
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
                    <Text>Hello from Settings screen.</Text>
                    <Button title="User Profile Settings" onPress={() => {}} />
                    <Button title="Set Face ID" onPress={() => {}} />
                    <Button title="Sign me Out!" onPress={this.logout} />
                </Content>

            </Container>
        );
    }
}
