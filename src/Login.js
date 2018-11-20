import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  AsyncStorage
} from "react-native";

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
    const { username, password } = this.state
    try {
      // login logic here:
      // check credentials on server via post request

      this.props.navigation.navigate('Home');
      const user = await AsyncStorage.setItem("USER_KEY", username)
      console.log('user successfully signed in!', username)
    } catch (err) {
      console.log('login error:', err)
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
          title='Sign In'
          onPress={this.signIn}
        />
        <Button
          title='Sign Up?'
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
