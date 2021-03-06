'use strict';

//Socket.io and other general requirements
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(process.env.PORT || 3000);

//Directories
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket) {

    //On canvas change
    socket.on('canvasChange', function(data) {
        socket.broadcast.emit('canvasChange', data);
    });
});