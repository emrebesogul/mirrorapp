import SocketIOClient from 'socket.io-client'
import {AsyncStorage} from 'react-native'

const socket = null;

export async function connectSocket() {
    let server_address = await AsyncStorage.getItem('server_address');
    this.socket = SocketIOClient(server_address);
    console.log('socket connected')
}

export async function sendSocketMessage(topic, payload, callback) {
    return new Promise(async (resolve, reject) => {
        if (!this.socket) {
            await connectSocket()
        }
        await this.socket.emit(topic, payload, function(response) {
            callback(JSON.parse(response));
        });
        resolve();
    })
}

export async function handleSocketMessage(topic, callback) {
    if (!this.socket) {
        await connectSocket()
    }
    this.socket.on(topic, function (data) {
        callback(data)
    });
}