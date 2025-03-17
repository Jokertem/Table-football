const pipesColor = "#3d3939";
const pipesSize = 5;
const playerOneColor = "#e20404";
export const drawPlayer = (ctx, player, canvasSize) => {
  //Draw Pipes
  ctx.fillStyle = pipesColor;
  ctx.fillRect(
    player.goalKeeper.x + player.size.width / 2 - pipesSize / 2,
    0,
    pipesSize,
    canvasSize.height
  );
  ctx.fillRect(
    player.defense[0].x + player.size.width / 2 - pipesSize / 2,
    0,
    pipesSize,
    canvasSize.height
  );

  //Draw Pawns
  ctx.fillStyle = playerOneColor;
  ctx.fillRect(
    player.goalKeeper.x,
    player.goalKeeper.y,
    player.size.width,
    player.size.height
  );
  player.defense.forEach((defensePawn) => {
    ctx.fillRect(
      defensePawn.x,
      defensePawn.y,
      player.size.width,
      player.size.height
    );
  });
};
