var app = require('http').createServer(handler)
, io = require('socket.io').listen(app)
, fs = require('fs')

app.listen(8080);


io.set('transports', [
        'websocket',
        'flashsocket',
        'htmlfile',
        'xhr-polling',
        'jsonp-polling'
        ]);


function handler (req, res) {
	fs.readFile(__dirname + '/index.html',
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading index.html');
			}

			res.writeHead(200);
			res.end(data);
		});
}

io.sockets.on('connection', function (socket) {




	socket.on('message', function (msg, name) {
		socket.broadcast.emit('message', {name : name, message : msg});
	});

	fs.readFile('motd.txt', function (err, data) {
		socket.emit('servermessage',data.toString() );
	});
});