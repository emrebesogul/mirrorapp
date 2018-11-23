import React, {Component} from 'react';
import SocketIOClient from 'socket.io-client';
import frontendConfig from './frontendConfig';
import deviceStorage from './deviceStorage';
import {
    Text,
    View,
    LayoutAnimation,
    Alert,
    ScrollView,
    AsyncStorage
} from 'react-native';

import {
    DragContainer,
    Draggable,
    DropZone
} from './DragDropIndex'


class MyDropZoneContent extends React.Component {

    constructor(props) {
        super(props);
        this.displayText = props.displayText;
    }

    componentWillReceiveProps({dragOver}) {
        if (dragOver !== this.props.dragOver) LayoutAnimation.easeInEaseOut();
    }

    render() {
        return <View style={{
            width: this.props.dragOver ? 110 : 100,
            height: this.props.dragOver ? 110 : 100,
            backgroundColor: '#ddd',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <View>
                <Text>{this.displayText}</Text>
            </View>
        </View>
    }
}


class DeleteZone extends React.Component {
    componentWillReceiveProps({dragOver}) {
        if (dragOver !== this.props.dragOver) LayoutAnimation.easeInEaseOut();
    }

    render() {
        return <View style={{
            top: this.props.dragOver ? 0 : -100,
            height: 100,
            backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <View>
                <Text>{'DELETE'}</Text>
            </View>
        </View>
    }
}

class DraggyInner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            widget_name: props.widget_name
        }
    }

    render() {
        if (this.props.dragOver && !this.props.ghost && !this.props.dragging) {
            return <View style={{height: 100, width: 100, backgroundColor: 'green'}}>
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
        return <View style={[{
            height: 100,
            width: 100,
            backgroundColor: this.props.ghost ? '#777' : '#777'
        }, this.props.dragging ? shadows : null]}>
            <Text>{this.state.widget_name}</Text>
        </View>
    }
}


class Draggy extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            widget_id: props.widget_id,
            widget_name: props.widget_name
        }
    }

    render() {
        return <Draggable data={{widget_id: this.state.widget_id, widget_name: this.state.widget_name}}
                          style={{margin: 7.5}}>
            <DropZone>
                <DraggyInner widget_name={this.state.widget_name}/>
            </DropZone>
        </Draggable>
    }
}

class DragDropTest extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'DragDropTest';
        this.socket = SocketIOClient('http://192.168.2.104:5000');
        this.state = {
            all_widgets: []
        }
    }

    componentDidMount() {
        this.getAllWidgets()
            .then(res => {
                this.setState({
                    all_widgets: res.data.all_widgets
                })
            })
    }

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

    render() {
        let draggyElements = [];
        this.state.all_widgets.forEach(function (widget) {
            draggyElements.push(<Draggy widget_id={widget.widget_id} widget_name={widget.widget_name}/>)
        });
        let dropZones = [];
        for (let dropZoneCounter = 0; dropZoneCounter < 8; dropZoneCounter++) {
            dropZones.push(<DropZone onDrop={e => {
                Alert.alert("Dropped it on area " + dropZoneCounter);
                this.socket.emit('app_drop_event', {
                    previous_slot: null,
                    slot: dropZoneCounter,
                    widget_id: e.widget_id,
                    widget_name: e.widget_name,
                    remove: false
                });
            }}>
                <MyDropZoneContent displayText={dropZoneCounter}/>
            </DropZone>)
        }

        return <DragContainer>
            <View style={{justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'row'}}>
                {dropZones[0]}
                {dropZones[1]}
                {dropZones[2]}
                {dropZones[3]}
            </View>
            <View style={{justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'row'}}>
                {dropZones[4]}
                {dropZones[5]}
                {dropZones[6]}
                {dropZones[7]}
            </View>
            <ScrollView horizontal={true}>
                <View style={{justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'row'}}>
                    {draggyElements}
                </View>
            </ScrollView>
        </DragContainer>
    }
}

export default class DragDropApp extends Component {
    render() {
        return (
            <DragDropTest/>
        );
    }
}