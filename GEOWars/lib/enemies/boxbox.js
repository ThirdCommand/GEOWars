const MovingObject = require("../moving_object")
const Bullet = require("../bullet")
const Ship = require("../ship")
class BoxBox extends MovingObject {
  constructor(options) {
    super(options)
    this.pos = options.pos || options.game.randomPosition();
  }

  move(timeDelta) {

  }

  draw(ctx, spawningScale) {
    spawningScale = spawningScale || 1;
    let pos = this.pos
    let boxsize = 10 * spawningScale;
    // ctx.fillStyle = "#98f517";
    // ctx.fillRect(pos[0] - (7 / 8 * boxsize), pos[1] - (1 / 8 * boxsize), boxsize, boxsize)
    
    // ctx.fillStyle = "#98f517";
    // ctx.fillRect(pos[0] - (1 / 8 * boxsize), pos[1] - (7 / 8 * boxsize), boxsize, boxsize);

    // ctx.fillStyle = "#98f517";
    // ctx.fillRect(pos[0] - (7 / 8 * boxsize), pos[1], 10, 10);
    // ctx.fillRect(pos[0], pos[1], 10, 10);
    

    ctx.beginPath();
    ctx.rect(pos[0] - (6/8 * boxsize), pos[1] - (2/8 * boxsize), boxsize, boxsize);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#F173BA";
    // ctx.shadowBlur = 1;
    // ctx.shadowColor = "#F173BA"
    ctx.stroke();
    
    ctx.beginPath();
    ctx.rect(pos[0] - (2/8 * boxsize), pos[1] - (6/8 * boxsize), boxsize, boxsize);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#F173BA";
    // ctx.shadowBlur = 20;
    // ctx.shadowColor = "#F173BA"
    ctx.stroke();
  }

  collideWith(otherObject) {
    if (otherObject instanceof Ship) {
      otherObject.relocate();
      return true;
    } else if (otherObject instanceof Bullet) {
      this.remove();
      otherObject.remove();
      return true;
    }

    return false;
  }

  // remove() {
  //   debugger;
  //   this.game.remove(this);
  // }
}

BoxBox.BOX_SIZE = 10;
BoxBox.COLOR = "#f00745"

module.exports = BoxBox;