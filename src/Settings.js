import React, {Component} from 'react';
import {Button, Image, Text, View} from "react-native";
import styles from "./styles";


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

    render() {
        return (
            <View style={styles.container}>
                <Text>Hello from Settings screen.</Text>
                <Button title={"Create Face ID"} onPress={() => {
                    this.props.navigation.navigate('CreateFaceId')
                }}/>
            </View>
        );
    }
}