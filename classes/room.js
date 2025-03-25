const crypto = require("crypto");
class Room {
  constructor() {
    this.id = crypto.randomUUID();
    this.players = [];
    this.scorboard = { max: 6, pl1: 0, pl2: 0 };
  }
}
module.exports = Room;
