import React from 'react'
import styles from "../styles";

import {
    View,
    Text,
    Button
} from 'react-native';

export default class MenuButton extends React.Component {

    render() {
        return (
            <Button title="Menu" color="#C0C0C0" onPress={() => this.props.navigation.toggleDrawer()}>  </Button>
        )
    }
}
