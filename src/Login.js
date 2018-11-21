import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  AsyncStorage,
  Alert
} from "react-native";

import frontendConfig from './frontendConfig';
import deviceStorage from './deviceStorage';

class Login extends Component {

  static navigationOptions = {
      header: null
  }

  state = {
    username: '', password: ''
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }

  signIn = async () => {
    const { username, password } = this.state;
    try {
      // post username and pw to backend and check input, eitherwise register new account and go back to login
      // save access_token in AsyncStorage
      // https://stackoverflow.com/questions/38418998/react-native-fetch-network-request-failed (in case smth is not working)
      fetch("http://" + frontendConfig.server_address + ':' + frontendConfig.socket_server_port + "/native/signin", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "username": username,
            "password": password
          })
      })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        if(response.status === true) {
          console.log('user successfully logged in!: ', username);
          deviceStorage.saveItem("access_token", response.token);
          this.props.navigation.navigate('Home');
          //this.showAlert("Success!", response.message);
        } else {
          this.showAlert("Error!", response.message);
        }
      })
      .catch(function(err) {
        console.log(err);
      });
    } catch (err) {
      console.log('error signing up: ', err);
    }
  }

  showAlert = (type, message) => {
    Alert.alert(
      type,
      message,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
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
          onPress={this.signIn}
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

const styles = StyleSheet.create({
  input: {
    width: 350,
    fontSize: 18,
    fontWeight: '500',
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    color: 'white',
    padding: 8,
    borderRadius: 14
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
