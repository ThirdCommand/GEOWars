import { GEOParticle } from "./particle";
import { GameObject } from "../../game_engine/game_object";
import { Sound } from "../../game_engine/sound";
import { Color } from "../../game_engine/color";
import { type GameEngine } from "../../game_engine/game_engine";
import { type AnimationView } from "../../AnimationView";
import { type GEOWarsScript } from "../../GEOWarsScript";
export class SingularityHitExplosion extends GameObject {
    currentColor: Color;
    particleNum: number;
    constructor(engine: GameEngine | AnimationView, pos: [number, number, number?]) {
        super(engine);
        this.transform.pos[0] = pos[0];
        this.transform.pos[1] = pos[1];
        const startingH = ((this.gameEngine.gameScript as GEOWarsScript).explosionColorWheel + Math.random() * 60 + 180) % 360;
        const opacity = Math.random() * 0.35 + 0.3;
        this.currentColor = new Color(
            "hsla", [startingH, 100, 50, opacity]
        );
        if (engine.graphicQuality === 1) {
            // console.log("best")
            this.particleNum = 50;
        } else if (engine.graphicQuality === 2) {
            // console.log("medium")
            this.particleNum = 30;
        } else {
            // console.log("potato")
            this.particleNum = 15;
        }
        // find singularity hit sound
        const explosionSound = new Sound("sounds/Enemy_explode.wav", 0.2, this.gameEngine.muted);
        this.playSound(explosionSound);
        this.createExplosionParticles();
    }

    createExplosionParticles() {
        for (let i = 0; i < this.particleNum; i++) {
            // adjust speed
            const speed = Math.random() * 3 + 2.5;

            const colorVarienceDelta = 30;
            const colorVarience = colorVarienceDelta * Math.random() - colorVarienceDelta / 2;
            const color = this.currentColor.dup();
            color.a = Math.random() * 0.35 + 0.6;
            color.h = (color.h + colorVarience) % 360;

            this.addChildGameObject(new GEOParticle(this.gameEngine, this.transform.absolutePosition(), speed, color));
        }
    }

    update() {
        if (this.childObjects.length === 0) {
            this.remove();
        }
    }
    animate() {}
}
