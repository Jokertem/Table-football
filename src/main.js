//Imports
import { HidePanel, LoadLevels } from "./functions.js";
import { levels } from "./levels.js";
import { DrawBackGround } from "./background.js";
import { DrawPlayer } from "./drawPlayer.js";
import { PlayerMove } from "./playerMove.js";
import { DrawGoals } from "./drawGoals.js";
import { DrawBall } from "./drawBall.js";

//Panel Buttons Events
document.querySelector("#btSingle").addEventListener("click", () => {
  HidePanel();
  LoadLevels(levels, canvasSize, socket);
});

document.querySelector("#btMulti").addEventListener("click", () => {
  HidePanel();
});

//Get Canvas
const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
console.log(ctx);
const canvasSize = {
  width: 900,
  height: 500,
};
canvas.width = canvasSize.width;
canvas.height = canvasSize.height;

//Socket Connections
const socket = io();
let player;
let oponent;
let goals;
let ball;
socket.on("getPlayer", (_player, _oponent, _goals, _ball) => {
  player = _player;
  oponent = _oponent;
  goals = _goals;
  ball = _ball;
  PlayerMove(canvasSize, player, socket);
});
socket.on("getGame", (_ball) => {
  ball = _ball;
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
  requestAnimationFrame(animate);
};
animate();
