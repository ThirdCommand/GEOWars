const GameObject = require("../game_engine/game_object");
const Sound = require("../game_engine/sound")
const BulletWallExplosion = require("../particles/bullet_wall_explosion")

class Bullet extends GameObject {
  constructor(pos, engine, vel) {
    super(engine);
    this.transform.pos = pos 
    this.transform.vel = vel
    this.bounce = false;

    this.length = 12;
    this.radius = this.length / 4;
    this.wrap = false
    this.wallhit = new Sound("GEOWars/sounds/bullet_hitwall.wav", 1)
    this.addExplosionCollider()
  }

  addExplosionCollider(){
    let subscribers = ["Grunt", "Pinwheel", "Bullet", "BoxBox", "Arrow", "Singularity", "Weaver"]
    this.addCollider("bulletHit", this, this.radius, subscribers)
  }

  update(){
    
  }

  onCollision(collider, type){
    if (type === "bulletHit") {
      let hitObjectTransform = collider.gameObject.transform
      let pos = hitObjectTransform.pos 
      let vel = hitObjectTransform.vel
      explosion = new ParticleExplosion(engine, pos, vel)
      collider.gameObject.remove()
    }
  }
  
  move(timeDelta) {

    if (this.gameEngine.gameScript.isOutOfBounds(this.pos)) {
      new BulletWallExplosion(this.pos, this.gameEngine)
      
      this.game.soundsToPlay[this.wallhit.url] = this.wallhit
      this.remove();
    }

  }
    
}


Bullet.RADIUS = 3;
Bullet.SPEED = 7;

module.exports = Bullet;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;