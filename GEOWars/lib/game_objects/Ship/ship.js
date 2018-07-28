const GameObject = require("../game_engine/game_object");
const Bullet = require("./bullet");
const Util = require("../game_engine/util");

class Ship extends GameObject {
  constructor(pos, engine) {
    super(engine);
    this.speed = 2.5;
    
    this.mousePos = [0,0];
    this.fireAngle = 0; 
    this.bulletSound = new Audio("GEOWars/sounds/Fire_normal.wav");
    this.bulletSound.volume = 0.2;
    this.timeCheck;
    this.bulletInterval = 120;
  }
  
  update(deltaTime){
    this.timeCheck += deltaTime
    if (this.timeCheck >= this.bulletInterval) {
      this.timeCheck = 0;
      this.fireBullet();
    } 

    if (this.gameEngine.gameScript.isOutOfBounds(this.transform.pos)) {
      this.gameEngine.gameScript.bounce(this.transform.pos);
    }
  }

  
  move(timeDelta) {
    // timeDelta is number of milliseconds since last move
    // if the computer is busy the time delta will be larger
    // in this case the MovingObject should move farther in this frame
    // velocity of object is how far it should move in 1/60th of a second or something
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
    offsetX = this.vel[0] * velocityScale * this.speed,
    offsetY = this.vel[1] * velocityScale * this.speed;
    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];



    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } 
    }
  }

  // move(timeDelta){
  //   const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
  //   this.pos[0] += this.vel[0] * velocityScale + this.acc[0] * (velocityScale * velocityScale) / 2;
  //   this.pos[1] += this.vel[1] * velocityScale + this.acc[1] * (velocityScale * velocityScale) / 2;
  //   this.vel[0] += this.acc[0] * velocityScale;
  //   this.vel[1] += this.acc[1] * velocityScale;

  //   if (this.game.isOutOfBounds(this.pos)) {
  //     if (this.isWrappable) {
  //       this.pos = this.game.wrap(this.pos);
  //     } else {
  //       this.remove();
  //     }
  //   }
  // }


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
    this.gameEngine.queueSound(bulletSound)
    let shipvx = this.transform.vel[0];
    let shipvy = this.transform.vel[1];

    let relBulletVelX1 = Bullet.SPEED * Math.cos(this.fireAngle);
    let relBulletVelY1 = Bullet.SPEED * Math.sin(this.fireAngle);

    const bulletVel1 = [shipvx + relBulletVelX1, shipvy + relBulletVelY1];

    const bullet1 = new Bullet({
      pos: this.pos,
      vel: bulletVel1,
      color: this.color,
      game: this.game
    });

    if (powerlevel === 2) {

      let relBulletVelX2 = (Bullet.SPEED - 0.5) * Math.cos(this.fireAngle + Math.PI / 32);
      let relBulletVelY2 = (Bullet.SPEED - 0.5) * Math.sin(this.fireAngle + Math.PI / 32);
      let relBulletVelX3 = (Bullet.SPEED - 0.5) * Math.cos(this.fireAngle - Math.PI / 32);
      let relBulletVelY3 = (Bullet.SPEED - 0.5) * Math.sin(this.fireAngle - Math.PI / 32);
      
      const bulletVel2 = [shipvx + relBulletVelX2, shipvy + relBulletVelY2];
      const bulletVel3 = [shipvx + relBulletVelX3, shipvy + relBulletVelY3];

      const bullet2 = new Bullet({
        pos: this.pos,
        vel: bulletVel2,
        color: this.color,
        game: this.game
      });
      const bullet3 = new Bullet({
        pos: this.pos,
        vel: bulletVel3,
        color: this.color,
        game: this.game
      });
      this.game.add(bullet2);
      this.game.add(bullet3);
    }

    this.game.add(bullet1);
    
  }

  power(impulse) {
    this.vel = impulse
  }

  relocate() {
    // this.game.die();
    // this.pos = this.game.randomPosition();
    // this.vel = [0, 0];
    // this.acc = [0, 0];
  }
}

module.exports = Ship;
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

