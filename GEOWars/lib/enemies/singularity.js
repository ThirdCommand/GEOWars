const MovingObject = require("../moving_object")
const Bullet = require("../bullet")
const Ship = require("../ship")
const Util = require("../util")
class Singularity extends MovingObject {
  constructor(options) {
    super(options)
    this.pos = options.pos || options.game.randomPosition();
    this.angle = 0;
    this.rotation_speed = 0.075;
    this.vel = [0,0];
    this.acc = [0,0];
    this.radius = 15;
    this.gravityWellSize = 100;
    this.gravityConstant = 10;
  }


  move(timeDelta) {

   const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
   this.pos[0] += this.vel[0] * velocityScale + this.acc[0] * (velocityScale * velocityScale) / 2;
   this.pos[1] += this.vel[1] * velocityScale + this.acc[1] * (velocityScale * velocityScale) / 2;
   this.vel[0] += this.acc[0] * velocityScale;
   this.vel[1] += this.acc[1] * velocityScale;

  this.influencers = [];

  }

  draw(ctx, spawningScale) {

    ctx.strokeStyle = this.color;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.arc(
      this.pos[0], this.pos[1], this.radius * spawningScale, 0, 2 * Math.PI, true
    );
    ctx.stroke();
  }

  // influenceDirection() {
  //   let directionVector = [0, 0]

  //   this.influencers.forEach((influencer) => {
  //     let dx = directionVector[0] + influencer[0];
  //     let dy = directionVector[1] + influencer[1];
  //     let newVector = [dx, dy]
  //     directionVector = Util.dir(newVector);
  //   })
  //   let influencedDirection = Math.atan2(directionVector[1], directionVector[0]);
  //   return influencedDirection
  // }

  influenceAcceleration(object) {
    let dy = this.pos[1] - source[1];
    let dx = this.pos[0] - source[0];
    let unitVector = Util.dir([dx, dy]);
    let r = Util.norm(dx,dy)
    if (r > (this.gravityWellSize * 7/8)){
      object.acc = [0,0];
    } else {
      let acc = [
        unitVector[0] * this.gravityConstant / (r * r),
        unitVector[1] * this.gravityConstant / (r * r)
      ]
  
      object.acc = acc;
    }
  }

  isCollidedWith(otherObject) {
    const centerDist = Util.dist(this.pos, otherObject.pos);

    if (otherObject instanceof Bullet) {
      if (centerDist < (this.radius + otherObject.radius)) {

        return true

      } else {
        return false
      }
    }
    
    if (centerDist < (this.radius + otherObject.radius)) {
      return true
    } else if (centerDist < (this.weaverCloseHitBox + otherObject.radius)) {
      this.influenceAcceleration(otherObject)
    } else {
      return false;
    }
    
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

Singularity.BOX_SIZE = 10;
Singularity.COLOR = "#3cff0b"

module.exports = Singularity;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;