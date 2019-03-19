import React from "react";
import {LayoutAnimation, Text, View} from "react-native";
import styles from '../src/styles';

export default class WidgetContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widgetName: props.widgetName
        }
    }

    componentWillReceiveProps({dragOver}) {
        if (dragOver !== this.props.dragOver) LayoutAnimation.easeInEaseOut();
    }

    render() {
        return <View style={[
            this.props.dragging ? styles.draggableContentDragging : styles.draggableContent,
            this.props.dragOver ? {borderColor: 'green'} : null]}>
            <Text style={styles.boxText}>{this.state.widgetName}</Text>
        </View>
    }
}