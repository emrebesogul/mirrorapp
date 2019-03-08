import React, {Component} from "react";
import {
    View,
    TextInput,
    Text,
    Button
} from "react-native";

import deviceStorage from './deviceStorage';
import styles from './styles';
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
            <View style={styles.lrScreen}>
                <Text style={styles.lrtext}>Login Screen</Text>
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
                <Button title="Login with here!" onPress={this.processSignIn} />
                <Button title="Not registered yet? Register here!" onPress={() => this.props.navigation.navigate('Register')} />
            </View>
        );
    }
}

export default Login;
