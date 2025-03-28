const goalSize = {
  width: 15,
  height: 175,
};
class Goal {
  constructor(id, canvasSize) {
    this.id = id;
    if (id === 1) {
      this.x = 0;
      this.y = canvasSize.height / 2 - goalSize.height / 2;
      this.size = goalSize;
    } else if (id === 2) {
      this.x = canvasSize.width - goalSize.width;
      this.y = canvasSize.height / 2 - goalSize.height / 2;
      this.size = goalSize;
    }
  }
}
module.exports = Goal;
