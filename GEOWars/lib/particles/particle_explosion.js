const Particle = require("./particle")

//create the particles
// function Particle(i) {
//   this.hue = rand(50, 0, 1);
//   this.active = false;
//   this.velocities = [7, 6, 5, 4];
// }

const velocities = [7,6,5,4];

class ParticleExplosion{
  constructor(xpos, ypos, ctx, game, explosionId){

    this.game = game;
    this.particleNum = 80;
    this.particles = [];
    this.explosionId;

    for (var i = 0; i < this.particleNum; i++) {
      const particleId = i;
      const velocity = velocities[Math.floor(Math.random() * velocities.length)]
      this.particles.push(new Particle(xpos, ypos, velocity, ctx, game, this.explosionId, particleId));
    }

    // for (var i = 0; i < this.particles.length; i++) {
    //   // if (particles[i].active === true) {
    //   //   particles[i].draw();
    //   // } else {
    //   this.particles[i].build();
    //   // }
    // }
  }

  draw(ctx) {
    
    for (var i = 0; i < this.particles.length; i++) {
      if (this.particles[i].active === true) {
        this.particles[i].draw(ctx);
      }
    }

    // ANIMATION = requestAnimationFrame(drawScene);
  }

}




module.exports = ParticleExplosion;