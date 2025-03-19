export const PlayerMove = (canvasSize, player, socket) => {
  window.addEventListener("keydown", (e) => {
    const code = e.code;

    if (code === "KeyW") {
      if (player.defense[0].y < 0) {
        return;
      }

      player.defense.forEach((pawn) => {
        pawn.y -= player.speed;
      });

      player.goalKeeper.y -= player.speed;
    } else if (code === "KeyS") {
      if (player.defense[1].y + player.size.height > canvasSize.height) {
        return;
      }
      player.defense.forEach((pawn) => {
        pawn.y += player.speed;
      });

      player.goalKeeper.y += player.speed;
    }
    if (code === "ArrowUp") {
      if (player.aid[0].y < 0) {
        return;
      }
      player.aid.forEach((pawn) => {
        pawn.y -= player.speed;
      });

      player.attack.forEach((pawn) => {
        pawn.y -= player.speed;
      });
    } else if (code === "ArrowDown") {
      if (player.aid[1].y + player.size.height > canvasSize.height) {
        return;
      }
      player.aid.forEach((pawn) => {
        pawn.y += player.speed;
      });

      player.attack.forEach((pawn) => {
        pawn.y += player.speed;
      });
    }
    socket.emit("updatePos", player);
  });
};
