


// direction of the particle is the direction of the velocity vector
// the direction of the 
// the particle dies when the hue reaches 0 

// random movement angle created
// initial speed (scale)
// vel = Util.vectorCartisian(angle, scale)
//
// 

const Util = require("../util");

class Particle {
  constructor(xpos, ypos, initialSpeed, ctx, game, explosionId, particleID, colors) {
    this.game = game;
    this.active = true;
    
    this.color = colors[Math.floor(colors.length * Math.random())];
    this.particleId;
    this.explosionId;

    this.pos = [xpos,ypos]; // x and y position

    this.rectLength = 15;
    this.rectWidth = 2;
    // this.r = this.rand(200, 10, 0);
    this.speed = initialSpeed;
    this.movementAngle = Math.random() * Math.PI * 2;
    // this.vx = this.initialSpeed * Math.cos(this.movementAngle);
    // this.vy = this.initialSpeed * Math.sin(this.movementAngle);
    this.vel = Util.vectorCartisian(this.movementAngle, this.speed)
    this.explosionDeceleration = 0; // in the direction the particle is moving
    this.acc = [0,0]

    this.opacity = Math.random() * 0.5 + 0.5;
    this.active = true;
    this.hue = Math.random() * 0.3 + 0.6;

    ctx.fillStyle = `${this.color},${this.hue})`;

    ctx.fillRect(this.pos[0], this.pos[1], this.rectLength, this.rectWidth);
  }




  // private method
  rand(max, min, _int) {
    var max = (max === 0 || max) ? max : 1,
      min = min || 0,
      gen = min + (max - min) * Math.random();

    return (_int) ? Math.round(gen) : gen;
  };

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    this.updateAcceleration()
    this.pos[0] += this.vel[0] * velocityScale + (this.acc[0] - this.explosionDeceleration * Math.cos(this.movementAngle)) * (velocityScale * velocityScale) / 2;
    this.pos[1] += this.vel[1] * velocityScale + (this.acc[1] - this.explosionDeceleration * Math.sin(this.movementAngle)) * (velocityScale * velocityScale) / 2;
    this.vel[0] += this.acc[0] * velocityScale;
    this.vel[1] += this.acc[1] * velocityScale;
    this.movementAngle = Math.atan2(this.vel[1], this.vel[0])
    this.rectLength -= 0.25;
    this.hue -= 0.01;
  }

  updateAcceleration() {
    for (let i = 0; i < this.game.singularities.length; i++) {
      const singularity = this.game.singularities[i];
      singularity.influenceAcceleration(this)
    }
  }

  draw(ctx) {

    this.active = true;
    // this.x += this.vx;
    // this.y += this.vy;
    
    if (this.hue < 0.1 || this.rectLength < 0.25) {
      this.remove();
    } else {
      let pos = this.pos;
      
      let l = 15;
      let w = 5;
      let movementDirection = Math.atan2(this.vel[0], -this.vel[1])

      ctx.save();
      ctx.beginPath();
      ctx.translate(pos[0], pos[1]);
      ctx.rotate(movementDirection + 2 * Math.PI);

      ctx.beginPath();
      ctx.strokeStyle = `${this.color},${this.hue})`;
      ctx.lineWidth = this.rectWidth;

      ctx.moveTo(0, 0); //1
      ctx.lineTo(0,this.rectLength); //2
      // ctx.lineTo(w / 6, l / 2); //3
      // ctx.lineTo(0, l / 4); //4
      // ctx.lineTo(-w / 6, l / 2); //5
      // ctx.lineTo(-w / 2, l / 4); //6

      ctx.closePath();
      ctx.stroke();
      ctx.restore();




      // ctx.save()
      // ctx.translate(this.pos[0], this.pos[1]);
      // ctx.rotate(movementDirection);
      // ctx.beginPath();
      // ctx.strokeStyle = `${this.color},${this.hue})`;
      // ctx.lineWidth = this.rectWidth;
      // ctx.lineTo(this.rectLength, 0);
      // ctx.stroke();
      // ctx.restore();
    }
  }

  remove() {
    this.game.remove(this);
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
module.exports = Particle;