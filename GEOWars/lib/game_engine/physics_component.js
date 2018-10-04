const Util = require("./util");
const Sound = require("./sound")

class PhysicsComponent {
  constructor(transform) {
    this.transform = transform
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
    this.transform.angle += this.transform.aVel
    this.transform.aVel += this.transform.aAcc

    this.transform.acc = [0, 0];
    this.transform.aAcc = 0;

  }

}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = PhysicsComponent;
