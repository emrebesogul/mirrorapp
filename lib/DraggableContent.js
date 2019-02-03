import React from "react";
import {Text, View} from "react-native";
import styles from '../src/styles';

export default class DraggableContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widget_name: props.widget_name
        }
    }

    render() {
        if (this.props.dragOver && !this.props.ghost && !this.props.dragging) {
            return <View style={styles.draggableContent}>
                <Text>{this.state.widget_name}</Text>
            </View>
        }
        let shadows = {
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 20},
            shadowOpacity: .5,
            shadowRadius: 20,
            opacity: .5
        };
        return <View style={[styles.draggableContent, this.props.dragging ? shadows : null]}>
            <Text style={styles.boxText}>{this.state.widget_name}</Text>
        </View>
    }
}