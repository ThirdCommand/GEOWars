const MovingObject = require("./moving_object");
const Bullet = require("./bullet");
const Util = require("./util");

function randomColor() {
  const hexDigits = "0123456789ABCDEF";

  let color = "#";
  for (let i = 0; i < 3; i++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }


  return color;
}

class Ship extends MovingObject {
  constructor(options) {
    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || randomColor();
    super(options);
    this.speed = 2.5;
    // this.vel = [0,0];
    // this.acc = [0,0];
    this.mousePos = [0,0];
    this.fireAngle = 0; // might have to make it null
  }

  start(){
    setInterval(
      () => {
        this.fireBullet()
        if (! this.game.muted) {
          let bulletSound = new Audio("GEOWars/sounds/Fire_normal.wav");
          bulletSound.volume = 0.2;
          bulletSound.play()
        }
      },
      1000 * 60 / (340 * 1.5)
    )
  }

  draw(ctx) {
    let pos = this.pos 
    let shipWidth = 10
    let movementDirection = Math.atan2(this.vel[0], -this.vel[1])
    ctx.save();
    ctx.beginPath();
    ctx.translate(pos[0], pos[1]);
    ctx.rotate(movementDirection + 3/4 * Math.PI + Math.PI);
    
    ctx.translate(-shipWidth / 2, shipWidth / 2);

    ctx.beginPath();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2.2;
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -shipWidth);
    ctx.lineTo(2 / 3 * shipWidth, -(1 + 1 / 6) * shipWidth); //1
    ctx.lineTo(1 / 3 * shipWidth, -5 / 6 * shipWidth) // 2
    ctx.lineTo(1 / 3 * shipWidth, -1 / 3 * shipWidth) // 2.5
    ctx.lineTo(5 / 6 * shipWidth, -1 / 3 * shipWidth) // 3
    ctx.lineTo((1 + 1 / 6) * shipWidth, -2 / 3 * shipWidth) // 4
    ctx.lineTo(shipWidth, 0) // 5
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
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
    
    let shipvx = this.vel[0];
    let shipvy = this.vel[1];

    let relBulletVelX1 = Bullet.SPEED * Math.cos(this.fireAngle);
    let relBulletVelY1 = Bullet.SPEED * Math.sin(this.fireAngle);
    let relBulletVelX2 = (Bullet.SPEED - 0.5) * Math.cos(this.fireAngle + Math.PI / 32);
    let relBulletVelY2 = (Bullet.SPEED - 0.5) * Math.sin(this.fireAngle + Math.PI / 32);
    let relBulletVelX3 = (Bullet.SPEED - 0.5) * Math.cos(this.fireAngle - Math.PI / 32);
    let relBulletVelY3 = (Bullet.SPEED - 0.5) * Math.sin(this.fireAngle - Math.PI / 32);

    const bulletVel1 = [shipvx + relBulletVelX1, shipvy + relBulletVelY1];
    const bulletVel2 = [shipvx + relBulletVelX2, shipvy + relBulletVelY2];
    const bulletVel3 = [shipvx + relBulletVelX3, shipvy + relBulletVelY3];

    const bullet1 = new Bullet({
      pos: this.pos,
      vel: bulletVel1,
      color: this.color,
      game: this.game
    });
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

    this.game.add(bullet1);
    this.game.add(bullet2);
    this.game.add(bullet3);
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

Ship.RADIUS = 1;
module.exports = Ship;
const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

