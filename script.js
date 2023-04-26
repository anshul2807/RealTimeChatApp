// Server Code link : https://glitch.com/edit/#!/insidious-whimsical-santanaraptor?path=server.js%3A7%3A0
const serverURL = "https://insidious-whimsical-santanaraptor.glitch.me/";
$(function() {
    const socket = io(serverURL);
  
    // Get username from user input
    const username = prompt("Please enter your name");
  
    // Send username to server
    socket.emit("user connected", username);
  
    // Update online user count
    socket.on("online users count", function(count) {
      $(".online-users").text(`Users online: ${count}`);
    });
  
    // Display message sent by other users
    socket.on("chat message", function(data) {
      const messageElement = $("<div class='chat-message'></div>");
      const usernameElement = $("<span class='username'></span>").text(data.username + ":");
      const messageTextElement = $("<span class='message'></span>").text(data.message);
      messageElement.append(usernameElement).append(messageTextElement);
      if (data.username === username) {
        messageElement.addClass("own-message");
      }
      $(".chat-log").append(messageElement);
      $(".chat-log").scrollTop($(".chat-log")[0].scrollHeight);
    });
  
    // Send message when user clicks send button
    $("#send-button").on("click", function() {
      const message = $("#message-input").val();
      if (message !== "") {
        socket.emit("chat message", { username: username, message: message });
        $("#message-input").val("");
      }
    });
  
    // Send message when user presses enter key
    $("#message-input").on("keyup", function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        $("#send-button").click();
      }
    });
  });