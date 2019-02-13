import React, {Component} from 'react';
import {
    View,
    ScrollView,
    AsyncStorage
} from 'react-native';

import SocketIOClient from 'socket.io-client';
import frontendConfig from './frontendConfig';

import DragContainer from '../lib/DragContainer';
import Draggable from '../lib/Draggable';
import DraggableContent from '../lib/DraggableContent';
import DropZone from '../lib/DropZone';
import DropZoneContent from '../lib/DropZoneContent';

import styles from './styles';

export default class DragDropApp extends Component {
    constructor(props) {
        super(props);
        this.socket = SocketIOClient('http://' + frontendConfig.server_address + ':' + frontendConfig.socket_server_port);
        this.state = {
            all_widgets: [],
            user_widgets: [],
            username: '',
            draggableWidgets: [],
            dropWidgets: []
        }
    }

    async componentDidMount() {
        await this.getUserData()
            .then(res => {
                this.setState({
                    username: res.username
                })
            })
            .catch(err => console.log("ERROR:\n" + err));
        await this.getAllWidgets()
            .then(res => {
                this.setState({
                    all_widgets: res.data.all_widgets
                })
            })
            .catch(err => console.log("ERROR: \n" + err));
        await this.getUserWidgets()
            .then(res => {
                this.setState({
                    user_widgets: res.data
                })
            })
            .catch(err => {
                console.log("ERROR:\n" + err);
            });
        this.renderAllWidgets();
        this.renderUserWidgets();
    }

    getUserData = async () => {
        const access_token = await AsyncStorage.getItem("access_token");
        const response = await fetch("http://" + frontendConfig.server_address + ':' + frontendConfig.socket_server_port + "/native/getUserData", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            }
        })
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    getAllWidgets = async () => {
        const access_token = await AsyncStorage.getItem("access_token");
        const response = await fetch('http://' + frontendConfig.server_address + ':' + frontendConfig.socket_server_port + '/native/getAllWidgets', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            }
        });
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    getUserWidgets = async () => {
        const access_token = await AsyncStorage.getItem("access_token");
        const response = await fetch("http://" + frontendConfig.server_address + ':' + frontendConfig.socket_server_port + "/native/getUserWidgets?user_id=" + this.state.username, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            }
        });
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

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
                    app.socket.emit('app_drop_event', {
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