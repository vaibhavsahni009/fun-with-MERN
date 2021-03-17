const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const Filter=require('bad-words')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, "../public");

app.use(express.static(publicDirPath));

// let count = 0;

io.on("connection", (socket) => {
  console.log("new webSocket connection");

  socket.emit("message", "welcome");
  socket.broadcast.emit("message", "A new user has joined");
  // socket.emit("countUpdated", count);
  // socket.on("increment", () => {
  //   count++;
  //   // socket.emit('countUpdated',count)
  //   io.emit("countUpdated", count);
  // });

  socket.on("sendMessage", (message, callback) => {

    const filter=new Filter()

    if(filter.isProfane(message)){
      return callback('Profanity not allowed')
    }

    io.emit("message", message);
    callback();
  });

  socket.on("sendLocation", (data,callback) => {
    io.emit(
      "message",
      `https://google.com/maps?q=${data.latitude},${data.longitude}`
    );
      callback();
  });

  socket.on("disconnect", () => {
    io.emit("message", "A user disconnected");
  });
});

app.get("", (req, res) => {
  res.render("index");
});

server.listen(port, () => {
  console.log("server Started on " + port);
});
