import React, {Component} from 'react';
import {Button, Image, Text, View} from "react-native";
import styles from "./styles";
import {getUserData} from "../api/get";
import MenuButton from './components/MenuButton';
import { Container, Header, Body, Left, Right, Title, Content } from 'native-base';

export default class Settings extends Component {

    static navigationOptions = {
      drawerLabel: 'Settings',
    };

    constructor(props) {
        super(props);
        this.state = {
            currentUser: "",
        };
    }

    async componentDidMount() {
        let response = await getUserData();
        if (response.status === true) {
            this.setState({
                currentUser: response.username
            });
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
                        <Title>Settings</Title>
                    </Body>
                    <Right />
                </Header>

                <Content>
                    <Text>Hello {this.state.currentUser} from Settings screen.</Text>
                    <Button title="User Profile Settings" onPress={() => {}} />
                    <Button title="Set Face ID" onPress={() => {}} />
                    <Button title="Log me Out!" onPress={() => {}} />
                </Content>

            </Container>
        );
    }
}
