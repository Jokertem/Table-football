const ballSize = 16;
const ballSpeed = 8;
class Ball {
  constructor(canvasSize) {
    this.x = canvasSize.width / 2 - ballSize / 2;
    this.y = canvasSize.height / 2 - ballSize / 2;
    this.size = ballSize;
    this.speed = ballSpeed;
    this.acceleration = 0.1;
    this.maxSpeed = 35;
    this.velocityX = 0;
    this.velocityY = 0;
  }
  updade(canvasSize) {
    //Move
    if (this.velocityX === -1) {
      this.x += this.velocityX * this.speed;
    } else if (this.velocityX === 1) {
      this.x += this.velocityX * this.speed;
    }
    if (this.velocityY === -1) {
      this.y += this.velocityY * this.speed;
    } else if (this.velocityY === 1) {
      this.y += this.velocityY * this.speed;
    }
    //Acceleration
    if (this.speed < this.maxSpeed) {
      this.speed += this.acceleration;
    }
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
}
module.exports = Ball;
const bounce = (ball, player) => {
  if (player.id === 1) {
    ball.velocityX = 1;
  } else {
    ball.velocityX = -1;
  }
  ball.velocityY * -1;
};
const isColisons = (obj1, obj2) => {
  return (
    obj1.x < obj2.x + obj2.w &&
    obj1.x + obj1.w > obj2.x &&
    obj1.y < obj2.y + obj2.h &&
    obj1.y + obj1.h > obj2.y
  );
};
