const Util = require("./util");
const Sound = require("./sound")
const BulletWallExplosion = require("./particles/bullet_wall_explosion")
class GameObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius || 5;
    this.color = options.color;
    this.game = options.game;
    this.bounce = true;
  }
  
  collideWith(otherObject) {
    // default do nothing
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    // ctx.fillStyle = "#98f517";
    // ctx.fillRect(this.pos[0], this.pos[1], 10, 10);
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }
  
  isCollidedWith(otherObject) {
    const centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
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
      if (this.bounce) {
        this.pos = this.game.wrap(this.pos);
      } else {

        this.game.add(new BulletWallExplosion(this.pos[0], this.pos[1], this.game.ctx, this.game))
        if (!this.game.muted) {
          let wallhit = new Sound("GEOWars/sounds/bullet_hitwall.wav", 1)
          this.game.soundsToPlay[wallhit.url] = wallhit
        } 
        this.remove();
      }
    }
  }

  remove() {


    this.game.remove(this);


  }
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = GameObject;
