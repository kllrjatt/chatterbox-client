//declare app object
$(document).ready(function () {
  // intialize the chat window when dom is ready 
  app.init();
});


//find chat user name
// slice window.location.search
var chattingUser = window.location.search.slice(10).split('%20').join(' ');

//find current room using selct option checked value
var currentRoom = function () { return $('select#roomSelect option:checked').val(); };
// find current message using #chatbox value
var currentMessage = function () { return $('#chatbox').val(); };

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
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'GET',
      contentType: 'application/json',
      //sort data accroding newest to oldest  
      data: { order: '-createdAt' },
      success: function (data) {
        //clear messages 
        app.clearMessages();
        // have static room anmes
        var roomNames = ['4chan', 'XSS', 'CW TV Shows'];
        // itreate through data to render messages on screen
        for (var i = 0; i < data.results.length; i++) {
          app.renderMessage(data.results[i]);
          // add unique rooms names to the page
          if (roomNames.indexOf(data.results[i].roomname) === -1) {
            roomNames.push(data.results[i].roomname);
          }
        }
        //iterate through the room area
        //drop all room naes
        $('#roomSelect').empty();
        //sort room names
        roomNames.sort();
        //iterate through room names to add them to the dom. 
        for (var j = 0; j < roomNames.length; j++) {
          app.renderRoom(roomNames[j]);
        }
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  clearMessages: function () {
    //use jquery to remove items for a targeted div 
    $('#chats').empty();
  },

  renderMessage: function (message) {
    // use append to add message to dom 
    $('#chats').append('<div class="chatMessages">' + message.username + ' : ' + message.text + ' in ' + message.roomname + '</div>');
  },

  renderRoom: function (roomname) {
    // use append to add new messages 
    $('#roomSelect').append('<option value=' + roomname + '>' + roomname + '</option>');
  },

  handleUsernameClick: function () {

  },

  handleSubmit: function (event) {
    event.preventDefault();
    var message = {
      username: chattingUser,
      text: currentMessage(),
      roomname: currentRoom()
    };
    app.send(message);
    app.clearMessages();
    app.fetch();
    $('#chatbox').val('');
    
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



 