const Util = require("./util");
class Transform {
  constructor(parentTransform = null){
    this.parentTransform = parentTransform
    this.angle = 0
    this.pos = [0,0]
    this.vel = [0,0]
    this.acc = [0,0]
  }

  // call up the tree of parent transforms until null
  // performing the transformation each step for the absolute
  absolutePosition() {
    absPos = []
    if (this.parentTransform == null){
      absPos = this.pos
      return absPos
    } else { 
      return vectorAdd(this.pos, this.parentTransform.absolutePosition())
    }
  }

  absoluteVelocity() {
    absVel = []
    if (this.parentTransform == null) {
      absVel = this.vel
      return absVel
    } else {
      return vectorAdd(this.vel, this.parentTransform.absoluteVelocity())
    }
  }

  absoluteAcceleration() {
    absAcc = []
    if (this.parentTransform == null) {
      absAcc = this.acc
      return absAcc
    } else {
      return vectorAdd(this.acc, this.parentTransform.absoluteAcceleration())
    }
  }

  vectorAdd(vector1, vector2) {
    return [vector1[0] + vector1[0], vector1[1] + vector2[1]]
  }

}