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
    // this.addPhysicsComponent()
    this.addLineSprite(new BoxBoxSprite(this.transform))
    this.addChildGameObject(new EnemySpawn())
    this.playSound(this.spawnSound)
    // adds self as parent before parent needed.. magic?
    
  }


  exist() {
    // leaving off subscriptions means that things will subscribe to it
    this.addCollider("General", this, 3)
    // now it will move
    this.addPhysicsComponent()
  }
 
  bounce(){
    Util.bounce(this, [1000, 600])
  }

  update(delta){
    if (this.gameEngine.gameScript.isOutOfBounds(this.pos)) {
      Util.bounce(this, [1000, 600]) // HARD CODED
    }
  }



}

module.exports = BoxBox;