const {
  initialize: initializeMeetingDriver
} = require('./meetingDriver/meetingDriver')

require('dotenv').config();

const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('Health Check')
});

// Set up meeting driver
initializeMeetingDriver(server)

server.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});