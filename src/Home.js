import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    AsyncStorage,
    Image,
    Alert,
    TextInput
} from "react-native";

import {createBottomTabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {ImagePicker, Permissions} from 'expo';
import frontendConfig from './frontendConfig';
import deviceStorage from './deviceStorage';
import DragDropApp from './DragDropApp';

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
                },
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
            currentUser: "",
            image: null,
            type: null,
            updatedImage: false,
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
                },
            })
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    console.log(response);
                    if (response.status === true) {
                        this.setState({image: response.face_image});
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        } catch (err) {
            console.log('error getting user data: ', err);
        }
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
                    this.setState({updatedImage: true})
                } else {
                    this.setState({updatedImage: false})
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
        if (this.state.image !== null && this.state.type !== null && this.state.updatedImage) {
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

        console.log(this.state.image);

        return (
            <View style={styles.container}>
                <Text>Hello from Settings screen.</Text>

                <Button
                    title="Pick an image from camera roll"
                    onPress={this.pickImage}
                />

                {this.state.image !== "" && this.state.updatedImage === false ?
                    <Image source={{uri: "http://127.0.0.1:5000/public/uploads/" + this.state.image}}
                           style={styles.stretch}/>
                    :
                    <View>
                        {this.state.updatedImage === true ?
                            <Image source={{uri: this.state.image}} style={styles.stretch}/>
                            : <View><Text>No picture uploaded yet...</Text><Image source={require('../assets/user.png')}
                                                                                  style={styles.stretch}/></View>
                        }
                    </View>
                }

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


//
//
//


class Wunderlist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentWunderlistSettings: [],
            todoList: "",
            wl_access_token: "",
            wl_client_id: ""
        };
    }

    async componentDidMount() {
        try {
            const access_token = await AsyncStorage.getItem("access_token");
            fetch("http://" + frontendConfig.server_address + ':' + frontendConfig.socket_server_port + "/native/getWunderlistSettings", {
                method: 'POST',
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
                    if (response.status === true) {
                        this.setState({currentWunderlistSettings: response.settings});
                        this.setState({todoList: response.settings.todo_list});
                        this.setState({wl_access_token: response.settings.client_secret});
                        this.setState({wl_client_id: response.settings.client_id});
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        } catch (err) {
            console.log('error getting user data: ', err);
        }
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

    uploadWunderlistSettings = async () => {
        const access_token = await AsyncStorage.getItem("access_token");
        try {
            fetch("http://" + frontendConfig.server_address + ':' + frontendConfig.socket_server_port + "/native/uploadWunderlistSettings", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + access_token
                },
                body: JSON.stringify({
                    "todoList": this.state.todoList,
                    "wl_access_token": this.state.wl_access_token,
                    "wl_client_id": this.state.wl_client_id
                })
            })
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    console.log(response);
                    if (response.status === true) {
                        this.showAlert("Success!", response.message);
                    } else {
                        this.showAlert("Error!", response.message);
                    }
                })
                .catch(function (err) {
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
            {cancelable: false}
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Please register at https://developer.wunderlist.com/ and insert your CLIENT ID and CLIENT SECRET
                    in the fields below</Text>
                <Text>Please insert your list for the Wunderlist App:</Text>
                <TextInput
                    style={styles.wunderlist_text}
                    onChangeText={(todoList) => this.setState({todoList})}
                    value={this.state.todoList}
                />

                <Text>Please insert your ACCESS TOKEN for the Wunderlist App:</Text>
                <TextInput
                    style={styles.wunderlist_text}
                    onChangeText={(wl_access_token) => this.setState({wl_access_token})}
                    value={this.state.wl_access_token}
                />

                <Text>Please insert your CLIENT ID for the Wunderlist App:</Text>
                <TextInput
                    style={styles.wunderlist_text}
                    onChangeText={(wl_client_id) => this.setState({wl_client_id})}
                    value={this.state.wl_client_id}
                />

                <Button
                    title="Update your To Do List with the credentials and list above"
                    onPress={this.uploadWunderlistSettings}
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
    },
    Wunderlist: {
        screen: Wunderlist,
        navigationOptions: {
            tabBarLabel: 'Wunderlist',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-settings" color={tintColor} size={24}/>
            )
        },
        header: {
            visible: false,
        },
    },
    DragDropApp: {
        screen: DragDropApp,
        tabBarLabel: 'DragDropApp',
        tabBarIcon: ({tintColor}) => (
            <Icon name="ios-home" color={tintColor} size={24}/>
        )
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
    },
    stretch: {
        width: 200,
        height: 200
    },
    wunderlist_text: {
        width: 200,
        fontSize: 18,
        height: 45,
        padding: 8,
        borderRadius: 14,
        margin: 10,
        borderColor: 'black',
        borderWidth: 1
    }
});