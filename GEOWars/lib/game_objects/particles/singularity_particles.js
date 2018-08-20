const GameObject = require("../../game_engine/game_object")
const Util = require("../../game_engine/util")
const SingularityParticle = require("./Singularity_Particle/singularity_particle")
const Color = require("../../game_engine/color")

class SingularityParticles extends GameObject {
  constructor(engine, transform) {
    super(engine)
    this.transform = transform
    let startingH = Math.random() * 360
    let opacity = Math.random() * 0.35 + 0.6
    this.frequencyParticleCreation = 10;
    this.particleCreationTime = 0;
    this.currentColor = new Color({
      "hsla": [startingH, 100, 50, opacity]
    });

    this.particleNum = 80;
    this.currentParticleCount = 0;
    // let explosionSound = new Sound("GEOWars/sounds/Enemy_explode.wav", 0.2)
    this.createSingularityParticles()
    
  }

  createSingularityParticles() {
    
    for (var i = 0; i < this.particleNum; i++) {
      this.addSingularityParticle()
      this.currentParticleCount++
    }
  }

  addSingularityParticle(){
    const L = 70
    const length = 0
    const baseSpeed = 3

    const distanceVarienceDelta = 15
    const colorVarienceDelta = 10
    const angleVarienceDelta = Math.PI / 4
    const speedVarienceDelta = 2

    let distanceVarience = distanceVarienceDelta * Math.random() - distanceVarienceDelta / 2
    let colorVarience = colorVarienceDelta * Math.random() - colorVarienceDelta / 2
    let angleVarience = angleVarienceDelta * Math.random() - angleVarienceDelta / 2
    let speedVarience = speedVarienceDelta * Math.random() - speedVarienceDelta / 2

    let r = L + distanceVarience
    let theta = Math.random() * 2 * Math.PI
    let alpha = theta + Math.PI / 2 +  angleVarience
    let speed = baseSpeed + speedVarience

    let pos = [r * Math.cos(theta) + this.transform.pos[0], r * Math.sin(theta) + this.transform.pos[1]]
    let vel = [speed * Math.cos(alpha) + this.transform.vel[0], speed * Math.sin(alpha) + this.transform.vel[1]]
    let color = this.currentColor.dup()

    color.a = Math.random() * 0.19 + 0.8
    color.h = (color.h + colorVarience) % 360

    this.addChildGameObject(new SingularityParticle(this.gameEngine, pos, vel, color));
  }

  changeCurrentColor(){
    this.currentColor.h += 1 / 2
    this.currentColor.h = this.currentColor.h % 360
  }

  update(timeDelta) {
    this.particleCreationTime += timeDelta
    if (this.particleCreationTime > this.frequencyParticleCreation){
      this.particleCreationTime = 0
      if (this.currentParticleCount < 60){
        this.addSingularityParticle()
      }
    }
    this.changeCurrentColor()
  }
  // ANIMATION = requestAnimationFrame(drawScene);
}




module.exports = SingularityParticles;