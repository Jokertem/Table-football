const playerSize = {
  width: 20,
  height: 50,
};
const pawnsPos = {
  goalKeeper: 50,
  defense: 145,
  aid: 360,
  atteck: 640,
};

class Player {
  constructor(id, canvasSize, speed) {
    this.id = id;
    this.size = playerSize;

    this.speed = speed;
    //Player One
    if (id === 1) {
      this.goalKeeper = {
        x: pawnsPos.goalKeeper,
        y: canvasSize.height / 2 - playerSize.height / 2,
        prevY: undefined,
      };
      this.defense = [
        {
          x: pawnsPos.defense,
          y: canvasSize.height / 2 - playerSize.height / 2 - 90,
          prevY: undefined,
        },
        {
          x: pawnsPos.defense,
          y: canvasSize.height / 2 - playerSize.height / 2 + 90,
          prevY: undefined,
        },
      ];
      this.aid = [
        {
          x: pawnsPos.aid,
          y: canvasSize.height / 2 - playerSize.height / 2 - 180,
          prevY: undefined,
        },
        {
          x: pawnsPos.aid,
          y: canvasSize.height / 2 - playerSize.height / 2 + 180,
          prevY: undefined,
        },
        {
          x: pawnsPos.aid,
          y: canvasSize.height / 2 - playerSize.height / 2 - 60,
          prevY: undefined,
        },
        {
          x: pawnsPos.aid,
          y: canvasSize.height / 2 - playerSize.height / 2 + 60,
          prevY: undefined,
        },
      ];
      this.attack = [
        {
          x: pawnsPos.atteck,
          y: canvasSize.height / 2 - playerSize.height / 2,
          prevY: undefined,
        },
        {
          x: pawnsPos.atteck,
          y: canvasSize.height / 2 - playerSize.height / 2 - 130,
          prevY: undefined,
        },
        {
          x: pawnsPos.atteck,
          y: canvasSize.height / 2 - playerSize.height / 2 + 130,
          prevY: undefined,
        },
      ];
    }
    //Player Two
    else if (id === 2) {
      this.goalKeeper = {
        x: canvasSize.width - pawnsPos.goalKeeper - playerSize.width / 2,
        y: canvasSize.height / 2 - playerSize.height / 2,
      };
      this.defense = [
        {
          x: canvasSize.width - pawnsPos.defense - playerSize.width / 2,
          y: canvasSize.height / 2 - playerSize.height / 2 - 90,
        },
        {
          x: canvasSize.width - pawnsPos.defense - playerSize.width / 2,
          y: canvasSize.height / 2 - playerSize.height / 2 + 90,
        },
      ];
      this.aid = [
        {
          x: canvasSize.width - pawnsPos.aid - playerSize.width / 2,
          y: canvasSize.height / 2 - playerSize.height / 2 - 180,
        },
        {
          x: canvasSize.width - pawnsPos.aid - playerSize.width / 2,
          y: canvasSize.height / 2 - playerSize.height / 2 + 180,
        },
        {
          x: canvasSize.width - pawnsPos.aid - playerSize.width / 2,
          y: canvasSize.height / 2 - playerSize.height / 2 - 60,
        },
        {
          x: canvasSize.width - pawnsPos.aid - playerSize.width / 2,
          y: canvasSize.height / 2 - playerSize.height / 2 + 60,
        },
      ];
      this.attack = [
        {
          x: canvasSize.width - pawnsPos.atteck - playerSize.width / 2,
          y: canvasSize.height / 2 - playerSize.height / 2,
        },
        {
          x: canvasSize.width - pawnsPos.atteck - playerSize.width / 2,
          y: canvasSize.height / 2 - playerSize.height / 2 - 130,
        },
        {
          x: canvasSize.width - pawnsPos.atteck - playerSize.width / 2,
          y: canvasSize.height / 2 - playerSize.height / 2 + 130,
        },
      ];
    }
  }
}
module.exports = Player;
