import React, {Component} from 'react';
import {Button, TextInput, View} from "react-native";
import deviceStorage from "./deviceStorage";
import {getWunderlistSettings} from "../api/get";
import {uploadWunderlistSettings} from "../api/post";
import {showAlert} from "../utils";
import responseMessages from '../responseMessages';
import {socket} from './frontendConfig';
import MenuButton from './components/MenuButton';
import { Container, Header, Body, Left, Right, Title, Content, Form, Input, Item, Label, Card, CardItem, Text} from 'native-base';

export default class Wunderlist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentWunderlistSettings: [],
            todoList: "",
            wl_access_token: "",
            wl_client_id: ""
        };
    }

    async componentDidMount() {
        let response = await getWunderlistSettings();
        if (response.status === true && response.settings) {
            this.setState({
                currentWunderlistSettings: response.settings,
                todoList: response.settings.todo_list,
                wl_access_token: response.settings.client_secret,
                wl_client_id: response.settings.client_id
            });
        }
    }

    processUploadWunderlistSettings = async () => {
        let response = await uploadWunderlistSettings(this.state.todoList, this.state.wl_access_token, this.state.wl_client_id);
        if (response.status === true) {
            showAlert("Success!", responseMessages.WUNDERLIST_UPLOAD_SUCCESS);
            // Send socket update to web ui
            socket.emit('send_wunderlist_settings', {
                message: "update your web ui...!"
            });

        } else {
            showAlert("Error!", responseMessages.WUNDERLIST_UPLOAD_ERROR);
        }
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <MenuButton navigation={this.props.navigation} />
                    </Left>
                    <Body>
                        <Title>To Do List</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Card>
                        <CardItem header>
                          <Text>Wunderlist Instruction</Text>
                        </CardItem>
                      <CardItem>
                        <Body>
                          <Text>Please register with your Google Account at https://developer.wunderlist.com/ and insert your CLIENT ID and ACCESS TOKEN in the fields below</Text>
                        </Body>
                      </CardItem>
                    </Card>
                    <Form>
                        <Item stackedLabel>
                            <Label>List from the Wunderlist App</Label>
                            <Input value={this.state.todoList} autoCapitalize="none" autoCorrect={false} onChangeText={(todoList) => this.setState({todoList})} />
                        </Item>
                        <Item stackedLabel>
                            <Label>ACCESS TOKEN</Label>
                            <Input value={this.state.wl_access_token} autoCapitalize="none" autoCorrect={false} onChangeText={(wl_access_token) => this.setState({wl_access_token})} />
                        </Item>
                        <Item stackedLabel>
                            <Label>CLIENT ID</Label>
                            <Input value={this.state.wl_client_id} autoCapitalize="none" autoCorrect={false} onChangeText={(wl_client_id) => this.setState({wl_client_id})} />
                        </Item>
                    </Form>
                    <Button title="Setup To Do Widget" onPress={this.processUploadWunderlistSettings} />
                </Content>
            </Container>
        );
    }
}
