//Imports
import { HidePanel, LoadLevels } from "./functions.js";
import { levels } from "./levels.js";
import { drawBackGround } from "./background.js";
import { drawPlayer } from "./drawPlayer.js";
import { PlayerMove, BordeMove } from "./playerMove.js";

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
socket.on("getPlayer", (_player, _oponent) => {
  player = _player;
  oponent = _oponent;
  PlayerMove(canvasSize, player, socket);
});

const animate = () => {
  ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  drawBackGround(ctx, canvasSize);
  if (player) {
    drawPlayer(ctx, player, canvasSize);
    BordeMove(player, canvasSize);
  }
  if (oponent) {
    drawPlayer(ctx, oponent, canvasSize);
  }
  requestAnimationFrame(animate);
};
animate();
