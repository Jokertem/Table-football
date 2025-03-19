const goalColor = "#000000";
export const DrawGoals = (ctx, goals) => {
  ctx.fillStyle = goalColor;
  goals.forEach((goal) => {
    ctx.fillRect(goal.x, goal.y, goal.size.width, goal.size.height);
  });
};
