import React, {Component} from "react";
import {
    View,
    TextInput,
    Button,
    Text
} from "react-native";

import styles from './styles';
import deviceStorage from './deviceStorage';
import {signIn} from "../api/post";
import responseMessages from '../responseMessages'
import {showAlert} from "../utils";

class Login extends Component {

    static navigationOptions = {
        header: null
    }

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
            this.props.navigation.navigate('Home')
        } else {
            showAlert("error", responseMessages.LOGIN_ERROR);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerBar}>
                    <Text style={styles.headerTitle}>Login</Text>
                </View>

                <View style={styles.content}>
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
                        title='Login here!' color="white"
                        onPress={this.processSignIn}
                    />
                    <Button
                        title='Not registered yet? Register here!' color="white"
                        onPress={() => this.props.navigation.navigate('Register')}
                    />
                </View>
            </View>
        );
    }
}

export default Login;
