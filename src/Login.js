import React, {Component} from "react";
import {
    View,
    TextInput,
    Text,
    Button
} from "react-native";
import { Container, Header, Body, Left, Right, Title, Content, Form, Item, Input, Label, Icon } from 'native-base';

import deviceStorage from './deviceStorage';
import {signIn} from "../api/post";
import responseMessages from '../responseMessages'
import {showAlert} from "../utils";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    onChangeText = (key, value) => {
        this.setState({[key]: value})
    }

    processSignIn = async () => {
        const {username, password} = this.state;
        let response = await signIn(username, password);
        if (response.status === true) {
            deviceStorage.saveItem("access_token", response.token);
            this.props.navigation.navigate('NewHome');
        } else {
            showAlert("error", responseMessages.LOGIN_ERROR);
        }
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Login</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Form>
                        <Item stackedLabel>
                            <Label>Username</Label>
                            <Icon active type="FontAwesome" name='user' />
                            <Input placeholder="Username" autoCapitalize="none" autoCorrect={false} onChangeText={val => this.onChangeText('username', val)} />
                        </Item>
                        <Item stackedLabel>
                            <Label>Password</Label>
                            <Icon active type="MaterialCommunityIcons" name='onepassword' />
                            <Input placeholder="Password" autoCapitalize="none" autoCorrect={false} secureTextEntry onChangeText={val => this.onChangeText('password', val)} />
                        </Item>
                        <Button title="Login here!" onPress={this.processSignIn} />
                        <Button title="Not registered yet? Register here!" onPress={() => this.props.navigation.navigate('Register')} />
                    </Form>
                </Content>
            </Container>
        );
    }
}

export default Login;
