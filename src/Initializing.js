// init step: check if jwt_token of user is set
// skip auth step and go to main page

import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native';


export default class Initializing extends React.Component {
  async componentDidMount() {
    try {
      const access_token  = await AsyncStorage.getItem("access_token");
      console.log("Initializing: ", access_token);
      this.props.navigation.navigate('Home'); // go to main page

/*      if (access_token && access_token !== "empty" && access_token !== null) {
        this.props.navigation.navigate('Home'); // go to main page
      } else {
        this.props.navigation.navigate('Login'); // go to auth page
      }
*/
    } catch (err) {
      console.log('error: ', err);
      this.props.navigation.navigate('Login');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Loading</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
