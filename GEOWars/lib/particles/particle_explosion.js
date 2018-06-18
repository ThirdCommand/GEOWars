const Particle = require("./particle")



const velocities = [7,6,5,4];

class ParticleExplosion{
  constructor(xpos, ypos, ctx, game, explosionId){
    this.COLORS = [
      ["#98f517", "#7eb92b", "#bdec7a", "#677c4a"],
      ["#fff12c", "#f5ec6d", "#a5a057", "#b1a71c"],
      ["#12e1fc", "#3cc6d8", "#71dfee", "#95dce6"],
      ["#fc57e0", "#cc48b6", "#aa489a", "#fa89e7"],
      ["#be56fa", "#9f60c4", "#571180", "#c796e4"]
    ]
    this.color = this.COLORS[Math.floor(Math.random() * this.COLORS.length)]
    this.game = game;
    this.particleNum = 80;
    this.particles = [];
    this.explosionId;

    for (var i = 0; i < this.particleNum; i++) {
      const particleId = i;
      
      const velocity = velocities[Math.floor(Math.random() * velocities.length)]
      this.particles.push(new Particle(xpos, ypos, velocity, ctx, game, this.explosionId, particleId, this.color));
    }
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