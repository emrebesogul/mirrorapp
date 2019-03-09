import React from 'react'
import styles from './styles';

import {
    View,
    StyleSheet
} from 'react-native';


import DrawerNavigator from './navigation/DrawerNavigator'

export default class Home extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <DrawerNavigator />
            </View>
        )
    }
}
