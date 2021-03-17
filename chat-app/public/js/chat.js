const socket = io();

// socket.on("countUpdated", (count) => {
//   console.log("count updated", count);
// });

// document.querySelector("#increment").addEventListener("click", () => {
//   console.log("clicked");
//   socket.emit('increment')
// });

// socket.on("newUser", (message) => {
//   console.log(message);
// });

socket.on("message", (message) => {
  console.log(message);
});

const messageForm = document.querySelector("#message-form");

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log('send')
  const message = e.target.message.value;
  socket.emit("sendMessage", message, (error) => {

    if (error){
     return console.log(error)
    }

    console.log("The message was delivered");
  });
});

document.querySelector("#send-location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Your Browser doesn't support navigator");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    data = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    // console.log(data)
    socket.emit("sendLocation", data,(error)=>{
      if (error){
        return console.log(error)
      }
      console.log('Location Shared')
    });
  });
});
