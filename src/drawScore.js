const fontColor = "#000000";
export const DrawScore = (ctx, scoreboard, canvasSize) => {
  const text1 = `${scoreboard.pl1}/${scoreboard.max}`;
  const text2 = `${scoreboard.pl2}/${scoreboard.max}`;
  ctx.font = "40px arial";
  ctx.fillStyle = fontColor;
  ctx.fillText(text1, 285, 90);
  ctx.fillText(text2, canvasSize.width - 225, 90);
};
