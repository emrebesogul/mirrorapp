import React, {Component} from 'react';
import {Button, Image, Text, View} from "react-native";
import styles from "./styles";
import {getUserData} from "../api/get";


export default class Settings extends Component {

    static navigationOptions = {
      drawerLabel: 'Settings',
    };

    constructor(props) {
        super(props);
        this.state = {
            currentUser: "",
        };
    }

    async componentDidMount() {
        let response = await getUserData();
        if (response.status === true) {
            this.setState({
                currentUser: response.username
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Hello {this.state.currentUser} from Settings screen.</Text>
                <Button title="User Profile Settings" onPress={() => {}} />
                <Button title="Set Face ID" onPress={() => {}} />
                <Button title="Log me Out!" onPress={() => {}} />
            </View>
        );
    }
}
