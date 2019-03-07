import React from 'react'
import styles from './styles';

import {
    View,
    Text,
} from 'react-native';

export default class SettingsScreen extends React.Component {

    render() {
        return (
            <View style={styles.initializing}>
                <Text style={styles.initializingText}>SettingsScreen</Text>
            </View>
        )
    }
}
