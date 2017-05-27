//declare app object
$(document).ready(function () {
  app.init();
});

var app = {
  // ad server address for HRSF 77 and 78
  // use server for now ... for 77 
  // use hrsf78 for 78 
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/lobby',
  hrsf78: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',


  // write init function
  init: function () {
    app.fetch();
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
        app.fetch();
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        //console log error when the message doesnt to 
        console.error('chatterbox: Failed to send message', message);
      }
    });
  },

  // write fetch function
  fetch: function () {
    app.clearMessages();
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'GET',
      contentType: 'application/json',
      //sort data accroding newest to oldest 
      data: { order: '-createdAt' },
      success: function (data) {
        console.log(data);
        for (var i = 0; i < data.results.length; i++) {
          app.renderMessage(data.results[i]);
        }
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  clearMessages: function () {
    //use jquery to remove items in a given div
    $('#chats').empty();
  },

  renderMessage: function (message) {
    $('#chats').append('<div class="chatMessages">' + message.username + ' : ' + message.text + '</div>');
  },

  renderRoom: function (message, room) {

  },

  handleUsernameClick: function () {

  },

  handleSubmit: function () {

  },

  removeMessage(obj) {
    obj.results.forEach(result => {
      $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: this.server + '/' + result.objectId,
        type: 'DELETE',
        contentType: 'application/json',
        success: function (data) {
          console.log('Successfully DELETED', data);
        },
        error: function (data) {
          console.error('chatterbox: Failed to GET data', data);
        }
      });
    });
  },

  removeAllMessages(obj) {
    console.log('Inside removeAllMessages lobby');
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
      contentType: 'application/json',
      data: 'order=-createdAt',
      success: this.removeMessage.bind(this),
      error: function (data) {
        console.error('chatterbox: Failed to GET data', data);
      }
    });
  }
};

setInterval(app.fetch, 5000);