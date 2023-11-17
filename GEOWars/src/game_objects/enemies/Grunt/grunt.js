const GameObject = require("../../../game_engine/game_object")
const Sound = require("../../../game_engine/sound")
const Util = require("../../../game_engine/util")

const EnemySpawn = require("../../particles/enemy_spawn")
const GruntSprite = require("./grunt_sprite")

class Grunt extends GameObject {
  constructor(engine, pos, shipTransform) {
    super(engine)
    this.transform.pos = pos
    this.exists = false;
    this.stretchDirection = -1;
    this.shipTransform = shipTransform
    this.radius = 5;
    this.points = 70
    this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_blue.wav", 0.5);
    this.playSound(this.spawnSound)
    this.addLineSprite(new GruntSprite(this.transform))
    this.addChildGameObject(new EnemySpawn(this.gameEngine))
  }

  exist() {
    this.exists = true;
    // leaving off subscriptions means that things will subscribe to it
    this.addCollider("General", this, this.radius)
    // now it will move
    this.addPhysicsComponent()
  }

  // ADDING MOVEMENT MECHANICS FOR GRUNT

  chase(timeDelta) {
    const speed = 1.5
    const shipPos = this.shipTransform.absolutePosition();
    const pos = this.transform.absolutePosition()
    const dy = shipPos[1] - pos[1];
    const dx = shipPos[0] - pos[0];

    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    const direction = Math.atan2(dy, dx);

    pos[0] += speed * Math.cos(direction) * velocityScale
    pos[1] += speed * Math.sin(direction) * velocityScale
  }

  animate(timeDelta) {
    const cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    const cycleSpeed = 0.01;
    if (this.lineSprite.stretchScale_W < 0.7 || this.lineSprite.stretchScale_W > 1) {
      this.stretchDirection *= -1
    }

    this.lineSprite.stretchScale_W = this.lineSprite.stretchScale_W + -this.stretchDirection * cycleSpeed * cycleSpeedScale;
    this.lineSprite.stretchScale_L = this.lineSprite.stretchScale_L + this.stretchDirection * cycleSpeed * cycleSpeedScale;

  }

  update(timeDelta) {
    if (this.exists) {
      this.chase(timeDelta)
      this.animate(timeDelta);
      
      if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
        this.wallGraze()
      }
    }
  }

  wallGraze() {
    this.gameEngine.gameScript.wallGraze(this.transform, this.radius)
  }

  
}

module.exports = Grunt;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;