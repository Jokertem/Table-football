//Imports
import { HidePanel, LoadLevels } from "./functions.js";
import { levels } from "./levels.js";
import { drawBackGround } from "./background.js";
import { drawPlayer } from "./drawPlayer.js";

//Socket Connections
const socket = io();
let player;
socket.on("getPlayer", (_player) => {
  console.log(_player);
  player = _player;
});

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

const animate = () => {
  ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  drawBackGround(ctx, canvasSize);
  if (player) {
    drawPlayer(ctx, player, canvasSize);
  }
  requestAnimationFrame(animate);
};
animate();
