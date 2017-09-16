const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: "server@example.com",
    text: "This is a message from the server.",
    createdAt: new Date().getTime()
  })

  socket.on('createMessage', function (message) {
    message.createdAt = new Date().getTime();
    console.log(`Received new message: ${JSON.stringify(message)}`);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  })
});

server.listen(port, () => {
  console.log(`Server is started on port ${port}`)
});

// socket.emit('newEmail', {
//   from: 'mike@example.com',
//   text: 'Hey.  Whats going on?',
//   createdAt: 123
// });
//
// // Event going from client to server
// socket.on('createEmail', (newEmail) => {
//   console.log('createEmail', newEmail);
// });
