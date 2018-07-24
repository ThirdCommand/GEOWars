const GameObject = require("../../game_object")
const Bullet = require("../bullet")
const Ship = require("../ship")
const Singularity = require("./singularity")
const Sound = require("../../sound")
const Util = require("../../util")
class Grunt extends GameObject {
  constructor(options) {
    super(options)
    this.pos = options.pos || options.game.randomPosition();
    this.stretchScale_W = 1;
    this.stretchScale_L = 1;
    this.stretchDirection = -1;
    this.vel = [0,0];
    this.acc = [0,0];

    this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_blue.wav", 0.5);
  }


  // ADDING MOVEMENT MECHANICS FOR GRUNT
  move(timeDelta) {
    let speed = 1.5;
    let shipPos = this.game.ships[0].pos;
    let dy = shipPos[1] - this.pos[1];
    let dx = shipPos[0] - this.pos[0];
    
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    let direction = Math.atan2(dy, dx);

    // I need to make a max speed and the pulling effect an acceleration instead
    // this will make it possible to direct the ship well too
    
    // if (this.game.isOutOfBounds(this.pos)) {
    //   Util.bounce(this, [1000, 600]) // HARD CODED
    // }
    
    this.pos[0] += (this.vel[0] + speed * Math.cos(direction)) * velocityScale + this.acc[0] * (velocityScale * velocityScale) / 2;
    this.pos[1] += (this.vel[1] + speed * Math.sin(direction)) * velocityScale + this.acc[1] * (velocityScale * velocityScale) / 2;
    this.vel[0] += this.acc[0] * velocityScale;
    this.vel[1] += this.acc[1] * velocityScale;
    
    
    let cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    let cycleSpeed = 0.01;
    

    if (this.stretchScale_W < 0.7 || this.stretchScale_W > 1) {
      this.stretchDirection *= -1
    } 
      
    this.stretchScale_W = this.stretchScale_W +  -this.stretchDirection * cycleSpeed * cycleSpeedScale;
    this.stretchScale_L = this.stretchScale_L + this.stretchDirection * cycleSpeed * cycleSpeedScale;

    if (this.game.isOutOfBounds(this.pos)) {
      Util.bounce(this, [1000, 600]) // HARD CODED
    }
     
  }

  draw(ctx, spawningScale) {
    this.acc = [0,0];
    let pos = this.pos;
    spawningScale = spawningScale || 1;
    let shipLength = 10 * 2.2 * spawningScale * this.stretchScale_L;
    let shipWidth = 10 * 2.2 * spawningScale * this.stretchScale_W;
    let l = shipLength;
    let w = shipWidth;

    // let r = 13;
    // let g = 213;
    // let b = 255;
    let r = 0;
    let g = 57;
    let b = 230;

    ctx.save();
    ctx.translate(pos[0], pos[1]);

    // ctx.strokeStyle = "#4286f4";
    // ctx.lineWidth = 4;
    let blurFactor = 0.5
    
    ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
    ctx.shadowBlur = 10
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
    ctx.lineWidth = 7.5 * blurFactor;
    this.drawDiamond(ctx, l, w);
    ctx.lineWidth = 6// * blurFactor;
    this.drawDiamond(ctx, l, w);
    ctx.lineWidth = 4.5// * blurFactor;
    this.drawDiamond(ctx, l, w);
    ctx.lineWidth = 3// * blurFactor;
    this.drawDiamond(ctx, l, w);
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.lineWidth = 1.5// * blurFactor;
    this.drawDiamond(ctx, l, w);



    
    ctx.restore();
  }

  drawDiamond(ctx, l, w){
    ctx.beginPath();
    ctx.moveTo(0, -l / 2); //1
    ctx.lineTo(w / 2, 0); //2
    ctx.lineTo(0, l / 2); //3
    ctx.lineTo(-w / 2, -0); //4
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

Grunt.BOX_SIZE = 10;
Grunt.COLOR = "#4286f4"

module.exports = Grunt;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;