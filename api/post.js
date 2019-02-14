import config from "../config";
import responseMessages from '../responseMessages';
import deviceStorage from "../src/deviceStorage";
import {AsyncStorage} from "react-native";


export const signUp = async (username, password) => {
    try {
        // post username and pw to backend and check input, eitherwise register new account and go back to login
        // save access_token in AsyncStorage
        let response = await fetch("http://" + config.SERVER_ADDRESS + ':' + config.SOCKET_SERVER_PORT + "/native/signup", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        });
        return {
            status: JSON.parse(response._bodyText).status,
            message: responseMessages.FETCH_SUCCESS + ", " + JSON.parse(response._bodyText).message,
            response: JSON.parse(response._bodyText)
        };
    } catch (err) {
        return {
            status: false,
            message: responseMessages.FETCH_ERROR,
            error: err
        };
    }
}

export const signIn = async (username, password) => {
    try {
        // post username and pw to backend and check input, eitherwise register new account and go back to login
        // save access_token in AsyncStorage
        let response = await fetch("http://" + config.SERVER_ADDRESS + ':' + config.SOCKET_SERVER_PORT + "/native/signin", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        });
        return {
            status: JSON.parse(response._bodyText).status,
            message: responseMessages.FETCH_SUCCESS + ", " + JSON.parse(response._bodyText).message,
            token: JSON.parse(response._bodyText).token
        };
    } catch (err) {
        return {
            status: false,
            message: responseMessages.FETCH_ERROR,
            error: err
        };
    }
}

export const authorizeToken = async () => {
    try {
        const access_token = await AsyncStorage.getItem("access_token");
        let response = await fetch("http://" + config.SERVER_ADDRESS + ':' + config.SOCKET_SERVER_PORT + "/native/authizeToken", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
            body: ""
        });
        return {
            status: JSON.parse(response._bodyText).status,
            message: responseMessages.FETCH_SUCCESS + ", " + JSON.parse(response._bodyText).message,
            authorized: JSON.parse(response._bodyText).authorized
        };
    } catch (err) {
        return {
            status: false,
            message: responseMessages.FETCH_ERROR,
            error: err
        };
    }
}

export const uploadWunderlistSettings = async (todoList, wl_access_token, wl_client_id) => {
    try {
        const access_token = await AsyncStorage.getItem("access_token");
        let response = await fetch("http://" + config.SERVER_ADDRESS + ':' + config.SOCKET_SERVER_PORT + "/native/uploadWunderlistSettings", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
            body: JSON.stringify({
                "todoList": todoList,
                "wl_access_token": wl_access_token,
                "wl_client_id": wl_client_id
            })
        });
        return {
            status: JSON.parse(response._bodyText).status,
            message: responseMessages.FETCH_SUCCESS + ", " + JSON.parse(response._bodyText).message
        };
    } catch (err) {
        return {
            status: false,
            message: responseMessages.FETCH_ERROR,
            error: err
        };
    }
}

export const uploadImage = async (data) => {
    try {
        const access_token = await AsyncStorage.getItem("access_token");
        let response = await fetch("http://" + config.SERVER_ADDRESS + ':' + config.SOCKET_SERVER_PORT + "/native/uploadImage", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
            body: data
        });
        return {
            status: JSON.parse(response._bodyText).status,
            message: responseMessages.FETCH_SUCCESS + ", " + JSON.parse(response._bodyText).message
        };
    } catch (err) {
        return {
            status: false,
            message: responseMessages.FETCH_ERROR,
            error: err
        };
    }
}