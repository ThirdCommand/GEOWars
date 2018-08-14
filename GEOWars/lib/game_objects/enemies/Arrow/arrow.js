const GameObject = require("../../../game_engine/game_object")
const Util = require("../../../game_engine/util");
const Sound = require("../../../game_engine/sound")

const EnemySpawn = require("../../particles/enemy_spawn")
const ArrowSprite = require("./arrow_sprite")
 
class Arrow extends GameObject {
  constructor(engine, pos, angle = Math.PI / 3) {
    super(engine)
    this.transform.pos = pos;
    this.transform.angle = angle;
    this.speed = 3;
    this.transform.vel = Util.vectorCartisian(this.transform.angle, this.speed);
    
    this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_purple.wav", 0.5);
    this.playSound(this.spawnSound)
    this.addLineSprite(new ArrowSprite(this.transform))
    this.addChildGameObject(new EnemySpawn(this.gameEngine))
    this.exists = false
  }
  
  exist(){
    // leaving off subscriptions means that things will subscribe to it
    this.addCollider("General", this, 3)
    // now it will move
    this.addPhysicsComponent()
    this.exists = true
  }

  update(delta) {
      // ADD TO UPDATE FOR THE OBJECTS
    let pos = this.transform.absolutePosition()
    if (this.gameEngine.gameScript.isOutOfBounds(pos)) {
      this.gameEngine.gameScript.redirect(this.transform)
    }
  }
}

module.exports = Arrow;