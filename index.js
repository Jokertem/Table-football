const express = require("express");
const { createServer } = require("node:http");
const path = require("node:path");
const { Server } = require("socket.io");
const app = express();
const server = createServer(app);
const io = new Server(server);
const crypto = require("crypto");
const Player = require("./classes/player");
const Goal = require("./classes/goal");
const Ball = require("./classes/ball");

const port = 4000;
app.use(express.static(path.join(__dirname, "/")));

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("joinSingle", (canvasSizes, speed) => {
    const roomID = crypto.randomUUID(); // Create Room ID
    let player = new Player(1, canvasSizes, 10, false); //Create Player
    let oponent = new Player(2, canvasSizes, speed, true); //Create Bot
    const scoreboard = { max: 9, pl1: 0, pl2: 0 }; //Create ScoreBoard
    const goals = []; //Gools Array
    goals.push(new Goal(1, canvasSizes)); //Add Goal
    goals.push(new Goal(2, canvasSizes)); //Add Goal
    const ball = new Ball(canvasSizes); //Create Ball
    socket.join(roomID); //Join Room
    io.to(roomID).emit("getPlayer", player, oponent, goals, ball, scoreboard); //Base Emit
    socket.on("updatePos", (_player) => {
      player = _player;
    });
    ball.restart(canvasSizes); // Set Ball Velocity
    setInterval(() => {
      ball.updade(canvasSizes, goals, scoreboard);
      ball.PlayerBounce(player);
      ball.PlayerBounce(oponent);
      if (ball.velocityY !== 0) {
        oponent.botMove(ball, canvasSizes);
      }
      socket.emit("getGame", ball, oponent, scoreboard);
    }, 60);
  });
});

server.listen(port, () => {
  console.log(`server running at PORT ${port}`);
});
