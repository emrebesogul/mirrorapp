import React, {Component} from 'react';
import {Button, Image, Text, View} from "react-native";
import styles from "./styles";
import {getUserData} from "../api/get";


export default class Settings extends Component {

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
        let response = await getUserData();
        if (response.status === true) {
            this.setState({
                image: response.face_image
            });
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Text>Hello from Settings screen.</Text>
            </View>
        );
    }
}