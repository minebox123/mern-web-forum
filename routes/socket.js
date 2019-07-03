const socket_io = require("socket.io");
const io = socket_io();
const socketApi = {};

socketApi.io = io;

io.on("connection", socket => {
  console.log("A user connected");
});

socketApi.sendNotification = () => {
  io.sockets.emit("hello", { msg: "hello world" });
};

module.exports = socketApi;
