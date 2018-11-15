const GameObject = require("../../../game_engine/game_object")
const Sound = require("../../../game_engine/sound")
const Util = require("../../../game_engine/util")

const ParticleExplosion = require("../../particles/particle_explosion")
const EnemySpawn = require("../../particles/enemy_spawn")
const SingularitySprite = require("./singularity_sprite")
const SingularityParticles = require("../../particles/singularity_particles")
const AlienShip = require("./alien_ship")
class Singularity extends GameObject {
  constructor(engine, pos) {
    super(engine)
    this.transform.pos = pos;
    this.gravityWellSize = 500;
    this.gravityConstant = 1000 * 0.5;
    this.radius = 15
    this.points = 100
    this.throbbingCycleSpeed = 0.025
    this.numberAbsorbed = 0;
    this.alienSpawnAmount = 10;
    this.alienSpawnSpeed = 1.5;
    this.deathSound = new Sound("GEWars/sounds/Gravity_well_die.wav")
    // this.id = options.id
    this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_red.wav", 1);
    this.playSound(this.spawnSound)

    this.increasing = true
    this.addLineSprite(new SingularitySprite(this.transform))
    this.addChildGameObject(new EnemySpawn(this.gameEngine))
    this.lineSprite.throbbingScale = 1
    this.lives = 5
  }

  exist() {
    // leaving off subscriptions means that things will subscribe to it
    this.addCollider("General", this, this.radius)
    this.addCollider("GravityWell", this, this.gravityWellSize, ["Grunt", "Pinwheel", "Bullet", "Ship", "BoxBox", "Arrow", "Singularity", "Weaver", "Particle", "SingularityParticle", "GridPoint"],  ["General"])
    this.addCollider("Absorb", this, this.radius, ["Grunt", "Pinwheel", "BoxBox", "Arrow", "Weaver"],  ["General"])
    // now it will move
    this.addPhysicsComponent()
    this.lineSprite.spawned = true
    this.addChildGameObject(new SingularityParticles(this.gameEngine, this.transform))
  }

  onDeath(){
    this.playSound(this.deathSounds.play())
  }

  onCollision(collider, type){
    if (type === "GravityWell"){
      this.influenceAcceleration(collider.gameObject)
    } else if (type === "Absorb") {
      let hitObjectTransform = collider.gameObject.transform
      let pos = hitObjectTransform.absolutePosition()
      let vel = hitObjectTransform.absoluteVelocity()
      let explosion = new ParticleExplosion(this.gameEngine, pos, vel)
      collider.gameObject.remove()

      this.throbbingCycleSpeed *= 1.2
      this.numberAbsorbed += 1
    }
  }

  bulletHit(){
    this.lives -= 1
    if (this.lives <= 0) {
      let pos = this.transform.absolutePosition()
      let vel = this.transform.absoluteVelocity()
      let explosion = new ParticleExplosion(this.gameEngine, pos, vel)
      this.gameEngine.gameScript.tallyScore(this)
      this.remove()
    } else {
      this.throbbingCycleSpeed /= 1.2
      this.numberAbsorbed -= 1
    }
  }

  wallGraze() {
    this.gameEngine.gameScript.wallGraze(this.transform, this.radius)
  }
  

  update(deltaTime) {

    if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), this.radius)) {
      this.wallGraze()
    }

    this.throb(deltaTime)
    if (this.numberAbsorbed >= 4) {
      this.openGate()
    }
  }

  throb(timeDelta) {

    let cycleSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    let cycleSpeed = this.throbbingCycleSpeed;
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
      // object.transform.acc = [0,0];
    } else {
      let accContribution= [
        unitVector[0] * this.gravityConstant / (r * r),
        unitVector[1] * this.gravityConstant / (r * r)
      ]
      object.transform.acc[0] += accContribution[0];
      object.transform.acc[1] += accContribution[1];
    }
  }

  openGate(){
    for (let i = 0; i < this.alienSpawnAmount; i++) {
      let angle = Math.random() * Math.PI * 2
      let velocity = [this.alienSpawnSpeed * Math.cos(angle), this.alienSpawnSpeed * Math.sin(angle)]
      new AlienShip(this.gameEngine, this.transform.pos, velocity, this.gameEngine.gameScript.ship.transform)
    }
    this.remove()

  }

}

module.exports = Singularity;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;