const GameObject = require("../../game_engine/game_object");
const Util = require("../../game_engine/util");
const Sound = require("../../game_engine/sound");

const Bullet = require("../Bullet/bullet");
const ShipSprite = require("./ship_sprite")

class Ship extends GameObject {
  constructor(engine, pos) { 
    super(engine);
    this.transform.pos = pos
    this.addPhysicsComponent()
    this.addMousePosListener()
    this.addLeftControlStickListener()
    this.radius = 10
    this.addCollider("General", this, this.radius)
    this.addCollider("ShipDeath", this, this.radius, ["BoxBox", "Singularity", "Weaver", "Grunt", "Arrow", "Pinwheel"], ["General"])
    this.addLineSprite(new ShipSprite(this.transform))
    this.maxSpeed = 2.5;
    this.mousePos = [0,0];
    this.fireAngle = 0;
    this.bulletSound = new Sound("GEOWars/sounds/Fire_normal.wav", 0.2);
    this.bulletTimeCheck = 0;
    this.bulletInterval = 120;
    this.controlsDirection = [0,0];
    this.powerLevel = 1;
    this.bulletNumber = 0;
    this.speed
    this.shipEngineAcceleration = 0.125;
  }
  
  update(deltaTime){
    this.bulletTimeCheck += deltaTime
    if (this.bulletTimeCheck >= this.bulletInterval ) {
      this.bulletNumber += 1
      this.bulletTimeCheck = 0;
      this.fireBullet();
    } 

    // this.moveInControllerDirection(deltaTime)

    if (this.isOutOfBounds()) {
      // debugger
      this.wallGraze();
    } else {
      this.movementMechanics(deltaTime)
    }
    // if ship is out of x bounds, maintain y speed, keep x at edge value
  }

  // 

  movementMechanics(deltaTime) {
    // get dV
    //    mV => max speed in the direction of the controller
    //    Vo => current velocity
    //    dV~ =  mV - Vo
    // if dv~ > 0.2 (or something)
    //    a = ma~ 
    let movementAngle = Math.atan2(this.controlsDirection[1], this.controlsDirection[0])
    let Vo = this.transform.absoluteVelocity()
    this.transform.angle = movementAngle
    
    let mV = []

    if (this.controlsDirection[0] === 0 && this.controlsDirection[1] === 0){
      mV = [0,0]
    } else {
      mV = [this.maxSpeed * Math.cos(movementAngle), this.maxSpeed * Math.sin(movementAngle)]
    }

    let dV = [mV[0] - Vo[0], mV[1] - Vo[1]]
    let alpha = Math.atan2(dV[1], dV[0])

    this.transform.acc[0] += this.shipEngineAcceleration * Math.cos(alpha)
    this.transform.acc[1] += this.shipEngineAcceleration * Math.sin(alpha)
    
    
  }

  isOutOfBounds(){
    return this.gameEngine.gameScript.isOutOfBounds(this.transform.pos, this.radius * 2)
  }

  updateMousePos(mousePos){
    this.setFireAngle(mousePos)

  }

  updateRightControlStickInput(){

  }

  updateLeftControlStickInput(unitVector, down = true) {
    
    // accelerates to V = [0,0] when not pressed
    if (down) {
      this.controlsDirection = unitVector
    } else if (this.controlsDirection[0] === unitVector[0] && this.controlsDirection[1] === unitVector[1]) {
      this.controlsDirection = [0,0]
    }
  } 

  wallGraze() {
    this.gameEngine.gameScript.wallGraze(this.transform, this.radius)
  }

  onCollision(collider, type) {
    if (type === "ShipDeath") {
      // let hitObjectTransform = collider.gameObject.transform
      // let pos = hitObjectTransform.absolutePosition()
      // let vel = hitObjectTransform.absoluteVelocity()
      // let explosion = new ParticleExplosion(this.gameEngine, pos, vel)
      // collider.gameObject.remove()
      console.log("DEAD")
    }
  }

  setFireAngle(mousePos) {
    
    if (mousePos === undefined){
      mousePos = this.mousePos;
    } else {
      this.mousePos = mousePos
    }
    let dy = mousePos[1] - this.transform.pos[1];
    let dx = mousePos[0] - this.transform.pos[0];
    this.fireAngle =  Math.atan2(dy, dx)
  }

  fireBullet() {
    
    this.gameEngine.queueSound(this.bulletSound)
    let shipvx = this.transform.vel[0];
    let shipvy = this.transform.vel[1];

    let relBulletVelX1 = Bullet.SPEED * Math.cos(this.fireAngle);
    let relBulletVelY1 = Bullet.SPEED * Math.sin(this.fireAngle);

    const bulletVel1 = [shipvx + relBulletVelX1, shipvy + relBulletVelY1];
    this.addChildGameObject(new Bullet(this.gameEngine, this.transform.pos, bulletVel1, this.bulletNumber))

    if (this.powerLevel === 2) {

      let relBulletVelX2 = (Bullet.SPEED - 0.5) * Math.cos(this.fireAngle + Math.PI / 32);
      let relBulletVelY2 = (Bullet.SPEED - 0.5) * Math.sin(this.fireAngle + Math.PI / 32);
      let relBulletVelX3 = (Bullet.SPEED - 0.5) * Math.cos(this.fireAngle - Math.PI / 32);
      let relBulletVelY3 = (Bullet.SPEED - 0.5) * Math.sin(this.fireAngle - Math.PI / 32);

      const bulletVel2 = [shipvx + relBulletVelX2, shipvy + relBulletVelY2];
      const bulletVel3 = [shipvx + relBulletVelX3, shipvy + relBulletVelY3];
      // doesn't support parent transformations... yet
      this.addChildGameObject(new Bullet(this.gameEngine, this.transform.pos, bulletVel2))
      this.addChildGameObject(new Bullet(this.gameEngine, this.transform.pos, bulletVel3))
    }
  }


  // implement threshold so it's not too sensitive

  

  relocate() {
    // this.GameScript.die();
    // this.transform.pos = this.game.randomPosition();
    // this.vel = [0, 0];
    // this.acc = [0, 0];
  }
}

module.exports = Ship;
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

