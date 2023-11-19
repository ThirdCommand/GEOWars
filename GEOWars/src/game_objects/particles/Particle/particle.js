// direction of the particle is the direction of the velocity vector
// the direction of the 
// the particle dies when the hue reaches 0 

// random movement angle created
// initial speed (scale)
// vel = Util.vectorCartesian(angle, scale)
//
// 

// because the particle is drawn the correct way now, 
// from position out, the particle's center is located 
// far from the center of the particle

import {ParticleSprite} from "./particle_sprite";
import { Util } from "../../../game_engine/util";
import { GameObject } from "../../../game_engine/game_object";



export class Particle extends GameObject{
    constructor(engine, pos, initialSpeed, color, wallHit) {
        super(engine);
        this.transform.pos[0] = pos[0];
        this.transform.pos[1] = pos[1];
        this.transform.pos[2] = pos[2];
        this.color = color;
        this.movementAngle = this.createMovementAngle(wallHit); // [plane, out of plane]
        this.transform.vel = Util.vector3Cartesian(this.movementAngle, initialSpeed);
        this.radius = 3;
        this.explosionDeceleration = 0.1; // in the direction the particle is moving
        this.transform.acc = Util.vector3Cartesian(this.movementAngle, -this.explosionDeceleration);
        this.addLineSprite(new ParticleSprite(this.transform, this.color));
        this.addPhysicsComponent();
        // this.addCollider("General", this, this.radius)
    }

    createMovementAngle(wallHit) {
        if (!wallHit){ 
            return [(Math.random() * Math.PI * 2), Math.random() * Math.PI * 2];
        } else {
            if (wallHit === "BOTTOM") {
                // need to give second angle still
                return [Math.random() * Math.PI + Math.PI, 0];
            } else if (wallHit === "RIGHT") {
                return [Math.random() * Math.PI + Math.PI / 2, 0];
            } else if (wallHit === "TOP") {
                return [Math.random() * Math.PI, 0];
            } else if (wallHit === "LEFT") {
                return [Math.random() * Math.PI + 3 * Math.PI / 2, 0];
            }
        }
    }
  

    update(deltaTime){
        this.lineSprite.rectLength -= 0.01 * deltaTime;
        this.lineSprite.color.a -= 0.001 * deltaTime;
        if (this.lineSprite.hue < 0.06 || this.lineSprite.rectLength < 0.25 || ((Math.abs(this.transform.vel[0]) + Math.abs(this.transform.vel[1])) < 0.15)) {
      
            this.remove();
        }
        this.checkBounds();
        // acc is influenced by singularities, then changed to usual acc
        this.movementAngle = Math.atan2(this.transform.vel[1], this.transform.vel[0]);
        this.transform.acc = [-this.explosionDeceleration * Math.cos(this.movementAngle), -this.explosionDeceleration * Math.sin(this.movementAngle)];
    }

    checkBounds() {
        if (this.gameEngine.gameScript.isOutOfBounds(this.transform.absolutePosition(), -0.5)) {
            this.remove();
        }
    }

}