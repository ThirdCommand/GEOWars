const Util = require("./util");
const Sound = require("./sound")
const Transform = require( "./transform")

class GameObject {
  constructor(engine) {
    this.gameEngine = engine
    this.transform = new Transform
    // this.color = options.color;
    // this.game = options.game;
    // this.bounce = true;
    // this.speed = 0;
  }

  update() {

  }

  remove() {
    this.gameEngine.remove(this);
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

module.exports = GameObject;
