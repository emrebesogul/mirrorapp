import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  AsyncStorage
} from "react-native";

class Settings extends Component {

  signOut = async () => {
    await AsyncStorage.setItem("USER_KEY", "empty");
    console.log('user successfully signed out!')
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign Out" onPress={this.signOut} />
      </View>
    );
  }
}
export default Settings;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
});
