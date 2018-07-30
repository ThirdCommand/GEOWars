const GameObject = require("../game_engine/game_object");
const Bullet = require("./bullet");
const Util = require("../game_engine/util");

class Ship extends GameObject {
  constructor(pos, engine) {
    super(engine);
    this.addPhysicsComponent()
    this.addMousePosListener()
    this.addLeftControlStickListener()
    this.speed = 2.5;
    this.mousePos = [0,0];
    this.fireAngle = 0; 
    
    this.bulletSound = new Sound("GEOWars/sounds/Fire_normal.wav", 0.2);
    this.bulletTimeCheck;
    this.bulletInterval = 120;
    this.controlsDirection = [0,0];
    this.powerLevel = 1;
  }
  
  update(deltaTime){
    this.bulletTimeCheck += deltaTime
    if (this.bulletTimeCheck >= this.bulletInterval) {
      this.bulletTimeCheck = 0;
      this.fireBullet();
    } 
    
    moveInControllerDirection(timeDelta)
    // if ship is out of x bounds, maintain y speed, keep x at edge value
    

  }

  updateMousePos(mousePos){
    this.setFireAngle(mousePos)
  }

  updateLeftControlStickInput(unitVector) {
    this.controlsDirection = unitVector
  }

  moveInControllerDirection(timeDelta){
    let speed = this.speed

    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    if (this.gameEngine.gameScript.isOutOfBounds(this.transform.pos)) {
      this.gameEngine.gameScript.bounce(this.transform.pos);
    } else {
      this.transform.pos[0] += speed * this.controlsDirection[0] * velocityScale
      this.transform.pos[1] += speed * this.controlsDirection[1] * velocityScale
    }
  }

  setFireAngle(mousePos) {
    if (mousePos === undefined){
      mousePos = this.mousePos;
    } else {
      this.mousePos = mousePos
    }
    let dy = mousePos[1] - this.pos[1];
    let dx = mousePos[0] - this.pos[0];
    this.fireAngle =  Math.atan2(dy, dx)
  }

  fireBullet(e) {
    this.gameEngine.queueSound(this.bulletSound)
    let shipvx = this.transform.vel[0];
    let shipvy = this.transform.vel[1];

    let relBulletVelX1 = Bullet.SPEED * Math.cos(this.fireAngle);
    let relBulletVelY1 = Bullet.SPEED * Math.sin(this.fireAngle);

    const bulletVel1 = [shipvx + relBulletVelX1, shipvy + relBulletVelY1];
    const bullet1 = new Bullet(this.transform.pos, this.engine, bulletVel1);
    
    if (this.powerLevel === 2) {

      let relBulletVelX2 = (Bullet.SPEED - 0.5) * Math.cos(this.fireAngle + Math.PI / 32);
      let relBulletVelY2 = (Bullet.SPEED - 0.5) * Math.sin(this.fireAngle + Math.PI / 32);
      let relBulletVelX3 = (Bullet.SPEED - 0.5) * Math.cos(this.fireAngle - Math.PI / 32);
      let relBulletVelY3 = (Bullet.SPEED - 0.5) * Math.sin(this.fireAngle - Math.PI / 32);

      const bulletVel2 = [shipvx + relBulletVelX2, shipvy + relBulletVelY2];
      const bulletVel3 = [shipvx + relBulletVelX3, shipvy + relBulletVelY3];

      const bullet2 = new Bullet(this.transform.pos, this.engine, bulletVel2);
      const bullet3 = new Bullet(this.transform.pos, this.engine, bulletVel3);

    }
  }


  // implement threshold so it's not too sensitive

  

  relocate() {
    // this.game.die();
    // this.pos = this.game.randomPosition();
    // this.vel = [0, 0];
    // this.acc = [0, 0];
  }
}

module.exports = Ship;
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

