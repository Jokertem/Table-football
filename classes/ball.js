const ballSize = 16;
const ballSpeed = 15;
class Ball {
  constructor(canvasSize) {
    this.x = canvasSize.width / 2 - ballSize / 2;
    this.y = canvasSize.height / 2 - ballSize / 2;
    this.size = ballSize;
    this.speed = ballSpeed;
    this.acceleration = 0.1;
    this.maxSpeed = 30;
    this.velocityX = 0;
    this.velocityY = 0;
  }
  updade(canvasSize, goals, scoreboard) {
    //Move
    if (this.velocityX === -1) {
      this.x += this.velocityX * this.speed;
    } else if (this.velocityX === 1) {
      this.x += this.velocityX * this.speed;
    }
    if (this.velocityY === -1) {
      this.y += this.velocityY * 7;
    } else if (this.velocityY === 1) {
      this.y += this.velocityY * 7;
    }
    //Acceleration
    if (this.speed < this.maxSpeed) {
      this.speed += this.acceleration;
    }
    //Goal
    goals.forEach((goal) => {
      if (
        isColisons(
          { x: this.x, y: this.y, w: this.size, h: this.size },
          {
            x: goal.x,
            y: goal.y,
            w: goal.size.width,
            h: goal.size.height,
          }
        )
      ) {
        if (goal.id === 1) {
          scoreboard.pl2++;
          this.restart(canvasSize);
        } else {
          scoreboard.pl1++;
          this.restart(canvasSize);
        }
      }
    });

    //Border Bounce
    if (this.y < 0) {
      this.velocityY = 1;
    }
    if (this.y + this.size > canvasSize.height) {
      this.velocityY = -1;
    }
    if (this.x < 0) {
      this.velocityX = 1;
    }
    if (this.x + this.size > canvasSize.width) {
      this.velocityX = -1;
    }
  }
  PlayerBounce(player) {
    if (
      isColisons(
        { x: this.x, y: this.y, w: this.size, h: this.size },
        {
          x: player.goalKeeper.x,
          y: player.goalKeeper.y,
          w: player.size.width,
          h: player.size.height,
        }
      )
    ) {
      bounce(this, player);
    }
    player.defense.forEach((pawn) => {
      if (
        isColisons(
          { x: this.x, y: this.y, w: this.size, h: this.size },
          {
            x: pawn.x,
            y: pawn.y,
            w: player.size.width,
            h: player.size.height,
          }
        )
      ) {
        bounce(this, player);
      }
    });
    player.aid.forEach((pawn) => {
      if (
        isColisons(
          { x: this.x, y: this.y, w: this.size, h: this.size },
          {
            x: pawn.x,
            y: pawn.y,
            w: player.size.width,
            h: player.size.height,
          }
        )
      ) {
        bounce(this, player);
      }
    });
    player.attack.forEach((pawn) => {
      if (
        isColisons(
          { x: this.x, y: this.y, w: this.size, h: this.size },
          {
            x: pawn.x,
            y: pawn.y,
            w: player.size.width,
            h: player.size.height,
          }
        )
      ) {
        bounce(this, player);
      }
    });
  }
  restart(canvasSize) {
    this.x = canvasSize.width / 2 - ballSize / 2;
    this.y = canvasSize.height / 2 - ballSize / 2;
    this.speed = ballSpeed;
    const randomX = Math.floor(Math.random() * 2);
    const randomY = Math.floor(Math.random() * 2);
    setTimeout(() => {
      if (randomX === 0) {
        this.velocityX = -1;
      } else {
        this.velocityX = 1;
      }
      if (randomY === 0) {
        this.velocityY = -1;
      } else {
        this.velocityY = 1;
      }
    }, 1000);
  }
}
module.exports = Ball;
const bounce = (ball, player) => {
  if (player.id === 1) {
    ball.velocityX = 1;
  } else {
    ball.velocityX = -1;
  }
  const randomY = Math.floor(Math.random() * 2);
  if (randomY === 0) {
    ball.velocityY = -1;
  } else {
    ball.velocityY = 1;
  }
};
const isColisons = (obj1, obj2) => {
  return (
    obj1.x < obj2.x + obj2.w &&
    obj1.x + obj1.w > obj2.x &&
    obj1.y < obj2.y + obj2.h &&
    obj1.y + obj1.h > obj2.y
  );
};
