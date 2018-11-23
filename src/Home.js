import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    AsyncStorage,
    Image,
    Alert
} from "react-native";

import {createBottomTabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {ImagePicker, Permissions} from 'expo';

import frontendConfig from './frontendConfig';
import deviceStorage from './deviceStorage';
import DragDropApp from "./DragDropApp";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: ""
        };
    }

    async componentDidMount() {
        try {
            const access_token = await AsyncStorage.getItem("access_token");
            fetch("http://" + frontendConfig.server_address + ':' + frontendConfig.socket_server_port + "/native/getUserData", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + access_token
                }
            })
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    console.log(response);
                    if (response.status === true) {
                        this.setState({username: response.username});
                    }
                })
                .catch(function (err) {
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
            image: null,
            type: null
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

    pickImage = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (status === 'granted') {
            ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            }).then(newPostImage => {
                if (!newPostImage.cancelled) {
                    this.setState({image: newPostImage.uri})
                    this.setState({type: newPostImage.type})
                }
            })
                .catch(err => console.log(err))
        }
    };

    uploadImage = async () => {

        // check if image is updated or not... if new image -> upload, else don't burden traffic... => missing!

        const data = new FormData();

        data.append('file', {
            uri: this.state.image,
            type: this.state.type, // or photo.type
            name: 'opencvImage'
        });

        // check if image is selected... alert if not... else upload/update user image
        if (this.state.image !== null && this.state.type !== null) {
            try {
                const access_token = await AsyncStorage.getItem("access_token");
                fetch("http://" + frontendConfig.server_address + ':' + frontendConfig.socket_server_port + "/native/uploadImage", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + access_token
                    },
                    body: data
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((response) => {
                        // response logic
                        if (response.status === true) {
                            this.showAlert("Success!", response.message);
                            console.log('Image uploaded successfully!');
                        } else {
                            this.showAlert("Error!", response.message);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            } catch (err) {
                console.log('error uploading image: ', err);
            }
        } else {
            this.showAlert("Error!", "Please select an image!");
        }

    }

    showAlert = (type, message) => {
        Alert.alert(
            type,
            message,
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false}
        )
    }


    render() {
        let {image} = this.state;

        return (
            <View style={styles.container}>
                <Text>Hello from Settings screen.</Text>

                <Button
                    title="Pick an image from camera roll"
                    onPress={this.pickImage}
                />
                {image && <Image source={{uri: image}} style={{width: 200, height: 200}}/>}

                <Button
                    title="Upload or Update Image for Face Recognition"
                    onPress={this.uploadImage}
                />

                <Button
                    onPress={this.logout}
                    title="Sign Out"
                />
            </View>
        );
    }
}


export default createBottomTabNavigator({
    DragDropApp: {
        screen: DragDropApp,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-home" color={tintColor} size={24}/>
            )
        },
        header: {
            visible: false,
        },
    },
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-home" color={tintColor} size={24}/>
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
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-settings" color={tintColor} size={24}/>
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
