// direction of the particle is the direction of the velocity vector
// the direction of the 
// the particle dies when the hue reaches 0 

// random movement angle created
// initial speed (scale)
// vel = Util.vectorCartisian(angle, scale)
//
// 
const SingularityParticleSprite = require("./singulairty_particle_sprite")

const Util = require("../../../game_engine/util")
const GameObject = require("../../../game_engine/game_object")
const Particle = require("../Particle/particle")

class SingularityParticle extends Particle {
  constructor(engine, pos, vel, color) {
    super(engine, pos, 0, color)

    this.transform.vel[0] = vel[0]
    this.transform.vel[1] = vel[1]

    this.color = color;
  }

  update(deltaTime) {
    this.lineSprite.rectLength -= 0.25;
    this.lineSprite.color.a -= 0.01;
    if (this.lineSprite.color.a < 0.06 || this.lineSprite.rectLength < 0.25) {
      this.parentObject.currentParticleCount -= 1;
      this.remove();
    }
    // acc is influenced by singularities, then changed to usual acc
    this.movementAngle = Math.atan2(this.transform.vel[1], this.transform.vel[0])
    this.transform.acc = [0,0]
  }

}

module.exports = SingularityParticle;