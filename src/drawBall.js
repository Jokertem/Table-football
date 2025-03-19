const ballColor = "#f2b706";
export const DrawBall = (ctx, ball) => {
  ctx.fillStyle = ballColor;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, 2 * Math.PI);
  ctx.fill();
  //ctx.fillRect(ball.x, ball.y, ball.size, ball.size);
};
