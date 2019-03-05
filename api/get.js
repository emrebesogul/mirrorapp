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
            },
        });
        return {
            status: JSON.parse(response._bodyText).status,
            message: responseMessages.FETCH_SUCCESS + ", " + JSON.parse(response._bodyText).message,
            username: JSON.parse(response._bodyText).username,
            face_image: JSON.parse(response._bodyText).face_image
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

export const getAllWidgets = async () => {
    try {
        const access_token = await AsyncStorage.getItem("access_token");
        let server_address = await AsyncStorage.getItem("server_address");
        let response = await fetch(server_address + "/native/getAllWidgets", {
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
            data: {
                all_widgets: JSON.parse(response._bodyText).data.all_widgets
            }
        };
    } catch (err) {
        return {
            status: false,
            message: responseMessages.FETCH_ERROR,
            error: err
        };
    }
}


export const getUserWidgets = async (username) => {
    try {
        const access_token = await AsyncStorage.getItem("access_token");
        let server_address = await AsyncStorage.getItem("server_address");
        let response = await fetch(server_address + "/native/getUserWidgets?user_id=" + username, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            }
        })
        return {
            status: JSON.parse(response._bodyText).status,
            message: responseMessages.FETCH_SUCCESS + ", " + JSON.parse(response._bodyText).message,
            data: JSON.parse(response._bodyText).data
        };
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
