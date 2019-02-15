import SocketIOClient from "socket.io-client";
import config from "../config";

export const socket = SocketIOClient('http://' + config.SERVER_ADDRESS + ':' + config.SOCKET_SERVER_PORT);