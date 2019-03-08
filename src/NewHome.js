import React from 'react'

import {
    View,
    StyleSheet
} from 'react-native';


import DrawerNavigator from './navigation/DrawerNavigator'

export default class NewHome extends React.Component {

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
