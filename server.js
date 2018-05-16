var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

users = [];
connnections = [];

server.listen(process.env.PORT || 3000);
console.log("Server Running...")



app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html'); 
});

io.sockets.on('connnection', function(socket){
	connnections.push(socket);
	console.log("connected %s sockets connected", connnections.length);

	//Disconnect
	sockets.on('disconnect', function(data){
		connnections.splice(connnections.indexOf(socket), 1);
		console.log('Disconnected %s sockets connected', connnections.length);
	});	

	socket.on('send message', function(data){
		io.sockets.emit('new message', {msg: data});
	});
	
});