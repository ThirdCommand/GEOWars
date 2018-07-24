const GameObject = require("../game_engine/game_object");
const Sound = require("../game_engine/sound")

const BulletWallExplosion = require("../particles/bullet_wall_explosion")
class Bullet extends GameObject {
  constructor(options) {
    super(options);
    this.bounce = false;
    this.color = "#FFFBCE";
    this.acc = [0,0];
    this.vel = options.vel
    this.speed = 8.5;
    this.length = 12;
    options.radius = this.length / 4;
    this.wrap = false
  }

  move(timeDelta) {
    // timeDelta is number of milliseconds since last move
    // if the computer is busy the time delta will be larger
    // in this case the PhysicsObject should move farther in this frame
    // velocity of object is how far it should move in 1/60th of a second or something
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel[0] * velocityScale,
      offsetY = this.vel[1] * velocityScale;
    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

    if (this.game.isOutOfBounds(this.pos)) {
      this.game.add(new BulletWallExplosion(this.pos[0], this.pos[1], this.game.ctx, this.game))
      if (!this.game.muted) {
        let wallhit = new Sound("GEOWars/sounds/bullet_hitwall.wav", 1)
        this.game.soundsToPlay[wallhit.url] = wallhit
      }
      this.remove();
    }

  }

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
    
}


Bullet.RADIUS = 3;
Bullet.SPEED = 7;

module.exports = Bullet;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;