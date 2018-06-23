const MovingObject = require("../moving_object")
const Bullet = require("../bullet")
const Ship = require("../ship")
const Util = require("../util")
class Singularity extends MovingObject {
  constructor(options) {
    super(options)
    this.pos = options.pos || options.game.randomPosition();
    this.vel = [0,0];
    this.acc = [0,0];
    this.radius = 15;
    this.gravityWellSize = 10000;
    this.gravityConstant = 10000000000;
    this.id = options.id

  }


  move(timeDelta) {

    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    this.pos[0] += this.vel[0] * velocityScale + this.acc[0] * (velocityScale * velocityScale) / 2;
    this.pos[1] += this.vel[1] * velocityScale + this.acc[1] * (velocityScale * velocityScale) / 2;
    this.vel[0] += this.acc[0] * velocityScale;
    this.vel[1] += this.acc[1] * velocityScale;


  }

  draw(ctx, spawningScale) {
    // spawningScale = spawningScale || 1;
    spawningScale = 1;

    ctx.strokeStyle = "#F173BA"

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.arc(
      this.pos[0], this.pos[1], this.radius * spawningScale, 0, 2 * Math.PI, true
    );
    ctx.stroke();
  }


  influenceAcceleration(object) {
    // debugger;
    let dy = this.pos[1] - object.pos[1];
    let dx = this.pos[0] - object.pos[0];
    let unitVector = Util.dir([dx, dy]);
    let r = Math.sqrt(dy * dy + dx * dx);
    if (r > (this.gravityWellSize * 7/8)){
      object.acc = [0,0];
    } else {
      let newAcc = [
        unitVector[0] * this.gravityConstant / (r * r),
        unitVector[1] * this.gravityConstant / (r * r)
      ]
      // debugger;
      object.acc = newAcc;
    }
  }

  isCollidedWith(otherObject) {

    const centerDist = Util.dist(this.pos, otherObject.pos);
    // console.log(centerDist);
    
    if (otherObject instanceof Bullet) {
      if (centerDist < (this.radius + otherObject.radius)) {

        return true

      } else {
        return false
      }
    }
    // debugger
    if (centerDist < (this.gravityWellSize + otherObject.radius)) {
      
      this.influenceAcceleration(otherObject)
      return false;
    } else {

      return false;
    }
    
  }

  collideWith(otherObject) {
    if (otherObject instanceof Ship) {
      // debugger
      otherObject.relocate();
      return true;
    } else if (otherObject instanceof Bullet) {
      this.remove();
      otherObject.remove();
      return true;
    }

    return false;
  }

  remove() {

    this.game.remove(this);
  }
}

Singularity.BOX_SIZE = 10;
Singularity.COLOR = "#3cff0b"

module.exports = Singularity;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;