import React from 'react'
import styles from './styles';

import {
    View,
    Text,
} from 'react-native';

export default class NewHome extends React.Component {

    render() {
        return (
            <View style={styles.initializing}>
                <Text style={styles.initializingText}>New Home Screen with Swiper on the left</Text>
            </View>
        )
    }
}
