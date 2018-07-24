const GameObject = require("../../game_object")
const Bullet = require("../bullet")
const Ship = require("../ship")
const Singularity = require("./singularity")
const Sound = require("../../sound")
const Util = require("../../util")
class BoxBox extends GameObject {
  constructor(options) {
    super(options)
    this.pos = options.pos || options.game.randomPosition();
    this.vel = [0,0]
    this.acc = [0,0];
    this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_blue.wav", 0.5);
  }

  move(timeDelta) {
    // let speed = 1.5;
   
    
    const timeScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    this.pos[0] += this.vel[0] * timeScale + this.acc[0] * (timeScale * timeScale) / 2;
    this.pos[1] += this.vel[1] * timeScale + this.acc[1] * (timeScale * timeScale) / 2;
    this.vel[0] += this.acc[0] * timeScale;
    this.vel[1] += this.acc[1] * timeScale;

    if (this.game.isOutOfBounds(this.pos)) {
      Util.bounce(this, [1000, 600]) // HARD CODED
    }
  }

  draw(ctx, spawningScale) {
    this.acc = [0, 0];
    spawningScale = spawningScale || 1;
    let pos = this.pos
    let boxsize = 10 * spawningScale;

    
    // ctx.strokeStyle = "#F173BA";

    let r = 230;
    let g = 30;
    let b = 30;
    
    let blurFactor = 0.5
    ctx.save();
    ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
    ctx.shadowBlur = 10
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
    ctx.restore();
    ctx.lineWidth = 2;

    // drawRect()

    // ctx.rect(pos[0] - (6 / 8 * boxsize), pos[1] - (2 / 8 * boxsize), boxsize, boxsize);
    // ctx.rect(pos[0] - (2 / 8 * boxsize), pos[1] - (6 / 8 * boxsize), boxsize, boxsize);
    // ctx.stroke();
    // ctx.lineWidth = 6 // * blurFactor;
    // ctx.rect(pos[0] - (6 / 8 * boxsize), pos[1] - (2 / 8 * boxsize), boxsize, boxsize);
    // ctx.rect(pos[0] - (2 / 8 * boxsize), pos[1] - (6 / 8 * boxsize), boxsize, boxsize);
    // ctx.stroke();
    // ctx.lineWidth = 4.5 // * blurFactor;
    // ctx.rect(pos[0] - (6 / 8 * boxsize), pos[1] - (2 / 8 * boxsize), boxsize, boxsize);
    // ctx.rect(pos[0] - (2 / 8 * boxsize), pos[1] - (6 / 8 * boxsize), boxsize, boxsize);
    // ctx.stroke();
    // ctx.lineWidth = 3 // * blurFactor;
    // ctx.rect(pos[0] - (6 / 8 * boxsize), pos[1] - (2 / 8 * boxsize), boxsize, boxsize);
    // ctx.rect(pos[0] - (2 / 8 * boxsize), pos[1] - (6 / 8 * boxsize), boxsize, boxsize);
    // ctx.stroke();
    // ctx.strokeStyle = 'rgb(255, 255, 255)';
    // ctx.lineWidth = 1.5 // * blurFactor;
    // ctx.rect(pos[0] - (6 / 8 * boxsize), pos[1] - (2 / 8 * boxsize), boxsize, boxsize);
    // ctx.rect(pos[0] - (2 / 8 * boxsize), pos[1] - (6 / 8 * boxsize), boxsize, boxsize);
    // ctx.stroke();

    ctx.restore();
  }

  drawRect(ctx, boxsize) {

  }

  collideWith(otherObject) {
    if (otherObject instanceof Ship) {
      otherObject.relocate();
      return true;
    } else if (otherObject instanceof Bullet || otherObject instanceof Singularity) {
      
      this.remove();
      otherObject.remove();
      return true;
    }

    return false;
  }

}

BoxBox.BOX_SIZE = 10;
BoxBox.COLOR = "#f00745"

module.exports = BoxBox;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;