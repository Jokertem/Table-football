const pipesColor = "#3d3939";
const pipesSize = 5;
const playerOneColor = "#e20404";
const playerTwoColor = "#1E65B7";
export const DrawPlayer = (ctx, player, canvasSize) => {
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
  ctx.fillRect(
    player.aid[0].x + player.size.width / 2 - pipesSize / 2,
    0,
    pipesSize,
    canvasSize.height
  );
  ctx.fillRect(
    player.attack[0].x + player.size.width / 2 - pipesSize / 2,
    0,
    pipesSize,
    canvasSize.height
  );

  //Draw Pawns
  if (player.id === 1) {
    ctx.fillStyle = playerOneColor;
  } else {
    ctx.fillStyle = playerTwoColor;
  }
  ctx.fillRect(
    player.goalKeeper.x,
    player.goalKeeper.y,
    player.size.width,
    player.size.height
  );
  player.defense.forEach((pawn) => {
    ctx.fillRect(pawn.x, pawn.y, player.size.width, player.size.height);
  });
  player.aid.forEach((pawn) => {
    ctx.fillRect(pawn.x, pawn.y, player.size.width, player.size.height);
  });

  player.attack.forEach((pawn) => {
    ctx.fillRect(pawn.x, pawn.y, player.size.width, player.size.height);
  });
};
