import React from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Alert
} from 'react-native';

import frontendConfig from './frontendConfig';

export default class Register extends React.Component {

  static navigationOptions = {
    header: null
  }

  state = {
    username: '', password: ''
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  signUp = async () => {
    const { username, password } = this.state;
    try {
      // post username and pw to backend and check input, eitherwise register new account and go back to login
      // save access_token in AsyncStorage
      // https://stackoverflow.com/questions/38418998/react-native-fetch-network-request-failed (in case smth is not working)
      fetch("http://" + frontendConfig.server_address + ':' + frontendConfig.socket_server_port + "/native/signup", {
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
        if(response.state === "true") {
          console.log('user successfully registered!: ', username);
          //this.showAlert("Success!", response.message);
        } else {
          //this.showAlert("Error!", response.message);
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
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
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
          onPress={this.signUp}
        />

        <Button
          title='Back to Login'
          onPress={() => this.props.navigation.navigate('Login')}
        />

      </View>

    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
