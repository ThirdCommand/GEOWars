const GameObject = require("../../../game_engine/game_object")
const Sound = require("../../../game_engine/sound")
const Util = require("../../../game_engine/util")

const EnemySpawn = require("../../particles/enemy_spawn")
const WeaverSprite = require("./weaver_sprite")

class Weaver extends GameObject {
  constructor(engine, pos, shipTransform) {
    super(engine)
    this.rotation_speed = 0.075;
    this.transform.pos[0] = pos[0]
    this.transform.pos[1] = pos[0]
    this.speed = 2;
    this.shipTransform = shipTransform
    this.weaverCloseHitBox = 35;
    this.directionInfluenced = false;
    this.influencers = [];
    this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_green.wav", 0.5);
    this.playSound(this.spawnSound)
    this.addLineSprite(new WeaverSprite(this.transform))
    this.addChildGameObject(new EnemySpawn(this.gameEngine))
    this.exists = false;
  }

  exist() {
    // leaving off subscriptions means that things will subscribe to it
    this.addCollider("General", this, 3)
    this.addCollider("BulletDodge", this, this.weaverCloseHitBox, ["Bullet"], ["General"])
    // now it will move
    this.addPhysicsComponent()
    this.exists = true;
  }

  onCollision(collider, type){
    if (type === "BulletDodge") {
      this.acceptBulletDirection(collider.gameObject.transform.pos)
    }
  }

  influenceDirection() {
    let directionVector = [0, 0]

    this.influencers.forEach((influencer) => {
      let dx = directionVector[0] + influencer[0];
      let dy = directionVector[1] + influencer[1];
      let newVector = [dx, dy]
      directionVector = Util.dir(newVector);
    })
    let influencedDirection = Math.atan2(directionVector[1], directionVector[0]);
    return influencedDirection
  }

  acceptBulletDirection(source) {
    this.directionInfluenced = true;
    let dy = this.transform.pos[1] - source[1];
    let dx = this.transform.pos[0] - source[0];
    let unitVector = Util.dir([dx, dy]);
    this.influencers.push(unitVector)
    // first 
  }

  update(timeDelta){
    if(this.exists){
      let speed = 2
      const rotationSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
      const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
      this.transform.angle = (this.transform.angle + this.rotation_speed * rotationSpeedScale) % (Math.PI * 2)
      
      if (!this.directionInfluenced) {
        this.chase(timeDelta)
      } else {
        let direction = this.influenceDirection();
        this.transform.pos[0] += speed * Math.cos(direction) * velocityScale
        this.transform.pos[1] += speed * Math.sin(direction) * velocityScale
      }
  
      this.directionInfluenced = false;
  
      if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition())) {
        this.wallGraze()
      }
    }
    
  }

  wallGraze() {
    this.gameEngine.gameScript.wallGraze(this.transform, this.radius)
  }

  chase(timeDelta) {
    let speed = 2
    let shipPos = this.shipTransform.pos;
    let dy = shipPos[1] - this.transform.pos[1];
    let dx = shipPos[0] - this.transform.pos[0];

    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    let direction = Math.atan2(dy, dx);

    this.transform.pos[0] += speed * Math.cos(direction) * velocityScale
    this.transform.pos[1] += speed * Math.sin(direction) * velocityScale
  }

}

Weaver.BOX_SIZE = 10;
Weaver.COLOR = "#3cff0b"

module.exports = Weaver;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;