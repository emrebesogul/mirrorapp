import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

import DrawerNavigator from './navigation/DrawerNavigator'

export default class Home extends React.Component {

    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    render() {
        return (
            <View style={styles.container}>
                <DrawerNavigator />
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
