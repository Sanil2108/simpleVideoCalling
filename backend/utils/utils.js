const { v4: uuidv4 } = require('uuid');

function log(...args) {
    console.log(args)
}

function getUUID() {
    return uuidv4()
}

module.exports = {
    log,
    getUUID
}