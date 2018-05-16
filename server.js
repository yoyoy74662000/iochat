var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

user = [];
connnections = [];

server.listen(process.env.PORT || 3000);
console.log("Server Running...")



app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html'); 
});

io.socket.on('connnections', function(socket){
	connnections.push(socket);
	console.log("connected %s sockets connected")
});