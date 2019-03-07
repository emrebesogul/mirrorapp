import React from 'react';
import {
    View,
    TextInput,
    Alert,
    Text,
    Button
} from 'react-native';

import styles from './styles';
import responseMessages from "../responseMessages";
import {signIn, signUp} from '../api/post';
import {showAlert} from "../utils";
import deviceStorage from "./deviceStorage";

export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    onChangeText = (key, val) => {
        this.setState({[key]: val})
    }

    processSignUp = async () => {
        const {username, password} = this.state;
        let response = await signUp(username, password);
        if (response.status === true) {
            showAlert("success", responseMessages.REGISTER_SUCCESS);
            await this.processSignIn(username, password);
        } else showAlert("error", responseMessages.REGISTER_ERROR);
    }

    processSignIn = async (username, password) => {
        let response = await signIn(username, password);
        if (response.status === true) {
            deviceStorage.saveItem("access_token", response.token);
            this.props.navigation.navigate('Home');
        } else {
            showAlert("error", responseMessages.LOGIN_ERROR);
        }
    }

    render() {
        return (
            <View style={styles.lrScreen}>
                <Text style={styles.lrtext}>Register Screen</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('username', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry={true}
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('password', val)}
                />
                <Button title="Register here!" onPress={this.processSignUp} />
                <Button title="Already have an account? Log in!" onPress={() => {this.props.navigation.navigate('Login')}} />
            </View>

        )
    }
}
