import React from 'react'

import {
    View,
    Text,
    Button
} from 'react-native';

export default class MenuButton extends React.Component {

    render() {
        return (
            <Button title="Menu" onPress={() => this.props.navigation.toggleDrawer()} />
        )
    }
}
