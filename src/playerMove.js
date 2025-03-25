const move = {
  up: false,
  down: false,
};
export const SetEvents = () => {
  window.addEventListener("keydown", (e) => {
    const code = e.code;
    if (code === "ArrowUp" || code === "ArrowDown") {
      e.preventDefault();
    }
    if (code === "ArrowUp" || code === "KeyW") {
      move.up = true;
    } else if (code === "ArrowDown" || code === "KeyS") {
      move.down = true;
    }
  });
  window.addEventListener("keyup", (e) => {
    const code = e.code;

    if (code === "ArrowUp" || code === "KeyW") {
      move.up = false;
    } else if (code === "ArrowDown" || code === "KeyS") {
      move.down = false;
    }
  });
};
export const PlayerMove = (canvasSize, player, socket) => {
  if (move.up) {
    if (player.aid[0].y < 0) {
      return;
    }
    player.aid.forEach((pawn) => {
      pawn.y -= player.speed;
    });

    player.attack.forEach((pawn) => {
      pawn.y -= player.speed;
    });
    player.defense.forEach((pawn) => {
      pawn.y -= player.speed;
    });

    player.goalKeeper.y -= player.speed;
  } else if (move.down) {
    if (player.aid[1].y + player.size.height > canvasSize.height) {
      return;
    }
    player.aid.forEach((pawn) => {
      pawn.y += player.speed;
    });

    player.attack.forEach((pawn) => {
      pawn.y += player.speed;
    });
    player.defense.forEach((pawn) => {
      pawn.y += player.speed;
    });

    player.goalKeeper.y += player.speed;
  }
  if (move.down || move.up) {
    socket.emit("updatePos", player);
  }
};
