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
            <Button title="" color="white" onPress={() => this.props.navigation.toggleDrawer()}>  </Button>
        )
    }
}
