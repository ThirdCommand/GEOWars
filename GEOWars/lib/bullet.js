const MovingObject = require("./moving_object");

class Bullet extends MovingObject {
  constructor(options) {
    options.radius = Bullet.RADIUS;
    super(options);
    this.isWrappable = false;
    this.color = "#FFFBCE";
    this.acc = [0,0];
    this.speed = 7;
  }

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
}


Bullet.RADIUS = 2;
Bullet.SPEED = 7;

module.exports = Bullet;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;