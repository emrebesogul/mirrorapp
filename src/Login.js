import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    AsyncStorage,
    Alert
} from "react-native";

import deviceStorage from './deviceStorage';
import styles from './styles';
import {signIn} from "../api/post";
import responseMessages from '../responseMessages'
import {showAlert} from "../utils";

class Login extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        username: '',
        password: ''
    }

    onChangeText = (key, value) => {
        this.setState({[key]: value})
    }

    processSignIn = async () => {
        const {username, password} = this.state;
        let response = await signIn(username, password);
        console.log(response);
        if (response.status === true) {
            deviceStorage.saveItem("access_token", response.token);
            this.props.navigation.navigate('Home');
        } else {
            showAlert("error", responseMessages.LOGIN_ERROR);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('username', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    autoCapitalize="none"
                    secureTextEntry={true}
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('password', val)}
                />
                <Button
                    title='Login'
                    onPress={this.processSignIn}
                />
                <Button
                    title='Register'
                    onPress={() => this.props.navigation.navigate('Register')}
                />
            </View>
        );
    }
}

export default Login;
