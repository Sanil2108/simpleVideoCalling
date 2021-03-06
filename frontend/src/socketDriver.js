import { io } from "socket.io-client";

class SocketDriver {
    constructor() {
        
    }

    connect() {
        this.socket = io(`http://Videocallingbackend-env.eba-u8accu3s.ap-south-1.elasticbeanstalk.com`);
    }

    sendMessage(eventName, data) {
        this.socket.emit(eventName, data)
    }

    listen(eventName, callback) {
        this.socket.on(eventName, callback);
    }

    getSocketId() {
        return this.socket.id
    }
}

let socketDriver = null

function initialize() {
    socketDriver = new SocketDriver()
    socketDriver.connect()
}

function getInstance() {
    return socketDriver
}

export {
    initialize,
    getInstance,
}