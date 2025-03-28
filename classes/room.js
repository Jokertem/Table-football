const crypto = require("crypto");
class Room {
  constructor(ball, goals) {
    this.id = crypto.randomUUID();
    this.players = [];
    this.scoreboard = { max: 6, pl1: 0, pl2: 0 };
    this.ball = ball;
    this.goals = goals;
  }
}
module.exports = Room;
