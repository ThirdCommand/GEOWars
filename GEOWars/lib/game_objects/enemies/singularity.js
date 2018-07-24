const GameObject = require("../../game_engine/game_object")
const Bullet = require("../bullet")
const Ship = require("../ship")
const Sound = require("../../game_engine/sound")
const Util = require("../../game_engine/util")
class Singularity extends GameObject {
  constructor(options) {
    super(options)
    this.pos = options.pos || options.game.randomPosition();
    this.vel = [0,0];
    this.acc = [0,0];
    this.radius = 15;
    this.gravityWellSize = 10000000000;
    this.gravityConstant = 1000;
    this.id = options.id
    this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_red.wav", 1);
    this.throbbingScale = 1
    this.increasing = true
  }

  throb(timeDelta) {
    this.existTime += timeDelta;

    let cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    let cycleSpeed = 0.025;
    // increase scale until 1.2, decrease until 0.8

    if (this.increasing) {
      this.throbbingScale += cycleSpeed * cycleSpeedScale
      if (this.throbbingScale > 1.2){
        this.increasing = !this.increasing
      }
    } else {
      this.throbbingScale -= cycleSpeed * cycleSpeedScale
      if (this.throbbingScale < 0.8) {
        this.increasing = !this.increasing
      }
    }
  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    this.pos[0] += this.vel[0] * velocityScale + this.acc[0] * (velocityScale * velocityScale) / 2;
    this.pos[1] += this.vel[1] * velocityScale + this.acc[1] * (velocityScale * velocityScale) / 2;
    this.vel[0] += this.acc[0] * velocityScale;
    this.vel[1] += this.acc[1] * velocityScale;

    if (this.game.isOutOfBounds(this.pos)) {
      Util.bounce(this, [1000, 600]) // HARD CODED
    }

    this.throb(timeDelta)
  }

  draw(ctx, spawningScale) {
    this.acc = [0, 0];
    if (!spawningScale) {
      spawningScale = this.throbbingScale

    }
    
    ctx.strokeStyle = "#F173BA"


    let r = 95;
    let g = 45;
    let b = 73;

    ctx.save();
    // ctx.translate(pos[0], pos[1]);

    // ctx.strokeStyle = "#4286f4";
    // ctx.lineWidth = 4;
    let blurFactor = 0.5

    ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
    ctx.shadowBlur = 10
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
    ctx.lineWidth = 7.5;
    this.drawSingularity(ctx, this.radius * spawningScale);
    ctx.lineWidth = 6
    this.drawSingularity(ctx, this.radius * spawningScale);
    ctx.lineWidth = 4.5
    this.drawSingularity(ctx, this.radius * spawningScale);
    ctx.lineWidth = 3
    this.drawSingularity(ctx, this.radius * spawningScale);
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.lineWidth = 1.5
    this.drawSingularity(ctx, this.radius * spawningScale);
    ctx.restore();
    // ctx.lineWidth = 2;
    // drawSingularity(ctx, this.radius * spawningScale);
  }

  drawSingularity(ctx, radius) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], radius, 0, 2 * Math.PI, true);
    ctx.stroke();
  }

  influenceAcceleration(object) {
    let dy = this.pos[1] - object.pos[1];
    let dx = this.pos[0] - object.pos[0];
    let unitVector = Util.dir([dx, dy]);
    let r = Math.sqrt(dy * dy + dx * dx);
    if (r > this.gravityWellSize * 7 / 8 || r < this.radius * 2){
      object.acc = [0,0];
    } else {
      let newAcc = [
        unitVector[0] * this.gravityConstant / (r * r),
        unitVector[1] * this.gravityConstant / (r * r)
      ]
      object.acc = newAcc;
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

    if (otherObject instanceof Ship) {
        return false
    }

    if (centerDist < (this.gravityWellSize + otherObject.radius)) {

      this.influenceAcceleration(otherObject)
      return false;
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

  remove() {

    this.game.remove(this);
  }
}

Singularity.BOX_SIZE = 10;
Singularity.COLOR = "#3cff0b"

module.exports = Singularity;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;