import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    AsyncStorage,
    Image
} from "react-native";

import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { ImagePicker } from 'expo';

import frontendConfig from './frontendConfig';
import deviceStorage from './deviceStorage';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: ""
    };
  }

  async componentDidMount() {
    try {
      const access_token  = await AsyncStorage.getItem("access_token");
      fetch("http://" + frontendConfig.server_address + ':' + frontendConfig.socket_server_port + "/native/getUserData", {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
          },
      })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        if(response.status === true) {
          this.setState({username: response.username});
        }
      })
      .catch(function(err) {
        console.log(err);
      });
    } catch (err) {
      console.log('error getting user data: ', err);
    }
  }

  static navigationOptions = {
      header: null
  }

  logout = async () => {
    try {
      console.log('user successfully signed out!')
      deviceStorage.saveItem("access_token", "empty");
      this.props.navigation.navigate('Login');
    } catch (err) {
      console.log('error signing out...: ', err)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome: {this.state.username}</Text>
        <Text>Hello from Home screen.</Text>
        <Button
          onPress={this.logout}
          title="Sign Out"
        />
      </View>
    );
  }
}

//
//
//


class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      avatarSource: null,
      image: null
    };
  }

  static navigationOptions = {
      header: null
  }

  logout = async () => {
    try {
      console.log('user successfully signed out!')
      deviceStorage.saveItem("access_token", "empty");
      this.props.navigation.navigate('Login');
    } catch (err) {
      console.log('error signing out...: ', err)
    }
  }

  _pickImage = async () => {
     let result = await ImagePicker.launchImageLibraryAsync({
       allowsEditing: true,
       aspect: [4, 3],
     });

     console.log(result);

     if (!result.cancelled) {
       this.setState({ image: result.uri });
     }
   };

/*
https://facebook.github.io/react-native/docs/cameraroll

const file = {
  uri,             // e.g. 'file:///path/to/file/image123.jpg'
  name,            // e.g. 'image123.jpg',
  type             // e.g. 'image/jpg'
}

const body = new FormData()
body.append('file', file)

fetch(url, {
  method: 'POST',
  body
})
*/

  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        <Text>Hello from Settings screen.</Text>

        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

        <Button
          onPress={this.logout}
          title="Sign Out"
        />
      </View>
    );
  }
}


export default createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-home" color={tintColor} size={24} />
      )
    },
    header: {
      visible: false,
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-settings" color={tintColor} size={24} />
      )
    },
    header: {
      visible: false,
    },
  }
}, {
    initialRouteName: 'Home',
    // order: ['Settings', 'Home'],
    activeTintColor: 'white',
    shifting: true
  })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
