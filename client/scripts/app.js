//declare app object

var app = {
  // ad server address for HRSF 77 and 78
  // use server for now ... for 77 
  // use hrsf78 for 78 
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  hrsf78: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',

  // write init function
  init: function () {

  },
  // write send function to post message to the server 
  send: function (message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'POST',
      //stringify the message prior to sending
      data: JSON.stringify(message),
      contentType: 'application/json',
      // onsend console log data
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        //console log error when the message doesnt to 
        console.error('chatterbox: Failed to send message', message);
      }
    });
  },

  // write fetch function
  fetch: function (data) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'GET',
      contentType: 'application/json',
      data: { order: '-createdAt' },
      success: function (data) {
        console.log(data);
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  clearMessages: function () {

  },

  renderMessage: function () {

  },

  renderRoom: function () {

  },

  handleUsernameClick: function () {

  },

  handleSubmit: function () {

  }
};