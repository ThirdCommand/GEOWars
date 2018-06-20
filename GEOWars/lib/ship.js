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
    this.mousePos = [0,0];
    this.fireAngle = 0; // might have to make it null
    // ________________________FIRING OFF FOR DEBUG__________________***
    // setInterval(
    //   () => this.fireBullet(),
    //   1000 * 60 / (340 * 1.5)  
    // )
    //  setInterval(
    //    () => this.fireBullet(),
    //    1000)
  }

  // draw(ctx) {
  //   let shipWidth = 10;
  //   ctx.save();
  //   ctx.beginPath();
  //   ctx.translate(this.pos[0] - shipWidth / 2, this.pos[1] + shipWidth / 2);
  //   ctx.rotate(atan2(this.vel[1],this.vel[2]));
  //   ctx.translate(-shipWidth/2, shipWidth/2);
  //   ctx.lineTo(0,-shipWidth);
  //   ctx.lineTo()
  //   ctx.strokeStyle = "#ffffff";
  //   ctx.stroke();f
  //   ctx.restore();
  // }
  draw(ctx) {
    let pos = this.pos 
    let shipWidth = 10
    let movementDirection = Math.atan2(this.vel[0], -this.vel[1])
    ctx.save();
    ctx.beginPath();
    // ctx.fillStyle = "#98f517";
    ctx.translate(pos[0], pos[1]);
    ctx.rotate(movementDirection + 3/4 * Math.PI + Math.PI);
    // console.log(this.vel);
    
    ctx.translate(-shipWidth / 2, shipWidth / 2);

    // ctx.rotate(atan2(this.vel[1],this.vel[2]));
    // ctx.translate(-shipWidth/2, shipWidth/2); 
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

  // draw(ctx) {
  //   ctx.fillStyle = this.color;

  //   ctx.beginPath();
  //   ctx.arc(
  //     this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
  //   );
  //   ctx.fill();
  // }

  fireBullet(e) {
    // const norm = Util.norm(this.vel);

    // if (norm === 0) {
    //   // Can't fire unless moving.
    //   return;
    // }

    // const relVel = Util.scale(
    //   Util.dir(this.vel),
    //   Bullet.SPEED
    // );
    let shipvx = this.vel[0];
    let shipvy = this.vel[1];
    let relBulletVelX = Bullet.SPEED * Math.cos(this.fireAngle);
    let relBulletVelY = Bullet.SPEED * Math.sin(this.fireAngle);

    const bulletVel = [shipvx + relBulletVelX, shipvy + relBulletVelY];
    // const bulletVel = [
    //   relVel[0] + this.vel[0], relVel[1] + this.vel[1]
    // ];

    const bullet = new Bullet({
      pos: this.pos,
      vel: bulletVel,
      color: this.color,
      game: this.game
    });

    this.game.add(bullet);
  }

  power(impulse) {
    // this.vel[0] + 
    //check if the new speed is faster than limit because of the contribution
    // if it is, don't add that contribution
    // 
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  relocate() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  }
}

Ship.RADIUS = 4;
module.exports = Ship;
