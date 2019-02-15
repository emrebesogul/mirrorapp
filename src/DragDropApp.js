import React, {Component} from 'react';
import {
    View,
    ScrollView
} from 'react-native';

import {socket} from "./frontendConfig";

import DragContainer from '../lib/DragContainer';
import Draggable from '../lib/Draggable';
import DraggableContent from '../lib/DraggableContent';
import DropZone from '../lib/DropZone';
import DropZoneContent from '../lib/DropZoneContent';

import styles from './styles';
import {getAllWidgets, getUserData, getUserWidgets} from "../api/get";

export default class DragDropApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            all_widgets: [],
            user_widgets: [],
            username: '',
            draggableWidgets: [],
            dropWidgets: []
        }
    }

    async componentDidMount() {
        let response = await getUserData();
        if (response.status === true) this.setState({
            username: response.username
        });
        response = await getAllWidgets();
        if (response.status === true) this.setState({
            all_widgets: response.data.all_widgets
        });
        response = await getUserWidgets(this.state.username);
        if (response.status === true) this.setState({
            user_widgets: response.data
        });
        this.renderAllWidgets();
        this.renderUserWidgets();
    }

    renderAllWidgets() {
        let draggableWidgets = [];
        this.state.all_widgets.forEach(function (widget, index) {
            draggableWidgets.push(<Draggable
                key={widget.widget_id + widget.widget_name + index}
                data={{widget_id: widget.widget_id, widget_name: widget.widget_name}}
                style={styles.box}>
                <DraggableContent widget_name={widget.widget_name}/>
            </Draggable>)
        });
        this.setState({
            draggableWidgets: draggableWidgets
        })
    }

    replaceUserWidget(slot, widget_id, widget_name) {
        let user_widgets = this.state.user_widgets;
        user_widgets[slot] = {
            widget_id: widget_id,
            widget_name: widget_name
        };
        this.setState({
            user_widgets: user_widgets
        });
        this.renderUserWidgets();
    }

    renderUserWidgets() {
        let dropWidgets = [];
        let app = this;
        this.state.user_widgets.forEach(function (widget, index) {
            let dropZoneContent;
            if (widget) {
                dropZoneContent = <DropZoneContent key={widget.widget_id + widget.widget_name + index}
                                                   displayText={widget.widget_name}/>;
            } else {
                dropZoneContent = <DropZoneContent key={index}
                                                   displayText={"Empty"}/>;
            }
            dropWidgets.push(<DropZone
                key={index}
                onDrop={e => {
                    socket.emit('app_drop_event', {
                        previous_slot: null,
                        slot: index,
                        widget_id: e.widget_id,
                        widget_name: e.widget_name,
                        remove: false
                    });
                    app.replaceUserWidget(index, e.widget_id, e.widget_name);
                }}
                style={styles.box}
            >
                {dropZoneContent}
            </DropZone>)
        });
        this.setState({
            dropWidgets: dropWidgets
        });
    }

    render() {
        return <DragContainer style={styles.container}>
            <View style={styles.row}>
                {this.state.dropWidgets}
            </View>
            <ScrollView horizontal={true}>
                <View style={{justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'row'}}>
                    {this.state.draggableWidgets}
                </View>
            </ScrollView>
        </DragContainer>
    }
}