const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const Filter = require("bad-words");
const {
  generateMessageTime,
  generateLocationTime,
} = require("./utils/messages");
const {
  addUsers,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./utils/user");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, "../public");

app.use(express.static(publicDirPath));

// let count = 0;

io.on("connection", (socket) => {
  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUsers({ id: socket.id, username, room });

    if (error) {
      return callback(error);
    }

    console.log("new webSocket connection");

    socket.emit("message", generateMessageTime("Admin", "welcome"));
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        generateMessageTime("Admin", `${user.username} has joined`)
      );

    socket.join(user.room);
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback("Profanity not allowed");
    }

    io.to(user.room).emit(
      "message",
      generateMessageTime(user.username, message)
    );
    callback();
  });

  socket.on("sendLocation", (data, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit(
      "locationMessage",
      generateLocationTime(
        user.username,
        `https://google.com/maps?q=${data.latitude},${data.longitude}`
      )
    );
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessageTime("Admin", `${user.username} disconnected`)
      );
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

app.get("", (req, res) => {
  res.render("index");
});

server.listen(port, () => {
  console.log("server Started on " + port);
});
