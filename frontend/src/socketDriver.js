import { io } from "socket.io-client";

class SocketDriver {
    constructor() {
        
    }

    connect() {
        this.socket = io(`http://api.videocaller.sanilk.xyz`);
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