//Imports
import { HidePanel, LoadLevels } from "./functions.js";
import { levels } from "./levels.js";
import { DrawBackGround } from "./background.js";
import { DrawPlayer } from "./drawPlayer.js";
import { SetEvents, PlayerMove } from "./playerMove.js";
import { DrawGoals } from "./drawGoals.js";
import { DrawBall } from "./drawBall.js";
import { DrawScore } from "./drawScore.js";

//Panel Buttons Events
document.querySelector("#btSingle").addEventListener("click", () => {
  HidePanel();
  LoadLevels(levels, canvasSize, socket);
});

document.querySelector("#btMulti").addEventListener("click", () => {
  HidePanel();
});

//Unlock Level
const unlockLevels = localStorage.getItem("level") | 1;

//Get Canvas
const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
console.log(ctx);
const canvasSize = {
  width: 1100,
  height: 550,
};
canvas.width = canvasSize.width;
canvas.height = canvasSize.height;

//Socket Connections
const socket = io();
let player;
let oponent;
let goals;
let ball;
let scoreboard;
socket.on("winSingle", () => {
  if (Number(unlockLevels) <= levels.length) {
    //Unlock new Level
    let newLevel = Number(unlockLevels);
    newLevel++;
    console.log(newLevel);
    localStorage.setItem("level", newLevel);
  }

  setTimeout(() => {
    LoadLevels(levels, canvasSize, socket);
  }, 1000);
});
socket.on("loseSingle", () => {
  setTimeout(() => {
    LoadLevels(levels, canvasSize, socket);
  }, 1000);
});
socket.on("getPlayer", (_player, _oponent, _goals, _ball, _scoreborad) => {
  player = _player;
  oponent = _oponent;
  goals = _goals;
  ball = _ball;
  scoreboard = _scoreborad;
  console.log(_goals);
  SetEvents();
});
socket.on("getGame", (_ball, _oponent, _scoreboard) => {
  ball = _ball;
  oponent = _oponent;
  scoreboard = _scoreboard;
});

const animate = () => {
  ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  DrawBackGround(ctx, canvasSize);
  if (player) {
    DrawPlayer(ctx, player, canvasSize);
  }
  if (oponent) {
    DrawPlayer(ctx, oponent, canvasSize);
  }
  if (goals) {
    DrawGoals(ctx, goals);
  }
  if (ball) {
    DrawBall(ctx, ball);
  }
  if (scoreboard) {
    DrawScore(ctx, scoreboard, canvasSize);
  }
  PlayerMove(canvasSize, player, socket);
  requestAnimationFrame(animate);
};
animate();
