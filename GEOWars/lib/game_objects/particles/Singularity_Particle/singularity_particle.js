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


class SingularityParticle extends GameObject {
  constructor(engine, pos, vel, color) {
    super(engine)

    this.transform.pos[0] = pos[0]
    this.transform.pos[1] = pos[1]
    this.transform.vel[0] = vel[0]
    this.transform.vel[1] = vel[1]

    this.color = color;

    this.addLineSprite(new SingularityParticleSprite(this.transform, this.color, this.hue))
    this.addPhysicsComponent()
    this.addCollider("General", this, 3)

  }

  update(deltaTime) {
    this.lineSprite.rectLength -= 0.25;
    this.lineSprite.hue -= 0.1;
    if (this.lineSprite.hue < 0.06 || this.lineSprite.rectLength < 0.25) {
      this.parentObject.currentParticleCount -= 1;
      this.remove();
    }
    // acc is influenced by singularities, then changed to usual acc
    this.movementAngle = Math.atan2(this.transform.vel[1], this.transform.vel[0])
    this.transform.acc = [0,0]
  }

}

module.exports = SingularityParticle;