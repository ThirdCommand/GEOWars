const MovingObject = require("../moving_object")
const Bullet = require("../bullet")
const Ship = require("../ship")
const Util = require("../util");
class Pinwheel extends MovingObject {
  constructor(options) {
    super(options)
    this.pos = options.pos || options.game.randomPosition();
    this.angle = 0;
    this.rotation_speed = 0.05;
    this.speed = 1;
    this.vel = Util.randomVec(this.speed);
    
  }

  move(timeDelta) {
    let rotationSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    let velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    
    let deltaX = this.vel[0] * velocityScale;
    let deltaY = this.vel[1] * velocityScale;
    
    this.pos = [this.pos[0] + deltaX, this.pos[1] + deltaY];
    this.angle = (this.angle + this.rotation_speed * rotationSpeedScale) % (Math.PI * 2)

    if (this.game.isOutOfBounds(this.pos)) {
      Util.bounce(this, [1000, 600]) // HARD CODED
    }
  }

  draw(ctx, spawningScale) {
    spawningScale = spawningScale || 1
    let pos = this.pos
    let shipWidth = 12 * spawningScale
    let s = shipWidth/2
    
    ctx.save();
    ctx.beginPath();
    ctx.translate(pos[0], pos[1]);
    ctx.rotate(this.angle);

    ctx.beginPath();
    ctx.strokeStyle = "#971adf";
    ctx.lineWidth = 1.8;
    ctx.moveTo(0, 0);
    ctx.lineTo(0,0); //1
    ctx.lineTo(-s,-s); //2
    ctx.lineTo(0,-s); //3
    ctx.lineTo(0,0); //1
    ctx.lineTo(s,-s); //4
    ctx.lineTo(s,0); //5
    ctx.lineTo(0,0); //1
    ctx.lineTo(s,s); //6
    ctx.lineTo(0,s); //7
    ctx.lineTo(0,0); //1
    ctx.lineTo(-s,s); //8
    ctx.lineTo(-s,0); //9
    // ctx.lineTo(); //1
    
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
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



const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
module.exports = Pinwheel;