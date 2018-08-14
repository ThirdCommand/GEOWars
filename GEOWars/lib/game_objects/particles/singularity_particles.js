

const Particle = require("./particle")

const speeds = [21, 19, 17, 15, 13, 11, 9, 7, 6, 5, 4];

class SingularityExplosion {
  constructor(xpos, ypos, ctx, game, explosionId) {
    this.COLORS = [
      ["rgba(152,245,23", "rgba(126,185,43", "rgba(189,236,122", "rgba(103,124,74"],
      ["rgba(255,241,44", "rgba(245,236,109", "rgba(165,160,87", "rgba(177,167,28"],
      ["rgba(18,225,252", "rgba(60,198,216", "rgba(113,223,238", "rgba(149,220,230"],
      ["rgba(252,87,224", "rgba(204,72,182", "rgba(170,72,154", "rgba(250,137,231"],
      ["rgba(190,86,250", "rgba(159,96,196", "rgba(87,17,128", "rgba(199,150,228"]
    ]
    this.color = this.COLORS[Math.floor(Math.random() * this.COLORS.length)]
    this.particleNum = 400;
    this.particles = [];
    this.explosionId;

    for (var i = 0; i < this.particleNum; i++) {
      const particleId = i;
      const speed = Math.random() * (21 - 4) + 4
      // const speed = speeds[Math.floor(Math.random() * speeds.length)]
      this.particles.push(new Particle(xpos, ypos, speed, ctx, game, this.explosionId, particleId, this.color));
    }
  }

  move(deltaTime) {
    for (let i = 0; i < this.particles.length; i++) {
      if (this.particles[i].active === true) {
        this.particles[i].move(deltaTime);
      }
    }
  }
  draw(ctx) {
    for (let i = 0; i < this.particles.length; i++) {
      if (this.particles[i].active === true) {
        this.particles[i].draw(ctx);
      }
    }

    // ANIMATION = requestAnimationFrame(drawScene);
  }

}

module.exports = SingularityExplosion;




// const Util = require("../game_engine/util");

// class Particle {
//   constructor(xpos, ypos, initialSpeed, ctx, game, explosionId, particleID, colors) {
//     this.active = true;

//     this.color = colors[Math.floor(colors.length * Math.random())];
//     this.particleId;
//     this.explosionId;

//     this.transform.pos = [xpos, ypos]; // x and y position

//     this.rectLength = 15;
//     this.rectWidth = 2;
//     // this.r = this.rand(200, 10, 0);
//     this.speed = initialSpeed;
//     this.movementAngle = Math.random() * Math.PI * 2;
//     // this.vx = this.initialSpeed * Math.cos(this.movementAngle);
//     // this.vy = this.initialSpeed * Math.sin(this.movementAngle);
//     this.vel = Util.vectorCartisian(this.movementAngle, this.speed)
//     this.explosionDeceleration = -0.1; // in the direction the particle is moving
//     this.acc = [0, 0]

//     this.opacity = Math.random() * 0.5 + 0.5;
//     this.active = true;
//     this.hue = Math.random() * 0.3 + 0.6;

//     ctx.fillStyle = `${this.color},${this.hue})`;

//     ctx.fillRect(this.pos[0], this.pos[1], this.rectLength, this.rectWidth);
//   }




//   // private method
//   rand(max, min, _int) {
//     var max = (max === 0 || max) ? max : 1,
//       min = min || 0,
//       gen = min + (max - min) * Math.random();

//     return (_int) ? Math.round(gen) : gen;
//   };

//   move(timeDelta) {
//     const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
//     this.updateAcceleration()
//     this.pos[0] += this.vel[0] * velocityScale + (this.acc[0] - this.explosionDeceleration * Math.cos(this.movementAngle)) * (velocityScale * velocityScale) / 2;
//     this.pos[1] += this.vel[1] * velocityScale + (this.acc[1] - this.explosionDeceleration * Math.sin(this.movementAngle)) * (velocityScale * velocityScale) / 2;
//     this.vel[0] += this.acc[0] * velocityScale;
//     this.vel[1] += this.acc[1] * velocityScale;
//     this.movementAngle = Math.atan2(this.vel[1], this.vel[0])
//     this.rectLength -= 0.25;
//     this.hue -= 0.01;
//   }

//   updateAcceleration() {
//     for (let i = 0; i < this.game.singularities.length; i++) {
//       const singularity = this.game.singularities[i];
//       singularity.influenceAcceleration(this)
//     }
//   }

//   draw(ctx) {

//     this.active = true;
//     // this.x += this.vx;
//     // this.y += this.vy;

//     if (this.hue < 0.1 || this.rectLength < 0.25) {
//       this.remove();
//     } else {
//       let pos = this.pos;

//       let l = 15;
//       let w = 5;
//       let movementDirection = Math.atan2(this.vel[0], -this.vel[1])

//       ctx.save();
//       ctx.beginPath();
//       ctx.translate(pos[0], pos[1]);
//       ctx.rotate(movementDirection + 2 * Math.PI);

//       ctx.beginPath();
//       ctx.strokeStyle = `${this.color},${this.hue})`;
//       ctx.lineWidth = this.rectWidth;

//       ctx.moveTo(0, 0); //1
//       ctx.lineTo(0, this.rectLength);
//       ctx.closePath();
//       ctx.stroke();
//       ctx.restore();
//     }
//   }

//   remove() {
//     this.game.remove(this);
//   }
// }

// const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
// module.exports = Particle;