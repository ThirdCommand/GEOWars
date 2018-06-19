const MovingObject = require("../moving_object")

class BoxBox extends MovingObject {
  constructor(options) {
    super(options)
    this.pos = options.game.randomPosition();
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(pos[0] - (7/8 * this.BOX_SIZE), pos[1] - (1/8 * this.BOX_SIZE), this.BOX_SIZE, this.BOX_SIZE);
    ctx.lineWidth = 2;
    ctx.strokeStyle = BoxBox.COLOR;
    ctx.stroke;
    
    ctx.beginPath();
    ctx.rect(pos[0] - (1/8 * this.BOX_SIZE), pos[1] - (7/8 * this.BOX_SIZE), this.BOX_SIZE, this.BOX_SIZE);
    ctx.lineWidth = 2;
    ctx.strokeStyle = BoxBox.COLOR;
    ctx.stroke;

  }
}

BoxBox.BOX_SIZE = 10;
BoxBox.COLOR = "#f00745"

module.exports = BoxBox;