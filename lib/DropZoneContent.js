import React from "react";
import {LayoutAnimation, Text, View} from "react-native";
import styles from '../src/styles';

export default class DropZoneContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayText: props.displayText
        };
    }

    componentWillReceiveProps({dragOver}) {
        if (dragOver !== this.props.dragOver) LayoutAnimation.easeInEaseOut();
    }

    render() {
        return <View style={[styles.dropZoneContent, this.props.dragOver ? {
            width: styles.dropZoneContent.width + 10,
            height: styles.dropZoneContent.height + 10
        } : null]}>
            <View>
                <Text style={styles.boxText}>{this.state.displayText}</Text>
            </View>
        </View>
    }
}