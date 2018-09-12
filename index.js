const express = require('express');
const app = express();
const server = require('http').Server(app);
// Not used yet
const io = require('socket.io')(server);

app.use(express.static('public'));

server.listen(process.env.PORT || 5000);
