const GameObject = require("../../game_engine/game_object");
const Sound = require("../../game_engine/sound")
const BulletWallExplosion = require("../particles/bullet_wall_explosion")
const BulletSprite = require("./bullet_sprite")

class Bullet extends GameObject {
  constructor(engine, pos, vel, bulletNumber) {
    super(engine);
    this.ID = bulletNumber
    // console.log(bulletNumber);
    
    this.transform.pos[0] = pos[0]
    this.transform.pos[1] = pos[1]
    this.transform.vel = vel
    this.length = 12;
    this.radius = this.length / 4;
    this.wrap = false
    this.wallhit = new Sound("GEOWars/sounds/bullet_hitwall.wav", 1)
    this.addExplosionCollider()
    this.addPhysicsComponent()
    this.addLineSprite(new BulletSprite(this.transform))
    this.exploded = false;
  }

  addExplosionCollider(){
    let subscribers = ["Grunt", "Pinwheel", "Bullet", "BoxBox", "Arrow", "Singularity", "Weaver"]
    this.addCollider("bulletHit", this, this.radius, subscribers)
  }

  update(deltaTime){
    // let vel = this.transform.vel
    // console.log(vel[0] * vel[0] + vel[1] * vel[1] <= 0.1);
    
    // if(vel[0] * vel[0]  + vel[1] * vel[1] <= 0.1){
    //   debugger
    // }
    if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition()) && !this.exploded) {
      this.exploded = true
      // new BulletWallExplosion(this.gameEngine, this.transform.pos)

      this.gameEngine.queueSound(this.wallhit)
      this.remove();
    }
  }

  onCollision(collider, type){
    if (type === "bulletHit") {
      let hitObjectTransform = collider.gameObject.transform
      let pos = hitObjectTransform.absolutePosition() 
      let vel = hitObjectTransform.absoluteVelocity()
      explosion = new ParticleExplosion(engine, pos, vel)
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