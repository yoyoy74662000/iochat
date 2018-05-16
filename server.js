var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
users = []; 
connections = []; 
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  	connections.push(socket);
	console.log('Connected: %s sockets connected', connections.length);

	//Disconnect 
	socket.on('disconnect', function(data){
    	connections.splice(connections.indexOf(socket), 1);
    	console.log('Disconnected: %s sockets connected', connections.length);
  	});

  	//Send Message 
  	socket.on('send message', function(data){
		//console.log("It worked"); 
		//console.log(data); 
		io.sockets.emit('new message', {msg: data, user: socket.username}); 
	}); 
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


// console.log('Server running...'); 




// io.sockets.on('connnection', function(socket){
	// connections.push(socket);
	// console.log('Connected: %s sockets connected', connections.length);

// 	socket.on('disconnect', function(data){
		// connections.splice(connections.indexOf(socket), 1);
  //   	console.log('Disconnected: %s sockets connected', connections.length);
//   });

	// //Disconnect 
	// socket.on('disconnect', function(data){ 
	// 	//users.splice(users.indexOf(socket.username), 1); 
	// 	//updateUsernames(); 
	// 	connections.splice(connections.indexOf(socket), 1); 
	// 	console.log('Disconnected: %s sockets connected', connections.length); 
	// }); 
	// //Send Message 
	// socket.on('send message', function(data){
	// 	console.log("It worked"); 
	// 	console.log(data); 
	// 	io.sockets.emit('new message', {msg: data, user: socket.username}); 
	// }); 
	
// });