import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    AsyncStorage
} from "react-native";

class Home extends Component {

  static navigationOptions = {
      header: null
  }

  logout = async () => {
    try {
      //await AsyncStorage.removeItem("USER_KEY");
      await AsyncStorage.setItem("USER_KEY", "empty");
      console.log('user successfully signed out!')
      this.props.navigation.navigate('Login');
    } catch (err) {
      console.log('error signing out...: ', err)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello from Home screen.</Text>
        <Button
          onPress={this.logout}
          title="Sign Out"
        />
      </View>
    );
  }
}
export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
