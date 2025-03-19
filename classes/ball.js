const ballSize = 16;
class Ball {
  constructor(canvasSize) {
    this.x = canvasSize.width / 2;
    this.y = canvasSize.height / 2;
    this.size = ballSize;
    this.speed = 5;
    this.acceleration = 0.6;
    this.maxSpeed = 30;
    this.velocityX = 0;
    this.velocityY = 0;
  }
}
module.exports = Ball;
