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
const Room = require("./classes/room");
const port = 4000;
app.use(express.static(path.join(__dirname, "/")));

const rooms = [];

io.on("connection", (socket) => {
  console.log("a user connected");
  //Single Player
  socket.on("joinSingle", (canvasSizes, speed) => {
    const roomID = crypto.randomUUID(); // Create Room ID
    let player = new Player(1, canvasSizes, 16, false); //Create Player
    let oponent = new Player(2, canvasSizes, speed, true); //Create Bot
    const scoreboard = { max: 6, pl1: 0, pl2: 0 }; //Create ScoreBoard
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
    const gameInterval = setInterval(() => {
      ball.updade(canvasSizes, goals, scoreboard);
      ball.PlayerBounce(player);
      ball.PlayerBounce(oponent);
      if (ball.velocityY !== 0) {
        oponent.botMove(ball, canvasSizes);
      }
      if (scoreboard.pl1 >= scoreboard.max) {
        //Win
        io.to(roomID).emit("winSingle");
        socket.leave(roomID);
        clearInterval(gameInterval);
      } else if (scoreboard.pl2 >= scoreboard.max) {
        //Lose
        io.to(roomID).emit("loseSingle");
        clearInterval(gameInterval); //Stop Interval
        socket.leave(roomID); //Leave Room
      }
      socket.emit("getGame", ball, oponent, scoreboard);
    }, 60);
  });

  //Multi Player
  socket.on("loadRooms", () => {
    socket.emit("getRooms", rooms);
  });

  socket.on("createRoom", (canvasSize) => {
    const ball = new Ball(canvasSize); //Create Ball
    const goals = []; //Create Goals
    goals.push(new Goal(1, canvasSize)); //Add Goal
    goals.push(new Goal(2, canvasSize)); //Add Goal
    rooms.push(new Room(ball, goals)); //Create New Room
  });
  socket.on("joinRoom", (id, canvasSize) => {
    const room = findRoom(id); //Find Room
    if (room.players.length < 2) {
      socket.emit("join");
    } else {
      return;
    }

    socket.join(id); //Join Room
    socket.playerId; //Save Player ID

    if (!room.players[0]) {
      room.players[0] = new Player(1, canvasSize, 16, false);
      socket.emit(
        "getPlayerMulti",
        room.players[0],
        room.goals,
        room.ball,
        room.scoreboard
      );
      socket.playerId = 0;
    } else if (!room.players[1]) {
      room.players[1] = new Player(2, canvasSize, 16, false);
      socket.emit(
        "getPlayerMulti",
        room.players[1],
        room.goals,
        room.ball,
        room.scoreboard
      );
      socket.playerId = 1;
      room.ball.restart(canvasSize); // Set Ball Velocity
    }

    socket.on("updatePos", (_player) => {
      room.players[socket.playerId] = _player;
    });
    const invetval = setInterval(() => {
      room.ball.updade(canvasSize, room.goals, room.scoreboard);
      if (room.players.length >= 2) {
        room.ball.PlayerBounce(room.players[0]);
        room.ball.PlayerBounce(room.players[1]);
      }

      if (socket.playerId === 0) {
        socket.emit("gameMulti", room.players[1], room.ball, room.scoreboard);
      } else if (socket.playerId === 1) {
        socket.emit("gameMulti", room.players[0], room.ball, room.scoreboard);
      }
    }, 60);
  });
});

const findRoom = (id) => {
  const roomIndex = rooms.findIndex((room) => room.id === id);

  return rooms[roomIndex];
};
server.listen(port, () => {
  console.log(`server running at PORT ${port}`);
});
