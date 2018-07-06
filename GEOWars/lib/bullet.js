const MovingObject = require("./moving_object");
const Sound = require("./sound")
class Bullet extends MovingObject {
  constructor(options) {
    super(options);
    this.isWrappable = false;
    this.color = "#FFFBCE";
    this.acc = [0,0];
    this.vel = options.vel
    this.speed = 8.5;
    this.length = 12;
    options.radius = this.length / 4;
    
  }

  // move(timeDelta) {
  //   if (this.game.isOutOfBounds(this.pos)) {
  //     this.game.add(new BulletWallExplosion(this.pos[0], this.pos[1], this.game.ctx, this.game))
  //     if (!this.game.muted) {
  //       let wallhit = new Audio("GEOWars/sounds/bullet_hitwall.wav")
  //       
  //     }
  //     this.remove();
  //   }

  draw(ctx) {
    let l = this.length
    let pos = this.pos;
    let w = this.length/2;
    let movementDirection = Math.atan2(this.vel[0], -this.vel[1])

    ctx.save();
    ctx.beginPath();
    ctx.translate(pos[0], pos[1]);
    ctx.rotate(movementDirection + 2 * Math.PI);

    ctx.beginPath();
    ctx.strokeStyle = "#FBFBC2";
    ctx.lineWidth = 1;

    ctx.moveTo(-l / 4, l / 2); //1
    ctx.lineTo(0, -l / 2); //2
    ctx.lineTo(l / 4, l / 2); //3

    ctx.closePath();
    ctx.stroke();
    ctx.restore();

  }
    

  //   const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
  //   this.updateAcceleration()

  //   this.pos[0] += this.vel[0] * velocityScale + (this.acc[0]) * (velocityScale * velocityScale) / 2;
  //   this.pos[1] += this.vel[1] * velocityScale + (this.acc[1]) * (velocityScale * velocityScale) / 2;
  //   this.vel[0] += this.acc[0] * velocityScale;
  //   this.vel[1] += this.acc[1] * velocityScale;
  //   // this.movementAngle = Math.atan2(this.vel[1], this.vel[0])
  // }

  // updateAcceleration() {
  //   for (let i = 0; i < this.game.singularities.length; i++) {
  //     const singularity = this.game.singularities[i];
  //     singularity.influenceAcceleration(this)
  //   }
  // }

  // move(timeDelta) {
  //   const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA
    
  //   this.pos[0] += (this.speed + this.vel[0]) * velocityScale + this.acc[0] * (velocityScale * velocityScale) / 2;
  //   this.pos[1] += (this.speed + this.vel[1]) * velocityScale + this.acc[1] * (velocityScale * velocityScale) / 2;
  //   this.vel[0] += this.acc[0] * velocityScale;
  //   this.vel[1] += this.acc[1] * velocityScale;

  //   if (this.game.isOutOfBounds(this.pos)) {
  //     if (this.isWrappable) {
  //       this.pos = this.game.wrap(this.pos);
  //     } else {
  //       // cause small explosion
  //       this.remove();
  //     }
  //   }
  // }
  // }
}


Bullet.RADIUS = 3;
Bullet.SPEED = 7;

module.exports = Bullet;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;