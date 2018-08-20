const Sound = require("../../../game_engine/sound")
const Util = require("../../../game_engine/util")
const GameObject = require("../../../game_engine/game_object")

const EnemySpawn = require("../../particles/enemy_spawn")
const PinwheelSprite = require("./pinwheel_sprite")

class Pinwheel extends GameObject {
  constructor(engine, pos) {
    super(engine)
    this.rotation_speed = 0.05;
    let speed = 1;
    this.transform.pos = pos
    this.transform.vel = Util.randomVec(speed);
    this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_blue.wav", 0.5);
    this.playSound(this.spawnSound)
    this.addLineSprite(new PinwheelSprite(this.transform))
    this.addChildGameObject(new EnemySpawn(this.gameEngine))
    this.radius = 5;
  }
  
  exist() {
    // leaving off subscriptions means that things will subscribe to it
    this.addCollider("General", this, this.radius)
    // now it will move
    this.addPhysicsComponent()
  }

  update(deltaTime){
    let rotationSpeedScale = deltaTime / NORMAL_FRAME_TIME_DELTA;
    this.transform.angle = (this.transform.angle + this.rotation_speed * rotationSpeedScale) % (Math.PI * 2)
    if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
      this.gameEngine.gameScript.bounce(this.transform, this.radius) // HARD CODED
    }
  }

}



const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
module.exports = Pinwheel;