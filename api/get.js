import {AsyncStorage} from "react-native";
import responseMessages from "../responseMessages";

export const getUserData = async () => {
    try {
        const access_token = await AsyncStorage.getItem("access_token");
        let server_address = await AsyncStorage.getItem("server_address");
        let response = await fetch(server_address + "/native/getUserData", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            }
        });
        return {
            status: JSON.parse(response._bodyText).status,
            message: responseMessages.FETCH_SUCCESS + ", " + JSON.parse(response._bodyText).message,
            user_data: JSON.parse(response._bodyText).user_data
        };
    } catch (err) {
        return {
            status: false,
            message: responseMessages.FETCH_ERROR,
            error: err
        };
    }
}

export const getWunderlistSettings = async () => {
    try {
        const access_token = await AsyncStorage.getItem("access_token");
        let server_address = await AsyncStorage.getItem("server_address");
        let response = await fetch(server_address + "/native/getWunderlistSettings", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
        });
        return {
            status: JSON.parse(response._bodyText).status,
            message: responseMessages.FETCH_SUCCESS + ", " + JSON.parse(response._bodyText).message,
            settings: JSON.parse(response._bodyText).settings
        };
    } catch (err) {
        return {
            status: false,
            message: responseMessages.FETCH_ERROR,
            error: err
        };
    }
}

export const getWidgets = async () => {
    try {
        const access_token = await AsyncStorage.getItem("access_token");
        let server_address = await AsyncStorage.getItem("server_address");
        let response = await fetch(server_address + "/native/getWidgets", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            }
        });
        return JSON.parse(response._bodyText).widgets;
    } catch (err) {
        return {
            status: false,
            message: responseMessages.FETCH_ERROR,
            error: err
        };
    }
}

export const getWeatherSettings = async () => {
    try {
        const access_token = await AsyncStorage.getItem("access_token");
        let server_address = await AsyncStorage.getItem("server_address");
        let response = await fetch(server_address + "/native/getWeatherSettings", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            },
        });
        return {
            status: JSON.parse(response._bodyText).status,
            message: responseMessages.FETCH_SUCCESS + ", " + JSON.parse(response._bodyText).message,
            settings: JSON.parse(response._bodyText).settings
        };
    } catch (err) {
        return {
            status: false,
            message: responseMessages.FETCH_ERROR,
            error: err
        };
    }
}
