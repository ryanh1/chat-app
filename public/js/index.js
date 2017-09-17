var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li  = jQuery('<li></li>');
  var a   = jQuery('<a target="_blank">My current location</a>')
  li.text(`${message.from} ${formattedTime}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);


  jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function() {
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  // Set the disabled attribute equal to the key value disabled, , and change the text attribute.
  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position) {
    // If the geolocation is successfully obtained, remove the disabled attribution of the location button, and change the text attribute.
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    // If the geolocation is not successfully obtained, remove the disabled attribution of the location button, , and change the text attribute.
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.')
  })
});
