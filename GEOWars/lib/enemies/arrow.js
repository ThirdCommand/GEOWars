const GameObject = require("../game_object")
const Bullet = require("../bullet")
const Ship = require("../ship")
const Util = require("../util");
const Singularity = require("./singularity")
const Sound = require("../sound")

class Arrow extends GameObject {
  constructor(options) {
    super(options)
    this.pos = options.pos || options.game.randomPosition();
    this.angle = options.angle || Math.PI / 3;
    this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_purple.wav", 0.5);
    this.speed = 3;
    this.vel = Util.vectorCartisian(this.angle, this.speed);
    this.acc = [0,0];
  }

  move(timeDelta) {
    let rotationSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    let velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    this.pos[0] += this.vel[0] * velocityScale + this.acc[0] * (velocityScale * velocityScale) / 2
    this.pos[1] += this.vel[1] * velocityScale + this.acc[1] * (velocityScale * velocityScale) / 2
    this.vel[0] += this.acc[0] * velocityScale;
    this.vel[1] += this.acc[1] * velocityScale;
    
    if (this.game.isOutOfBounds(this.pos)) {
      Util.redirect(this,[1000, 600]) // HARD CODED
    }
    this.acc = [0, 0];
  }

  

  draw(ctx, spawningScale) {
    
    let pos = this.pos;
    spawningScale = spawningScale || 1;
    let shipLength = 8 * 2.2 * spawningScale;
    let shipWidth = 6 * 2.2 * spawningScale;
    let l = shipLength;
    let w = shipWidth;
    let movementDirection = Math.atan2(this.vel[0], -this.vel[1])

    // let r = 255;
    // let g = 255;
    // let b = 13;
    let r = 255;
    let g = 255;
    let b = 50;




    ctx.save();
    ctx.beginPath();
    ctx.translate(pos[0], pos[1]);
    ctx.rotate(movementDirection + 2 * Math.PI );

    
    // ctx.strokeStyle = "#f2ff00"; // look up rgb and put here
    ctx.lineWidth = 2;

    let blurFactor = 0.5
    ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
    ctx.shadowBlur = 10 * blurFactor ;
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
    ctx.lineWidth = 7.5 * blurFactor;
    this.drawArrow(ctx, l, w);
    ctx.lineWidth = 6 * blurFactor;
    this.drawArrow(ctx, l, w);
    ctx.lineWidth = 4.5;
    this.drawArrow(ctx, l, w);
    ctx.lineWidth = 3;
    this.drawArrow(ctx, l, w);
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.lineWidth = 1.5;
    this.drawArrow(ctx, l, w);
    
    // drawArraw(ctx)
   

    
    ctx.restore();
  }

  drawArrow(ctx, l, w) {
    ctx.beginPath();
    ctx.moveTo(0, -l / 2); //1
    ctx.lineTo(w / 2, l / 4); //2
    ctx.lineTo(w / 6, l / 2); //3
    ctx.lineTo(0, l / 4); //4
    ctx.lineTo(-w / 6, l / 2); //5
    ctx.lineTo(-w / 2, l / 4); //6
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
module.exports = Arrow;