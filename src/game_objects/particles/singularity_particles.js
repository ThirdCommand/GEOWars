import { GameObject } from "../../game_engine/game_object";
import { Util } from "../../game_engine/util";
import { SingularityParticle } from "./Singularity_Particle/singularity_particle";
import { Color } from "../../game_engine/color";

export class SingularityParticles extends GameObject {
    constructor(engine, transform) {
        super(engine);
        this.transform = transform;
        const startingH = Math.random() * 360;
        const opacity = Math.random() * 0.35 + 0.6;
        this.frequencyParticleCreation = 10;
        this.particleCreationTime = 0;
        this.currentColor = new Color({
            "hsla": [startingH, 100, 50, opacity]
        });

        this.particleNum = 80;
        this.currentParticleCount = 0;
        // let explosionSound = new Sound("GEOWars/sounds/Enemy_explode.wav", 0.2)
        this.createSingularityParticles();
    
    }

    createSingularityParticles() {
    
        for (var i = 0; i < this.particleNum; i++) {
            this.addSingularityParticle();
            this.currentParticleCount++;
        }
    }

    addSingularityParticle(){
        const L = 70;
        const length = 0;
        const baseSpeed = 3;

        const distanceVarienceDelta = 15;
        const colorVarienceDelta = 10;
        const angleVarienceDelta = Math.PI / 4;
        const speedVarienceDelta = 2;

        const distanceVarience = distanceVarienceDelta * Math.random() - distanceVarienceDelta / 2;
        const colorVarience = colorVarienceDelta * Math.random() - colorVarienceDelta / 2;
        const angleVarience = angleVarienceDelta * Math.random() - angleVarienceDelta / 2;
        const speedVarience = speedVarienceDelta * Math.random() - speedVarienceDelta / 2;

        const r = L + distanceVarience;
        const theta = Math.random() * 2 * Math.PI;
        const alpha = theta + Math.PI / 2 +  angleVarience;
        const speed = baseSpeed + speedVarience;

        const pos = [r * Math.cos(theta) + this.transform.pos[0], r * Math.sin(theta) + this.transform.pos[1]];
        const vel = [speed * Math.cos(alpha) + this.transform.vel[0], speed * Math.sin(alpha) + this.transform.vel[1]];
        const color = this.currentColor.dup();

        color.a = Math.random() * 0.19 + 0.8;
        color.h = (color.h + colorVarience) % 360;

        this.addChildGameObject(new SingularityParticle(this.gameEngine, pos, vel, color));
    }

    changeCurrentColor(){
        this.currentColor.h += 1 / 2;
        this.currentColor.h = this.currentColor.h % 360;
    }

    update(timeDelta) {
        this.particleCreationTime += timeDelta;
        if (this.particleCreationTime > this.frequencyParticleCreation){
            this.particleCreationTime = 0;
            if (this.currentParticleCount < 60){
                this.addSingularityParticle();
            }
        }
        this.changeCurrentColor();
    }
}
