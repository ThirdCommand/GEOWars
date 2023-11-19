

import {Particle} from "./Particle/particle";
import {GameObject} from "../../game_engine/game_object";
import {Sound} from "../../game_engine/sound";
import {Color} from "../../game_engine/color";
export class BulletWallExplosion extends GameObject{
    constructor(engine, pos) {
        super(engine);
        this.transform.pos[0] = pos[0];
        this.transform.pos[1] = pos[1];
        const startingH = (this.gameEngine.gameScript.explosionColorWheel + 180 + Math.random() * 60) % 360;
        const opacity = Math.random() * 0.35 + 0.6;
        this.currentColor = new Color({
            "hsla": [startingH, 100, 50, opacity]
        });
        this.particleNum = 20;
        const bulletWallHit = new Sound("GEOWars/sounds/bullet_hitwall.wav", 0.1);
        this.wallHit = this.whichWall();
        this.playSound(bulletWallHit);
        this.createParticles();
    }

    whichWall() {
        const pos = this.transform.pos;

        const max = [this.gameEngine.gameScript.DIM_X, this.gameEngine.gameScript.DIM_Y];
        if (pos[0] <= 0) {
            return "LEFT";
        } else if (pos[0] >= max[0]) {
            return "RIGHT";
        } else if (pos[1] <= 0) {
            return "TOP";
        } else if (pos[1] >= max[1]) {
            return "BOTTOM";
        }

    }

    createParticles(){
        for (var i = 0; i < this.particleNum; i++) {
            const colorVarienceDelta = 30;
            const speed = 1 + Math.random() * 3;
            const colorVarience = colorVarienceDelta * Math.random() - colorVarienceDelta / 2;
            const color = this.currentColor.dup();
            color.a = Math.random() * 0.35 + 0.6;
            color.h = (color.h + colorVarience) % 360;

            const x = this.transform.absolutePosition()[0];
            const y = this.transform.absolutePosition()[1];
            const z = 0;
      
            this.addChildGameObject(new Particle(this.gameEngine, [x,y,z], speed, color, this.wallHit));
        }
    }

    update() {
    
        if (this.childObjects.length === 0) {
            this.remove();
        }
    }
}
