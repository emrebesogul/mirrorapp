import React, {Component} from 'react';
import {
    View,
    AsyncStorage,
    Text,
    ScrollView
} from 'react-native';

import DragContainer from '../lib/DragContainer';
import Draggable from '../lib/Draggable';
import DraggableContent from '../lib/DraggableContent';
import DropZone from '../lib/DropZone';
import DropZoneContent from '../lib/DropZoneContent';

import styles from './styles';
import {getWidgets, getUserData} from "../api/get";

import {socket} from './frontendConfig';

import MenuButton from './components/MenuButton';

export default class DragDropApp extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            allWidgets: [],
            userWidgets: [],
            user_id: null
        }
    }

    async componentDidMount() {
        this.renderUserWidgets();
        this.renderAllWidgets();
    }

    async renderAllWidgets() {
        let response = await getWidgets();
        let handleAllWidgets = [];
        response.forEach(function (widget) {
            handleAllWidgets.push(<Draggable
                key={widget.name}
                data={{widgetName: widget.name}}
                style={styles.box}>
                <DraggableContent widgetName={widget.name}/>
            </Draggable>)
        });
        this.setState({
            allWidgets: handleAllWidgets
        });
    }

    async renderUserWidgets() {
        let response = await getUserData();
        let handleUserWidgets = [];
        let app = this;
        response.user_data.widgets.forEach(function (widget, index) {
            let dropZoneContent;
            dropZoneContent = <DropZoneContent key={widget ? widget.name + index : index}
                                               displayText={widget ? widget.name : "Empty"}/>;
            handleUserWidgets.push(<DropZone
                key={widget ? widget.name + index : index}
                onDrop={async (e) => {
                    let access_token = await AsyncStorage.getItem('access_token');
                    socket.emit('app_update_widgets', {
                        token: access_token,
                        widget_name: e.widgetName,
                        previous_slot: null,
                        slot: index
                    });
                    app.renderUserWidgets();
                }}
                style={styles.box}
            >
                {dropZoneContent}
            </DropZone>)
        })
        this.setState({
            userWidgets: handleUserWidgets
        });
    }

    render() {
        return (
            <DragContainer style={styles.container}>

                <View style={styles.headerBar}>
                    <MenuButton navigation={this.props.navigation} />
                    <Text style={styles.headerTitle}>Home</Text>
                    <Text style={styles.toolbarButton}></Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.row}>
                        {this.state.userWidgets}
                    </View>
                    <ScrollView horizontal={true}>
                        <View style={{justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'row'}}>
                            {this.state.allWidgets}
                        </View>
                    </ScrollView>
                </View>
            </DragContainer>
        )
    }
}
