import { Particle } from "./Particle/particle";
import { GameObject } from "../../game_engine/game_object";
import { Sound } from "../../game_engine/sound";
import { Color } from "../../game_engine/color";
export class ShipExplosion extends GameObject {
    constructor(engine, pos) {
        super(engine);
        this.transform.pos[0] = pos[0];
        this.transform.pos[1] = pos[1];
        const startingH = (this.gameEngine.gameScript.explosionColorWheel + Math.random() * 60) % 360;
        const opacity = Math.random() * 0.35 + 0.6;
        this.currentColor = new Color({
            "hsla": [startingH, 100, 50, opacity]
        });
        this.particleNum = 400;
        const explosionSound = new Sound("GEOWars/sounds/Enemy_explode.wav", 0.2);
        this.playSound(explosionSound);
        this.createExplosionParticles();
    }

    createExplosionParticles() {
        for (var i = 0; i < this.particleNum; i++) {
            const speed = Math.random() * 10 + 4;

            const colorVarienceDelta = 30;
            const colorVarience = colorVarienceDelta * Math.random() - colorVarienceDelta / 2;
            const color = this.currentColor.dup();
            // color.a = Math.random() * 0.35 + 0.6
            // color.h = (color.h + colorVarience) % 360

            this.addChildGameObject(new Particle(this.gameEngine, this.transform.absolutePosition(), speed, color));
        }
    }

    update() {
        if (this.childObjects.length === 0) {
            this.remove();
        }
    }
    // ANIMATION = requestAnimationFrame(drawScene);
}
