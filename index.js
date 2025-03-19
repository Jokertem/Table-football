const express = require("express");
const { createServer } = require("node:http");
const path = require("node:path");
const { Server } = require("socket.io");
const app = express();
const server = createServer(app);
const io = new Server(server);
const crypto = require("crypto");
const Player = require("./classes/player");

const port = 4000;
app.use(express.static(path.join(__dirname, "/")));

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("joinSingle", (canvasSizes, speed) => {
    console.log("Single");
    const roomID = crypto.randomUUID();
    const player = new Player(1, canvasSizes, speed);
    const oponent = new Player(2, canvasSizes, speed);
    socket.join(roomID);
    io.to(roomID).emit("getPlayer", player, oponent);
    socket.on("updatePos", (player) => {
      console.log(player);
    });
  });
});

server.listen(port, () => {
  console.log(`server running at PORT ${port}`);
});
