const lightGrass = "#669900";
const darkGrass = "#336600";
const lineColor = "#ffffff";

const lineSize = 10;
const grassSize = 60;
const penaltyArea = {
  width: 100,
  height: 220,
};
export const drawBackGround = (ctx, canvasSize) => {
  //Grass
  ctx.fillStyle = lightGrass;
  ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
  ctx.fillStyle = darkGrass;
  for (let index = 0; index < 15; index++) {
    if (index % 2 == 0) {
      continue;
    }
    ctx.fillRect(grassSize * index, 0, grassSize, canvasSize.height);
  }

  //Lines
  ctx.fillStyle = lineColor;
  ctx.strokeStyle = lineColor;
  ctx.fillRect(0, 0, lineSize, canvasSize.height); //Top Line
  ctx.fillRect(canvasSize.width - lineSize, 0, lineSize, canvasSize.height); //Right Line
  ctx.fillRect(0, 0, canvasSize.width, lineSize); //BottonmLine
  ctx.fillRect(0, canvasSize.height - lineSize, canvasSize.width, lineSize); //Left Line
  ctx.fillRect(canvasSize.width / 2 - lineSize, 0, lineSize, canvasSize.height); //Mid Line
  ctx.strokeRect(
    0,
    canvasSize.height / 2 - penaltyArea.height / 2,
    penaltyArea.width,
    penaltyArea.height
  ); //Left Penalty Area
  ctx.strokeRect(
    canvasSize.width - penaltyArea.width,
    canvasSize.height / 2 - penaltyArea.height / 2,
    penaltyArea.width,
    penaltyArea.height
  ); //Right Penalty Area

  //Mid Arc Line
  ctx.beginPath();
  ctx.arc(canvasSize.width / 2, canvasSize.height / 2, 60, 0, 2 * Math.PI);
  ctx.stroke();
  //Top-Left Corner
  ctx.beginPath();
  ctx.arc(0, 0, 60, 0, 2 * Math.PI);
  ctx.stroke();
  //Top-Right Corner
  ctx.beginPath();
  ctx.arc(canvasSize.width, 0, 60, 0, 2 * Math.PI);
  ctx.stroke();

  //Bottom-Left Corner
  ctx.beginPath();
  ctx.arc(0, canvasSize.height, 60, 0, 2 * Math.PI);
  ctx.stroke();

  //Bottom-Rigt Corner
  ctx.beginPath();
  ctx.arc(canvasSize.width, canvasSize.height, 60, 0, 2 * Math.PI);
  ctx.stroke();
};
