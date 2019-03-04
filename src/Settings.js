import React, {Component} from 'react';
import {Button, Image, Text, View} from "react-native";
import deviceStorage from "./deviceStorage";
import {ImagePicker, Permissions} from "expo";
import styles from "./styles";
import {getUserData} from "../api/get";
import {uploadImage} from "../api/post";
import responseMessages from '../responseMessages';
import {showAlert} from "../utils";
import config from "../config";


export default class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: "",
            image: null,
            type: null,
            updatedImage: false,
        };
    }

    async componentDidMount() {
        let response = await getUserData();
        if (response.status === true) {
            this.setState({
                image: response.face_image
            });
        }
    }

    logout = async () => {
        deviceStorage.saveItem("access_token", "empty");
        this.props.navigation.navigate('QRScanner');
    }

    pickImage = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (status === 'granted') {
            ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            }).then(newPostImage => {
                if (!newPostImage.cancelled) {
                    this.setState({image: newPostImage.uri})
                    this.setState({type: newPostImage.type})
                    this.setState({updatedImage: true})
                } else {
                    this.setState({updatedImage: false})
                }
            })
                .catch(err => console.log(err))
        }
    };

    processUploadImage = async () => {

        // check if image is updated or not... if new image -> upload, else don't burden traffic... => missing!
        const data = new FormData();

        data.append('file', {
            uri: this.state.image,
            type: this.state.type, // or photo.type
            name: 'opencvImage'
        });

        // check if image is selected... alert if not... else upload/update user image
        if (this.state.image !== null && this.state.type !== null && this.state.updatedImage) {
            let response = await uploadImage(data);
            if (response.status === true) {
                showAlert("Success!", responseMessages.IMAGE_UPLOAD_SUCCESS);
            } else {
                showAlert("Error!", responseMessages.IMAGE_UPLOAD_ERROR);
            }
        } else {
            showAlert("Error!", responseMessages.IMAGE_UPLOAD_ERROR);
        }

    }


    render() {
        return (
            <View style={styles.container}>
                <Text>Hello from Settings screen.</Text>

                <Button
                    title="Pick an image from camera roll"
                    onPress={this.pickImage}
                />

                {this.state.image !== "" && this.state.updatedImage === false ?
                    <Image source={{uri: config.SERVER_ADDRESS + config.IMAGE_UPLOAD_PATH + this.state.image}}
                           style={styles.stretch}/>
                    :
                    <View>
                        {this.state.updatedImage === true ?
                            <Image source={{uri: this.state.image}} style={styles.stretch}/>
                            : <View><Text>No picture uploaded yet...</Text><Image source={require('../assets/user.png')}
                                                                                  style={styles.stretch}/></View>
                        }
                    </View>
                }

                <Button
                    title="Upload or Update Image for Face Recognition"
                    onPress={this.processUploadImage}
                />

            </View>
        );
    }
}