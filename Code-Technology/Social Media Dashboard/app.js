const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
require('./sockets/chat')(io);

// other Express middleware and routes

server.listen(5000);
