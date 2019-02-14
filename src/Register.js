import React from 'react';
import {
    View,
    Button,
    TextInput,
    StyleSheet,
    Alert
} from 'react-native';

import styles from './styles';
import responseMessages from "../responseMessages";
import {signUp} from '../api/post';
import {showAlert} from "../utils";

export default class Register extends React.Component {

    static navigationOptions = {
        header: null
    }

    state = {
        username: '', password: ''
    }

    onChangeText = (key, val) => {
        this.setState({[key]: val})
    }

    processSignUp = async () => {
        const {username, password} = this.state;
        let response = await signUp(username, password);
        if (response.status === true) {
            showAlert("success", responseMessages.REGISTER_SUCCESS);
        } else showAlert("error", responseMessages.REGISTER_ERROR);
    }

    render() {
        return (

            <View style={styles.container}>
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

                <Button
                    title='Sign Up here!'
                    onPress={this.processSignUp}
                />

                <Button
                    title='Back to Login'
                    onPress={() => this.props.navigation.navigate('Login')}
                />

            </View>

        )
    }
}
