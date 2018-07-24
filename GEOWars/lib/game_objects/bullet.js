const GameObject = require("../game_object");
const Sound = require("../sound")

class Bullet extends GameObject {
  constructor(options) {
    super(options);
    this.bounce = false;
    this.color = "#FFFBCE";
    this.acc = [0,0];
    this.vel = options.vel
    this.speed = 8.5;
    this.length = 12;
    options.radius = this.length / 4;
  }

  // move(timeDelta) {
  //   if (this.game.isOutOfBounds(this.pos)) {
  //     this.game.add(new BulletWallExplosion(this.pos[0], this.pos[1], this.game.ctx, this.game))
  //     if (!this.game.muted) {
  //       let wallhit = new Audio("GEOWars/sounds/bullet_hitwall.wav")
  //       
  //     }
  //     this.remove();
  //   }

  draw(ctx) {
    let l = this.length
    let pos = this.pos;
    let w = this.length/2;
    let movementDirection = Math.atan2(this.vel[0], -this.vel[1])

    ctx.save();
    ctx.beginPath();
    ctx.translate(pos[0], pos[1]);
    ctx.rotate(movementDirection + 2 * Math.PI);

    ctx.beginPath();
    ctx.strokeStyle = "#FBFBC2";
    ctx.lineWidth = 1;

    ctx.moveTo(-l / 4, l / 2); //1
    ctx.lineTo(0, -l / 2); //2
    ctx.lineTo(l / 4, l / 2); //3

    ctx.closePath();
    ctx.stroke();
    ctx.restore();

  }
    
}


Bullet.RADIUS = 3;
Bullet.SPEED = 7;

module.exports = Bullet;

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;