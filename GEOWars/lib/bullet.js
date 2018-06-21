const MovingObject = require("./moving_object");

class Bullet extends MovingObject {
  constructor(options) {
    options.radius = Bullet.RADIUS;
    super(options);
    this.isWrappable = false;
    this.color = "#FFFBCE"
  }
}

Bullet.RADIUS = 2;
Bullet.SPEED = 7;

module.exports = Bullet;
