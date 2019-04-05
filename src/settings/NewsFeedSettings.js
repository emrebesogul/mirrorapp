import React, {Component} from 'react'
import {Text, View, TouchableOpacity, Alert, TextInput, ScrollView, AsyncStorage} from 'react-native'
import {isURL} from "../../utils";
import {getUserData} from "../../api/get";
import {sendSocketMessage} from "../socketConnection";
import styles from "../styles";
import MenuButton from '../components/MenuButton';

export default class NewsFeedSettings extends Component {

    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    }

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            text: 'Add URL...',
            inputUrl: '',
            clearInput: false
        }
    }

    async componentDidMount() {
        await this.renderNewsFeedItems();
    }

    async renderNewsFeedItems() {
        let response = await getUserData();
        if (response.user_data.newsFeedItems) {
            let handleItems = [];
            response.user_data.newsFeedItems.forEach(function (item, index) {
                handleItems.push({
                    _id: item._id,
                    url: item.url
                });
            })
            this.setState({
                items: handleItems
            });
        }
    }

    handleDeleteItem = (item) => {
        Alert.alert(
            'Delete Item',
            'Do you want to delete ' + item.url + ' from your NewsFeed?',
            [{
                text: 'No',
                style: 'cancel',
            },
                {
                    text: 'Yes',
                    onPress: () => this.deleteItem(item)
                }],
            {
                cancelable: false
            },
        );
    }

    async addItem(e) {
        this.setState({
            clearInput: true
        });
        if (isURL(e.nativeEvent.text)) {
            let text = e.nativeEvent.text
            let app = this;
            let access_token = await AsyncStorage.getItem('access_token');
            await sendSocketMessage('app_update_newsFeedItems', {
                token: access_token,
                _id: null,
                url: text
            }, function (response) {
                if (response.status) {
                    app.renderNewsFeedItems();
                }
            });
        }
    }

    async deleteItem(deleteItem) {

        let access_token = await AsyncStorage.getItem('access_token');
        let app = this;
        await sendSocketMessage('app_update_newsFeedItems', {
            token: access_token,
            _id: deleteItem._id,
            url: null
        }, function (response) {
            if (response.status) {
                app.renderNewsFeedItems();
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.headerBar}>
                    <Text style={styles.headerTitle}>News Feed</Text>
                </View>

                <View style={styles.content}>

                    <Text style={styles.contentText}>Please insert your news feed links below:</Text>

                    <TextInput
                        style={styles.input}
                        placeholder='News Feed URL'
                        autoCapitalize="none"
                        placeholderTextColor='white'
                        onSubmitEditing={this.addItem.bind((this))}
                        autoFocus={true}
                        clearTextOnFocus={true}
                        onChangeText={inputUrl => this.setState({
                            inputUrl: inputUrl,
                            clearInput: false
                        })}
                        value={this.state.clearInput ? '' : this.state.inputUrl}
                    />

                    <ScrollView>
                        <View>
                            {
                                this.state.items.map((item, index) => (
                                    <TouchableOpacity
                                        key={item._id}
                                        onPress={() => this.handleDeleteItem(item)}
                                        style={{
                                            padding: 10,
                                            marginTop: 3,
                                            backgroundColor: '#d9f9b1',
                                            alignItems: 'center'
                                        }}>
                                        <Text>
                                            {item.url}
                                        </Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}
