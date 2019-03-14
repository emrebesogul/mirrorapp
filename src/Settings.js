import React, {Component} from 'react';
import {Button, View, Text} from "react-native";
import MenuButton from './components/MenuButton';
import styles from "./styles";
import deviceStorage from "./deviceStorage";
import {socket} from './frontendConfig';
import {AsyncStorage} from 'react-native';

export default class Settings extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            newPassword: "",
            takingPictures: false
        }
    }

    onChangeText = (key, value) => {
        this.setState({[key]: value})
    }

    async handleCreateFaceId() {
        const access_token = await AsyncStorage.getItem("access_token");
        socket.emit("app_trigger_face_id", {
            token: access_token
        });
    }

    logout = async () => {
        deviceStorage.saveItem("access_token", "");
        this.props.navigation.navigate("Login");
    }

    render() {
        return (
            <View style={styles.container}>

                <MenuButton navigation={this.props.navigation} />

                {this.state.takingPictures ? <View><Button title="Creating Face ID..." onPress={() => {}} /></View> : <Button title="Create new Face ID" onPress={this.handleCreateFaceId.bind(this)} />}

                <Button title="Sign me Out!" onPress={this.logout} />

            </View>
        );
    }
}
