const {
  getInstance: getMeetingDriverInstance,
  initialize: initializeMeetingDriver
} = require('./meetingDriver/meetingDriver')

const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('Health Check')
});

// Set up meeting driver
initializeMeetingDriver(server)

server.listen(8000, () => {
  console.log('listening on *:3000');
});