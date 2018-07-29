const GameObject = require("../../game_engine/game_object")
const GruntSprite = require("./grunt_sprite")
const Sound = require("../../game_engine/sound")
const Util = require("../../game_engine/util")

class Grunt extends GameObject {
  // requires the instance of the ship
  constructor(engine, pos) {
    super(engine)
    this.transform.pos = pos
    this.stretchScale_W = 1;
    this.stretchScale_L = 1;
    this.stretchDirection = -1;
    
    this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_blue.wav", 0.5);
    this.addLineSprite(new GruntSprite(this.transform))
    this.addChildGameObject(new EnemySpawn)
  }

  exist() {
    // leaving off subscriptions means that things will subscribe to it
    this.addCollider("general", this, 3)
    // now it will move
    this.addPhysicsComponent()
  }

  // ADDING MOVEMENT MECHANICS FOR GRUNT

  chase(timeDelta) {
    let speed = 1.5
    let shipPos = this.shiptransform.pos;
    let dy = shipPos[1] - this.transform.pos[1];
    let dx = shipPos[0] - this.transform.pos[0];

    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    let direction = Math.atan2(dy, dx);

    this.transform.pos[0] += speed * Math.cos(direction) * velocityScale
    this.transform.pos[1] += speed * Math.sin(direction) * velocityScale
  }

  update(timeDelta) {
    this.chase(timeDelta)
    let cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    let cycleSpeed = 0.01;

    if (this.linesprite.stretchScale_W < 0.7 || this.linesprite.stretchScale_W > 1) {
      this.stretchDirection *= -1
    }

    this.linesprite.stretchScale_W = this.linesprite.stretchScale_W + -this.stretchDirection * cycleSpeed * cycleSpeedScale;
    this.linesprite.stretchScale_L = this.linesprite.stretchScale_L + this.stretchDirection * cycleSpeed * cycleSpeedScale;

    if (this.gameEngine.gameScript.isOutOfBounds(this.pos)) {
      Util.bounce(this, [1000, 600]) // HARD CODED
    }
  }

  
}

module.exports = Grunt;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;