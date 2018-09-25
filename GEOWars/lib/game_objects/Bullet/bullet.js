const GameObject = require("../../game_engine/game_object");
const Sound = require("../../game_engine/sound")
const BulletWallExplosion = require("../particles/bullet_wall_explosion")
const BulletSprite = require("./bullet_sprite")
const ParticleExplosion = require("../particles/particle_explosion")
class Bullet extends GameObject {
  constructor(engine, pos, vel, bulletNumber) {
    super(engine);
    this.ID = bulletNumber
    this.transform.pos[0] = pos[0]
    this.transform.pos[1] = pos[1]
    this.transform.vel[0] = vel[0]
    this.transform.vel[1] = vel[1]
    this.length = 12;
    this.radius = this.length / 4;
    this.wrap = false
    this.wallhit = new Sound("GEOWars/sounds/bullet_hitwall.wav", 1)
    this.addExplosionCollider()
    this.addPhysicsComponent()
    this.addLineSprite(new BulletSprite(this.transform))
    this.exploded = false;
    this.lifeTime = 6000;
    this.aliveTime = 0;
  }

  addExplosionCollider(){
    let subscribers = ["Grunt", "Pinwheel", "BoxBox", "Arrow", "Singularity", "Weaver"]
    this.addCollider("bulletHit", this, this.radius, subscribers, ["General"])
    this.addCollider("General", this, this.radius)
  }

  update(deltaTime){
    this.aliveTime += deltaTime 
    if(this.aliveTime > this.lifeTime){
      this.remove();
    }
    if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition()) && !this.exploded) {
      this.exploded = true
      new BulletWallExplosion(this.gameEngine, this.transform.pos)

      this.gameEngine.queueSound(this.wallhit)
      this.remove();
    }
  }

  onCollision(collider, type){
    if (type === "bulletHit") {
      let hitObjectTransform = collider.gameObject.transform
      let pos = hitObjectTransform.absolutePosition() 
      let vel = hitObjectTransform.absoluteVelocity()
      let explosion = new ParticleExplosion(this.gameEngine, pos, vel)
      this.gameEngine.gameScript.tallyScore(collider.gameObject)
      collider.gameObject.remove()
        
    }
    
  }
  
  // move(timeDelta) {

    

  // }
    
}


Bullet.RADIUS = 3;
Bullet.SPEED = 7;

module.exports = Bullet;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;