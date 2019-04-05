import React, {Component} from "react";
import {
    View,
    TextInput,
    Text,
    TouchableOpacity
} from "react-native";

import styles from './styles';
import deviceStorage from './deviceStorage';
import {signIn} from "../api/post";
import responseMessages from '../responseMessages'
import {showAlert} from "../utils";

class Login extends Component {

    static navigationOptions = {
        header: null,
        gesturesEnabled: false
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

                    <TouchableOpacity style={styles.button} onPress={this.processSignIn}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}
                                      onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={styles.buttonText}>Go To Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}
                                      onPress={() => this.props.navigation.navigate('QRScanner')}>
                        <Text style={styles.buttonText}>Scan New QR Code</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}

export default Login;
