import React, {Component} from 'react';
import {AsyncStorage, Button, Image, Text, View} from "react-native";
import styles from "./styles";
import {socket} from './frontendConfig';


export default class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            faceIdCreated: false
        };
    }

    async handleCreateFaceId() {
        const access_token = await AsyncStorage.getItem("access_token");
        console.log(access_token)
        console.log("On create face id")
        socket.emit("app_trigger_face_id", {
            token: access_token
        });
    }


    render() {
        return (
            <View style={styles.container}>
                <Text>Face ID Setup.</Text>
                {this.state.faceIdCreated ? <Text>
                    You have already created a face id. Nothing you have to do here
                </Text> : null
                }
                <Button title={this.state.faceIdCreated ? "Create a new Face ID" : "Create a Face ID"}
                        onPress={this.handleCreateFaceId.bind(this)}/>
            </View>
        );
    }
}