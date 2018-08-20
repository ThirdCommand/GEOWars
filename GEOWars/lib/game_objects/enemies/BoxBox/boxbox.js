const GameObject = require("../../../game_engine/game_object")
const Util = require("../../../game_engine/util")
const Sound = require("../../../game_engine/sound")

const EnemySpawn = require("../../particles/enemy_spawn")
const BoxBoxSprite = require("./boxbox_sprite")

class BoxBox extends GameObject {
  constructor(engine, pos) {
    super(engine)
    this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_blue.wav", 0.5);
    this.transform.pos = pos
    this.radius = 10
    // this.addPhysicsComponent()
    this.addLineSprite(new BoxBoxSprite(this.transform))
    this.addChildGameObject(new EnemySpawn(this.gameEngine))
    this.playSound(this.spawnSound)
  }

  exist() {
    // leaving off subscriptions means that things will subscribe to it
    this.addCollider("General", this, this.radius)
    // now it will move
    this.addPhysicsComponent()
  }
 
  wallGraze(){
    this.gameEngine.gameScript.wallGraze(this.transform, this.radius)
  }

  update(delta){
    if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius * 2)) {
      this.wallGraze() 
    }
  }
}

module.exports = BoxBox;