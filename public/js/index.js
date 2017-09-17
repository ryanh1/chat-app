var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  var li  = jQuery('<li></li>');
  // The contents in the a tab are the link text
  // target is the attribute.  It is non-dynamic, meaning that it does not come from the message object
  // _blank tells the browser to open up a new url in a new tab instead of redirecting the current tab
  var a   = jQuery('<a target="_blank">My current location</a>')
  // Set an attribute on the li object
  li.text(`${message.from}: `);
  // Update the anchor tag.  You can set and fetch attributes on your jQuery selected elements using this method
  // If you provide 1 argument, such as a.attr('target'), it fetches the element, in which case it would return _blank.
  // If you provide 2 arguments, it sets the value.
  // Here we set the href value = to the url, which we have under message.url
  // It is better to not put the urls in template strings above.  It is better to set attributes this way.  Instead use li.text or a.attribute.  This prevents malicious behavior if people try to inject html that they shouldn't inject.
  a.attr('href', message.url);
  // Append the anchor tag to li.
  li.append(a);
  // append li to the messages list
  jQuery('#messages').append(li);


  jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function() {

  });
});

var locationButton = jQuery('#send-location');
// Making multiple jQuery calls is time-expensive.  It's better to use a variable.
locationButton.on('click', function() {
  // navigator.geolocation - returns true if the browser has been given access to the geolocation api (that almost all browsers have access to)
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  // uses the navigator.geolocation api to get the curentPosition.  The callback function is called if there is an error - meaning that the user denies the browser geolocation access.
  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location.')
  })
});
