// direction of the particle is the direction of the velocity vector
// the direction of the 
// the particle dies when the hue reaches 0 

// random movement angle created
// initial speed (scale)
// vel = Util.vectorCartisian(angle, scale)
//
// 

// because the particle is drawn the correct way now, 
// from position out, the particle's center is located 
// far from the center of the particle
const Util = require("../../../game_engine/util")
const GameObject = require("../../../game_engine/game_object")

const GridSprite = require("./particle_sprite")
const GridPoint = require("./grid_point")

class Grid extends GameObject {
    constructor(engine) {
        super(engine)

        this.transform.pos = [0,0]

        this.arenaDimensions = [this.gameEngine.gameScript.DIM_X, this.gameEngine.gameScript.DIM_Y]
        this.elasticity = 0.1; // force provided to pull particle back into place
        this.dampening = 0.1; // force produced from velocity (allows things to eventuall fall to rest)

        this.gridPoints = this.createGridPoints()
        this.addLineSprite(new GridSprite(this.transform, this.gridPoints))
        this.addPhysicsComponent()
        this.addCollider("General", this, this.radius)

    }

    createGridPoints(){

        newGridPoint(this.gameEngine, pos)

    }

    createMovementAngle(wallHit) {
        if (!wallHit) {
            return (Math.random() * Math.PI * 2);
        } else {
            if (wallHit === "BOTTOM") {
                return (Math.random() * Math.PI + Math.PI)
            } else if (wallHit === "RIGHT") {
                return (Math.random() * Math.PI + Math.PI / 2)
            } else if (wallHit === "TOP") {
                return (Math.random() * Math.PI)
            } else if (wallHit === "LEFT") {
                return (Math.random() * Math.PI + 3 * Math.PI / 2)
            }
        }
    }

    update(deltaTime) {
        this.lineSprite.rectLength -= 0.1;
        this.lineSprite.color.a -= 0.01;
        if (this.lineSprite.hue < 0.06 || this.lineSprite.rectLength < 0.25 || ((Math.abs(this.transform.vel[0]) + Math.abs(this.transform.vel[1])) < 0.15)) {

            this.remove();
        }
        if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), -0.5)) {
            this.remove();
        }
        // acc is influenced by singularities, then changed to usual acc
        this.movementAngle = Math.atan2(this.transform.vel[1], this.transform.vel[0])
        this.transform.acc = [-this.explosionDeceleration * Math.cos(this.movementAngle), -this.explosionDeceleration * Math.sin(this.movementAngle)]
    }

}

module.exports = Particle;