const GameObject = require("../../game_engine/game_object")
const EnemySpawn = require("../../particles/enemy_spawn")
const ArrowSprite = require("./arrow_sprite")

const Util = require("../../game_engine/util");
const Sound = require("../../game_engine/sound")
 
class Arrow extends GameObject {
  constructor(engine, pos, angle = Math.PI / 3) {
    super(engine)
    // transform made then give it values
    this.transform.pos = pos;
    this.transform.angle = angle;
    let speed = 3;
    this.transform.vel = Util.vectorCartisian(this.transform.angle, this.speed);
    this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_purple.wav", 0.5);
    this.addLineSprite(new ArrowSprite(this.transform))
    this.addChildGameObject(new EnemySpawn)
    // adds self as parent before parent needed.. magic?
  }

  
  exist(){
    // leaving off subscriptions means that things will subscribe to it
    this.addCollider("general", this, 3)
    // now it will move
    this.addPhysicsComponent()
  }

  update(delta) {
      // ADD TO UPDATE FOR THE OBJECTS
    let pos = this.transform.absolutePosition()
    if (this.gameEngine.gameScript.isOutOfBounds(this.transform.pos)) {
      // redirect
    }
  }
}

module.exports = Arrow;