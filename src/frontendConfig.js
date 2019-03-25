import SocketIOClient from "socket.io-client";
import {AsyncStorage} from "react-native";

export const initializeSocket = async () => {
    let server_address = await AsyncStorage.getItem("server_address");
    this.socket =  SocketIOClient(server_address);
}

export const socket = SocketIOClient("http://192.168.178.20:5000");
