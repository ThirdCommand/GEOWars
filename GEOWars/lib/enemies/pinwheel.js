const GameObject = require("../game_object")
const Bullet = require("../bullet")
const Ship = require("../ship")
const Util = require("../util");
const Singularity = require("./singularity")
const Sound = require("../sound")
class Pinwheel extends GameObject {
  constructor(options) {
    super(options)
    this.pos = options.pos || options.game.randomPosition();
    this.angle = 0;
    this.rotation_speed = 0.05;
    this.speed = 1;
    this.vel = Util.randomVec(this.speed);
    this.acc = [0,0];
    this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_blue.wav", 0.5);
  }

  move(timeDelta) {
    let rotationSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    let velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    
    this.angle = (this.angle + this.rotation_speed * rotationSpeedScale) % (Math.PI * 2)

    this.pos[0] += this.vel[0] * velocityScale + this.acc[0] * (velocityScale * velocityScale) / 2
    this.pos[1] += this.vel[1] * velocityScale + this.acc[1] * (velocityScale * velocityScale) / 2
    this.vel[0] += this.acc[0] * velocityScale;
    this.vel[1] += this.acc[1] * velocityScale;


    if (this.game.isOutOfBounds(this.pos)) {
      Util.bounce(this, [1000, 600]) // HARD CODED
    }
  }

  draw(ctx, spawningScale) {
    this.acc = [0, 0];
    spawningScale = spawningScale || 1
    let pos = this.pos
    let shipWidth = 12 * spawningScale
    let s = shipWidth/2
    
    let r = 59;
    let g = 10;
    let b = 87;

    ctx.save();
    ctx.translate(pos[0], pos[1]);
    ctx.rotate(this.angle);

    let blurFactor = 0.5
    ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
    ctx.shadowBlur = 10 * blurFactor * blurFactor
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
    ctx.lineWidth = 7.5 * blurFactor * blurFactor
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
    this.drawPinwheel(ctx, s)
    ctx.lineWidth = 6 * blurFactor
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.6)";
    this.drawPinwheel(ctx, s)
    ctx.lineWidth = 4.5;
    this.drawPinwheel(ctx, s)
    ctx.lineWidth = 3;
    this.drawPinwheel(ctx, s)
    ctx.strokeStyle = 'rgb(200, 100, 255)';
    ctx.lineWidth = 1.5;
    this.drawPinwheel(ctx, s)

    // ctx.strokeStyle = "#971adf";
    // ctx.lineWidth = 1.8;
    
    ctx.restore();
  }

  drawPinwheel(ctx, s){
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 0); //1
    ctx.lineTo(-s, -s); //2
    ctx.lineTo(0, -s); //3
    ctx.lineTo(0, 0); //1
    ctx.lineTo(s, -s); //4
    ctx.lineTo(s, 0); //5
    ctx.lineTo(0, 0); //1
    ctx.lineTo(s, s); //6
    ctx.lineTo(0, s); //7
    ctx.lineTo(0, 0); //1
    ctx.lineTo(-s, s); //8
    ctx.lineTo(-s, 0); //9
    // ctx.lineTo(); //1

    ctx.closePath();
    ctx.stroke();
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



const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
module.exports = Pinwheel;