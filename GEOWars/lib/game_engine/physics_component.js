const Util = require("./util");
const Sound = require("./sound")

class PhysicsComponent {
  constructor(transform, radius) {
    this.transform = transform
    this.radius = radius || 5;
  }

  collideWith(otherObject) {
    // default do nothing
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
    this.transform.pos[0] += this.transform.vel[0] * timeScale + this.transform.acc[0] * (timeScale * timeScale) / 2;
    this.transform.pos[1] += this.transform.vel[1] * timeScale + this.transform.acc[1] * (timeScale * timeScale) / 2;
    this.transform.vel[0] += this.transform.acc[0] * timeScale;
    this.transform.vel[1] += this.transform.acc[1] * timeScale;
    
    this.transform.acc = [0, 0];

  }

  // ADD TO UPDATE FOR THE OBJECTS
  // if (this.game.isOutOfBounds(this.pos)) {
  //   this.pos = this.game.wrap(this.pos);
  // }

  // Game handles this shit
  // remove() {
  //   this.game.remove(this);
  // }
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = PhysicsComponent;
