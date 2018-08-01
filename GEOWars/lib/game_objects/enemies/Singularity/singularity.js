const GameObject = require("../../../game_engine/game_object")
const Sound = require("../../../game_engine/sound")
const Util = require("../../../game_engine/util")

const EnemySpawn = require("../../particles/enemy_spawn")
const SingularitySprite = require("./singularity_sprite")

class Singularity extends GameObject {
  constructor(engine, pos) {
    super(engine)
    this.transform.pos = pos;
    this.existTime = 0;
    this.gravityWellSize = 500;
    this.gravityConstant = 1000;
    this.radius = 3

    // this.id = options.id
    this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_red.wav", 1);
    this.playSound(this.spawnSound)

    this.increasing = true
    this.addLineSprite(new SingularitySprite(this.transform))
    this.addChildGameObject(new EnemySpawn(this.gameEngine))

    this.lineSprite.throbbingScale = 1
  }

  exist() {
    // leaving off subscriptions means that things will subscribe to it
    this.addCollider("General", this, 3)
    this.addCollider("GravityWell", this, this.gravityWellSize, ["General"], ["Grunt", "Pinwheel", "Bullet", "Ship", "BoxBox", "Arrow", "Singularity", "Weaver", "Particle"])
    this.addCollider("GravityAbsorb", this, this.radius, ["General"], ["Grunt", "Pinwheel", "Bullet", "Ship", "BoxBox", "Arrow", "Singularity", "Weaver"])
    // now it will move
    this.addPhysicsComponent()
  }

  onCollision(collider, type){
    if (type === "GravityWell"){
      this.influenceAcceleration(collider.gameObject)
    }
  }

  update(deltaTime) {
    if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition())) {
      this.gameEngine.gameScriptbounce(this, [1000, 600]) // HARD CODED
    }

    this.throb(deltaTime)
  }

  throb(timeDelta) {
    this.existTime += timeDelta;

    let cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    let cycleSpeed = 0.025;
    // increase scale until 1.2, decrease until 0.8

    if (this.increasing) {
      this.lineSprite.throbbingScale += cycleSpeed * cycleSpeedScale
      if (this.lineSprite.throbbingScale > 1.2) {
        this.increasing = !this.increasing
      }
    } else {
      this.lineSprite.throbbingScale -= cycleSpeed * cycleSpeedScale
      if (this.lineSprite.throbbingScale < 0.8) {
        this.increasing = !this.increasing
      }
    }
  }

  influenceAcceleration(object) {
    let pos = this.transform.absolutePosition()
    let objectPos = object.transform.absolutePosition()
    let dy = pos[1] - objectPos[1];
    let dx = pos[0] - objectPos[0];
    let unitVector = Util.dir([dx, dy]);
    let r = Math.sqrt(dy * dy + dx * dx);
    if (r > this.gravityWellSize * 7 / 8 || r < this.radius * 2){
      object.transform.acc = [0,0];
    } else {
      let newAcc = [
        unitVector[0] * this.gravityConstant / (r * r),
        unitVector[1] * this.gravityConstant / (r * r)
      ]
      object.transform.acc = newAcc;
    }
  }
}

module.exports = Singularity;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;