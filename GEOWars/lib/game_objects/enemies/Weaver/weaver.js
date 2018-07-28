const GameObject = require("../../game_engine/game_object")
const Bullet = require("../bullet")
const Ship = require("../ship")
const Singularity = require("./singularity")
const Sound = require("../../game_engine/sound")
const Util = require("../../game_engine/util")

class Weaver extends GameObject {
  constructor(pos, engine) {
    super(engine)
    this.rotation_speed = 0.075;
    this.transform.pos = pos
    this.speed = 2;

    this.weaverCloseHitBox = 35;
    this.directionInfluenced = false;
    this.influencers = [];

    this.spawnSound = new Sound("GEOWars/sounds/Enemy_spawn_green.wav", 0.5);
  }

  exist() {
    // leaving off subscriptions means that things will subscribe to it
    this.addCollider("general", this, 3)
    this.addCollider("bulletDodge", this, this.weaverCloseHitBox, ["Bullet"], ["General"])
    // now it will move
    this.addPhysicsComponent()
  }

  onCollision(collider, type){
    if (type === "bulletDodge") {
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
    let speed = 2
    const rotationSpeedScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    this.angle = (this.angle + this.rotation_speed * rotationSpeedScale) % (Math.PI * 2)
    
    if (!this.directionInfluenced) {
      this.chase()
    } else {
      direction = this.influenceDirection();
      this.transform.pos[0] += speed * Math.cos(direction) * velocityScale
      this.transform.pos[1] += speed * Math.sin(direction) * velocityScale
    }

    this.directionInfluenced = false;

    if (this.game.isOutOfBounds(this.pos)) {
      Util.bounce(this, [1000, 600]) // HARD CODED
    }
    
  }

  chase(timeDelta) {
    let speed = 2
    let shipPos = this.shiptransform.pos;
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