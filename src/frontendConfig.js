import SocketIOClient from "socket.io-client";
import {AsyncStorage} from "react-native";

export const socket = async () => {
    let server_address = await AsyncStorage.getItem("server_address");
    SocketIOClient(server_address);
}