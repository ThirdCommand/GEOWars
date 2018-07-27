const GameObject = require("../../game_engine/game_object")
const Bullet = require("../bullet")
const Ship = require("../ship")
const Singularity = require("./singularity")
const Sound = require("../../game_engine/sound")
const Util  = require("../../game_engine/util")
const BoxBoxSprite = require("../../sprites/boxbox_sprite")

class BoxBox extends GameObject {
  constructor(pos, engine) {
    super(engine)
    this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_blue.wav", 0.5);
    this.transform.pos = pos
    // this.addPhysicsComponent()
    this.addLineRenderer(new BoxBoxSprite())
  }
 
  bounce(){
    Util.bounce(this, [1000, 600])
  }

  update(delta){
    
  }

  

  collideWith(otherObject) {
    if (otherObject instanceof Ship) {
      otherObject.relocate();
      return true;
    } else if (otherObject instanceof Bullet || otherObject instanceof Singularity) {
      
      this.remove();
      otherObject.remove();
      return true;
    }

    return false;
  }

}

BoxBox.BOX_SIZE = 10;
BoxBox.COLOR = "#f00745"

module.exports = BoxBox;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;