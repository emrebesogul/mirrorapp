import React, {Component} from 'react';
import {
    View,
    AsyncStorage,
    Text,
    ScrollView
} from 'react-native';

import DragContainer from '../lib/DragContainer';
import AllWidget from '../lib/AllWidget';
import WidgetContent from '../lib/WidgetContent';
import UserWidget from '../lib/UserWidget';
import WidgetDeleteZone from '../lib/WidgetDeleteZone';

import styles from './styles';
import {getWidgets, getUserData} from "../api/get";

import {sendSocketMessage} from './socketConnection';

import MenuButton from './components/MenuButton';

export default class DragDropApp extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            allWidgets: [],
            userWidgets: []
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
            handleAllWidgets.push(<AllWidget
                key={widget.name}
                data={{widgetName: widget.name, previousSlot: null}}
                style={styles.box}>
                <WidgetContent widgetName={widget.name}/>
            </AllWidget>)
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
            handleUserWidgets.push(<UserWidget
                key={widget ? widget.name + index : index}
                onDrop={async (e) => {
                    let access_token = await AsyncStorage.getItem('access_token');
                    await sendSocketMessage('app_update_widgets', {
                        token: access_token,
                        widgetName: e.widgetName,
                        previousSlot: e.previousSlot,
                        slot: index
                    }, function (response) {
                        if (response.status) {
                            app.renderUserWidgets();
                        }
                    });
                }}
                style={styles.box}
                draggable={widget ? true : false}
                data={widget ? {widgetName: widget.name, previousSlot: index} : null}
            >
                <WidgetContent key={widget ? widget.name + index : index}
                               widgetName={widget ? widget.name : ''}/>
            </UserWidget>)
        })
        this.setState({
            userWidgets: handleUserWidgets
        });
    }

    render() {
        let app = this;
        return (
            <DragContainer style={styles.container}>

                <View style={styles.headerBar}>
                    <Text style={styles.headerTitle}>Home</Text>
                </View>

                <View style={styles.dragDropContent}>
                    <View style={styles.dragDropContainer}>
                        <View style={styles.row}>
                            {this.state.userWidgets.slice(0, 4)}
                        </View>

                        <View style={styles.dragDropMidContainer}>
                            <WidgetDeleteZone
                                style={styles.deleteZone}
                                onDrop={async (e) => {
                                    console.log(e)
                                    let access_token = await AsyncStorage.getItem('access_token');
                                    await sendSocketMessage('app_update_widgets', {
                                        token: access_token,
                                        widgetName: e.widgetName,
                                        previousSlot: e.previousSlot,
                                        slot: null
                                    }, function (response) {
                                        if (response.status) {
                                            app.renderUserWidgets();
                                        }
                                    });
                                }}
                            />
                            <ScrollView horizontal={true} style={styles.widgetScrollView}>
                                {this.state.allWidgets}
                            </ScrollView>
                        </View>

                        <View style={styles.row}>
                            {this.state.userWidgets.slice(4, 8)}
                        </View>
                    </View>
                </View>
            </DragContainer>
        )
    }
}
