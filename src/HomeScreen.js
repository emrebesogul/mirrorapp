import React from 'react'
import styles from './styles';

import {
    View,
    Text,
} from 'react-native';

import MenuButton from './components/MenuButton';

export default class HomeScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <MenuButton navigation={this.props.navigation} />
                <Text style={styles.initializingText}>HomeScreen</Text>
            </View>
        )
    }
}
