const MovingObject = require("../moving_object")
const Bullet = require("../bullet")
const Ship = require("../ship")
class Grunt extends MovingObject {
  constructor(options) {
    super(options)
    this.pos = options.pos || options.game.randomPosition();
    this.stretchScale_W = 1;
    this.stretchScale_L = 1;
    this.stretchDirection = -1;
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

    this.pos[0] += speed * Math.cos(direction) * velocityScale;
    this.pos[1] += speed * Math.sin(direction) * velocityScale;

    let cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    let cycleSpeed = 0.01;

    if (this.stretchScale_W < 0.7 || this.stretchScale_W > 1) {
      this.stretchDirection *= -1
    } 

    this.stretchScale_W = this.stretchScale_W +  -this.stretchDirection * cycleSpeed * cycleSpeedScale;
    this.stretchScale_L = this.stretchScale_L + this.stretchDirection * cycleSpeed * cycleSpeedScale;
    
  }

  draw(ctx, spawningScale) {
    let pos = this.pos;
    spawningScale = spawningScale || 1;
    let shipLength = 10 * 2.2 * spawningScale * this.stretchScale_L;
    let shipWidth = 10 * 2.2 * spawningScale * this.stretchScale_W;
    let l = shipLength;
    let w = shipWidth;

    ctx.save();
    ctx.beginPath();
    ctx.translate(pos[0], pos[1]);

    ctx.beginPath();
    ctx.strokeStyle = "#4286f4";
    ctx.lineWidth = 4;
    ctx.moveTo(0, -l/2); //1
    ctx.lineTo(w/2, 0); //2
    ctx.lineTo(0, l/2); //3
    ctx.lineTo(-w/2, -0); //4

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

Grunt.BOX_SIZE = 10;
Grunt.COLOR = "#4286f4"

module.exports = Grunt;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;