// direction of the particle is the direction of the velocity vector
// the direction of the 
// the particle dies when the hue reaches 0 

// random movement angle created
// initial speed (scale)
// vel = Util.vectorCartisian(angle, scale)
//

import {Particle} from "../Particle/particle";

export class SingularityParticle extends Particle {
    constructor(engine, pos, vel, color) {
        super(engine, pos, 0, color);

        this.transform.vel[0] = vel[0];
        this.transform.vel[1] = vel[1];

        this.color = color;
        this.addCollider("General", this, this.radius);
        this.checkBounds();
    }

    update(deltaTime) {
    
        this.lineSprite.rectLength -= 0.25;
        this.lineSprite.color.a -= 0.01;
        if (this.lineSprite.color.a < 0.06 || this.lineSprite.rectLength < 0.25) {
            this.parentObject.currentParticleCount -= 1;
            this.remove();
        }
        // acc is influenced by singularities, then changed to usual acc
        this.movementAngle = Math.atan2(this.transform.vel[1], this.transform.vel[0]);
        this.transform.acc = [0,0];
        this.checkBounds();
    }
    checkBounds() {
        if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), -0.5)) {
            this.remove();
        }
    }

}
