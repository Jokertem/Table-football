export const PlayerMove = (canvasSize, player, socket) => {
  window.addEventListener("keydown", (e) => {
    const code = e.code;
    console.log(code);
    if (code === "KeyW") {
      player.defense.forEach((pawn) => {
        pawn.prevY = pawn.y;
        pawn.y -= player.speed;
      });

      player.goalKeeper.prevY = player.goalKeeper.y;
      player.goalKeeper.y -= player.speed;
    } else if (code === "KeyS") {
      player.defense.forEach((pawn) => {
        pawn.prevY = pawn.y;
        pawn.y += player.speed;
      });
      player.goalKeeper.prevY = player.goalKeeper.y;
      player.goalKeeper.y += player.speed;
    }
    if (code === "ArrowUp") {
      player.aid.forEach((pawn) => {
        pawn.prevY = pawn.y;
        pawn.y -= player.speed;
      });

      player.attack.forEach((pawn) => {
        pawn.prevY = pawn.y;
        pawn.y -= player.speed;
      });
    } else if (code === "ArrowDown") {
      player.aid.forEach((pawn) => {
        pawn.prevY = pawn.y;
        pawn.y += player.speed;
      });

      player.attack.forEach((pawn) => {
        pawn.prevY = pawn.y;
        pawn.y += player.speed;
      });
    }
    socket.emit("updatePos", player);
  });
};
export const BordeMove = (player, canvasSize) => {
  if (player.defense[0].y < 0) {
    player.defense.forEach((pawn) => {
      pawn.y = pawn.prevY;
    });
    player.goalKeeper.y = player.goalKeeper.prevY;
  }
  if (player.defense[1].y + player.size.height > canvasSize.height) {
    player.defense.forEach((pawn) => {
      pawn.y = pawn.prevY;
    });
    player.goalKeeper.y = player.goalKeeper.prevY;
  }

  if (player.aid[0].y < 0) {
    player.aid.forEach((pawn) => {
      pawn.y = pawn.prevY;
    });
    player.attack.forEach((pawn) => {
      pawn.y = pawn.prevY;
    });
  }
  if (player.aid[1].y + player.size.height > canvasSize.height) {
    player.aid.forEach((pawn) => {
      pawn.y = pawn.prevY;
    });
    player.attack.forEach((pawn) => {
      pawn.y = pawn.prevY;
    });
  }
};
