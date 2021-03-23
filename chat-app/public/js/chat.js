const socket = io();

//Elements
const $messageForm = document.querySelector("#message-form");
const $messageFormButton = $messageForm.querySelector("button");
const $messageFormInput = $messageForm.querySelector("input");
const $sendLocationButton = document.querySelector("#send-location");
const $messages = document.querySelector("#messages");

//Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationTemplate = document.querySelector("#location-template").innerHTML;

//Options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

socket.on("message", (message) => {
  console.log(message);

  const html = Mustache.render(messageTemplate, {
    username:message.username
    ,message: message.text,
    createdAt: moment(message.createdAt).format("h:mm a"),
  });

  $messages.insertAdjacentHTML("beforeend", html);
});

$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log('send')
  $messageFormButton.setAttribute("disabled", "disabled");
  const message = e.target.message.value;
  socket.emit("sendMessage", message, (error) => {
    $messageFormButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();

    if (error) {
      return console.log(error);
    }

    console.log("The message was delivered");
  });
});

socket.on("locationMessage", (url) => {
  console.log(url);

  const html = Mustache.render(locationTemplate, {
    username:url.username,
    url: url.text,
    createdAt: moment(url.createdAt).format("h:mm a"),
  });

  $messages.insertAdjacentHTML("beforeend", html);
});

$sendLocationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Your Browser doesn't support navigator");
  }
  $sendLocationButton.setAttribute("disabled", "disabled");

  navigator.geolocation.getCurrentPosition((position) => {
    data = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    // console.log(data)
    socket.emit("sendLocation", data, (error) => {
      $sendLocationButton.removeAttribute("disabled");

      if (error) {
        return console.log(error);
      }
      console.log("Location Shared");
    });
  });
});


socket.emit('join',{username,room},(error)=>{
  if(error){
    alert(error)
    location.href='/'
  }

  // console.log("User Joined")
})