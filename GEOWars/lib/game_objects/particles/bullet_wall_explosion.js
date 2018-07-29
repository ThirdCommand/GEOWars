 const Particle = require("./particle")


const speeds = [1, 2, 3, 4];


class BulletWallExplosion extends GameObject{
  constructor(engine, pos, vel) {
    this.super(engine)
    this.COLORS = [
      ["rgba(152,245,23", "rgba(126,185,43", "rgba(189,236,122", "rgba(103,124,74"],
      ["rgba(255,241,44", "rgba(245,236,109", "rgba(165,160,87", "rgba(177,167,28"],
      ["rgba(18,225,252", "rgba(60,198,216", "rgba(113,223,238", "rgba(149,220,230"],
      ["rgba(252,87,224", "rgba(204,72,182", "rgba(170,72,154", "rgba(250,137,231"],
      ["rgba(190,86,250", "rgba(159,96,196", "rgba(87,17,128", "rgba(199,150,228"]
    ]
    this.color = this.COLORS[Math.floor(Math.random() * this.COLORS.length)]
    this.game = game;
    this.particleNum = 20;
    bulletWallHit = new Sound("GEOWars/sounds/bullet_hitwall.wav", 0.2)
    this.playSound(bulletWallHit)
    this.createParticles()
  }

  createParticles(){
    for (var i = 0; i < this.particleNum; i++) {
      const particleId = i;
      const speed = speeds[Math.floor(Math.random() * speeds.length)]
      this.addChildObject(new Particle(this.engine, this.pos, speed, this.color));
    }
  }

  update() {
    if (this.childObjects.length === 0) {
      this.remove()
    }
  }
}


const Particle = require("./particle")



const speeds = [7, 6, 5.5, 5, 4];

class ParticleExplosion {
  constructor(engine, pos) {
    this.COLORS = [
      ["rgba(152,245,23", "rgba(126,185,43", "rgba(189,236,122", "rgba(103,124,74"],
      ["rgba(255,241,44", "rgba(245,236,109", "rgba(165,160,87", "rgba(177,167,28"],
      ["rgba(18,225,252", "rgba(60,198,216", "rgba(113,223,238", "rgba(149,220,230"],
      ["rgba(252,87,224", "rgba(204,72,182", "rgba(170,72,154", "rgba(250,137,231"],
      ["rgba(190,86,250", "rgba(159,96,196", "rgba(87,17,128", "rgba(199,150,228"]
    ]
    this.color = this.COLORS[Math.floor(Math.random() * this.COLORS.length)]
    this.pos = pos;
    this.game = game;
    this.particleNum = 80;
    this.particles = [];
    createExplosionParticles()
  }