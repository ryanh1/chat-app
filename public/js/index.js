var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});


// newMessage
// emitted by the server and sent to the client
// from: string, text: string, createdAt: timeStamp
// Print console.log('Got new message') on client
socket.on('newMessage', function (message) {
  console.log(`Received new message: ${JSON.stringify(message)}`);
});

socket.emit('createMessage', {
  from: "client@example.com",
  text: "This is a message from the client."
})
// createMessage
// emitted from client to server
// server fires new message events to everyone else so that they can see the message
// from: string, text: string
// server creates createdAt property
// Set up event listener on the server that waits for this to fire and click console.log when it works


// socket.emit calls on server to make sure that this stuff happens


// socket.emit('createEmail', {
//   to: 'jen@example.com',
//   text: 'Hey, this is Andrew!'
// })
//
// socket.on('newEmail', function(email) {
//   console.log('New email: ', email);
// });
