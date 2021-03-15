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

socket.on('message',(message)=>{
  console.log(message)
})

const messageForm=document.querySelector('#message-form')



messageForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  // console.log('send')
  const message=e.target.message.value
socket.emit('sendMessage',message)
})