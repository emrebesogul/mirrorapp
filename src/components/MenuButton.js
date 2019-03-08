import React from 'react'
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons';

import {
    View,
    Text,
} from 'react-native';

export default class MenuButton extends React.Component {

    render() {
        return (
            <Ionicons name="md-menu" color="#000000" size={32} onPress={() => this.props.navigation.toggleDrawer()} />
        )
    }
}
