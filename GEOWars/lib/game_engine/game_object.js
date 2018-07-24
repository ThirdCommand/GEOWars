const Util = require("./util");
const Sound = require("./sound")
const BulletWallExplosion = require("../particles/bullet_wall_explosion")

class GameObject {
  constructor(options) {
    this.pos = options.pos || options.game.randomPosition();
    this.vel = options.vel || [0, 0];
    this.acc = options.acc || [0, 0];
    this.radius = options.radius || 5;
    this.color = options.color;
    this.game = options.game;
    this.bounce = true;
    this.speed = 0;
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
    const timeScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    this.pos[0] += this.vel[0] * timeScale + this.acc[0] * (timeScale * timeScale) / 2;
    this.pos[1] += this.vel[1] * timeScale + this.acc[1] * (timeScale * timeScale) / 2;
    this.vel[0] += this.acc[0] * timeScale;
    this.vel[1] += this.acc[1] * timeScale;

    this.acc = [0, 0];


    if (this.game.isOutOfBounds(this.pos)) {
      this.pos = this.game.wrap(this.pos);
    }
    
  }

  remove() {


    this.game.remove(this);


  }
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = GameObject;
