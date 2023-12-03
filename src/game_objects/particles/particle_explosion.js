import {Particle} from "./Particle/particle";
import {GameObject} from "../../game_engine/game_object";
import {Sound} from "../../game_engine/sound";
import {Color} from "../../game_engine/color";

export class ParticleExplosion extends GameObject{
    constructor(engine, pos){
        super(engine);
        this.transform.pos[0] = pos[0];
        this.transform.pos[1] = pos[1];
        this.cameraTransform = engine.gameScript.ship.cameraTransform;
        const startingH = (this.gameEngine.gameScript.explosionColorWheel + Math.random() * 60)% 360;
        const opacity = Math.random() * 0.35 + 0.6;
        this.currentColor = new Color({
            "hsla": [startingH, 100, 50, opacity]
        });
        if (engine.graphicQuality === 1) {
            // console.log("best")
            this.particleNum = 120; // was 80
        } else if (engine.graphicQuality === 2){
            // console.log("medium")
            this.particleNum = 40;
        } else {
            // console.log("potato")
            this.particleNum = 20;
        }

        const explosionSound = new Sound("GEOWars/sounds/Enemy_explode.wav", 0.2);
        this.playSound(explosionSound);
        this.createExplosionParticles();
        engine.gameScript.grid.Explosion(pos);
    }

    createExplosionParticles(){
        for (var i = 0; i < this.particleNum; i++) {
            const speed = Math.random() * 4 + 15;
      
            const colorVarienceDelta = 40;
            const colorVarience = colorVarienceDelta * Math.random() - colorVarienceDelta / 2;
            const color = this.currentColor.dup();
            color.a = Math.random() * 0.15 + 0.80;
            color.h = (color.h + colorVarience) % 360;

            const x = this.transform.absolutePosition()[0];
            const y = this.transform.absolutePosition()[1];
            const z = 0;
            this.addChildGameObject(new Particle(this.gameEngine, [x,y,z], speed, color));
        }
    }

    update(){
        if (this.childObjects.length === 0){
            this.remove();
        }
    }
    // ANIMATION = requestAnimationFrame(drawScene);
}
