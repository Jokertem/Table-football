const playerSize = {
  width: 20,
  height: 55,
};
const pawnsPos = {
  goalKeeper: 50,
  defense: 195,
  aid: 460,
  atteck: 760,
};

class Player {
  constructor(id, canvasSize, speed, bot) {
    this.id = id;
    this.size = playerSize;
    this.speed = speed;
    this.bot = bot;
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
          y: canvasSize.height / 2 - playerSize.height / 2 - 140,
          prevY: undefined,
        },
        {
          x: pawnsPos.atteck,
          y: canvasSize.height / 2 - playerSize.height / 2 + 140,
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
  botMove(ball, canvasSize) {
    if (this.bot === true) {
      const movePoint = canvasSize.height / 2;

      if (ball.y + ball.size / 2 < movePoint) {
        if (this.aid[0].y < 0) {
          return;
        }
        this.aid.forEach((pawn) => {
          pawn.y -= this.speed;
        });

        this.attack.forEach((pawn) => {
          pawn.y -= this.speed;
        });
        this.defense.forEach((pawn) => {
          pawn.y -= this.speed;
        });

        this.goalKeeper.y -= this.speed;
      } else if (ball.y + ball.size / 2 > movePoint) {
        if (this.aid[1].y + this.size.height > canvasSize.height) {
          return;
        }
        this.aid.forEach((pawn) => {
          pawn.y += this.speed;
        });

        this.attack.forEach((pawn) => {
          pawn.y += this.speed;
        });
        this.defense.forEach((pawn) => {
          pawn.y += this.speed;
        });

        this.goalKeeper.y += this.speed;
      }
    }
  }
}
module.exports = Player;
