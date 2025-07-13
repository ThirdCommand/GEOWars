import { type AnimationView } from "../../../AnimationView";
import { Color } from "../../../game_engine/color";
import { GameEngine } from "../../../game_engine/game_engine";
import { GameScript } from "../../../game_script";
import {GEOParticle} from "../particle";
import { SingularityParticles } from "../singularity_particles";

export class SingularityParticle extends GEOParticle {
    parentObject: SingularityParticles;
    constructor(engine: GameEngine | AnimationView, pos: [number, number, number?], vel: [number, number, number?], color: Color) {
        super(engine, pos, 0, color);

        this.transform.vel[0] = vel[0];
        this.transform.vel[1] = vel[1];
        this.transform.vel[2] = 0;

        this.color = color;
        this.addCollider("General", this, this.radius);
        this.checkBounds();
    }

    update() {
    
        this.lineSprite.rectLength -= 0.25;
        this.lineSprite.color.a -= 0.01;
        if (this.lineSprite.color.a < 0.06 || this.lineSprite.rectLength < 0.25) {
            this.parentObject.currentParticleCount -= 1;
            this.remove();
        }
        // acc is influenced by singularities, then changed to usual acc
        this.movementAngle = [Math.atan2(this.transform.vel[1], this.transform.vel[0]), null];
        this.transform.acc = [0,0,0];
        this.checkBounds();
    }

    checkBounds() {
        if (GameScript.isOutOfBounds(this.transform.absolutePosition(), -0.5)) {
            this.remove();
        }
    }

}
