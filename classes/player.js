const playerSize = {
  width: 20,
  height: 85,
};
class Player {
  constructor(id, canvasSize, speed) {
    this.id = id;
    this.size = playerSize;
    if (id === 1) {
      this.goalKeeper = {
        x: 50,
        y: canvasSize.height / 2 - playerSize.height / 2,
      };
      this.defense = [
        {
          x: 150,
          y: canvasSize.height / 2 - playerSize.height / 2 - 90,
        },
        {
          x: 150,
          y: canvasSize.height / 2 - playerSize.height / 2 + 90,
        },
      ];
    }
  }
}
module.exports = Player;
