import { GameObject } from "../../../game_engine/game_object";
import { ParticleExplosion } from "../../particles/StrikeTimeParticleExplosion";
import { GameEngine } from "../../../game_engine/game_engine";
import { LineSprite } from "../../../game_engine/line_sprite";
import { type Transform } from "../../../game_engine/transform";
import { type AnimationView } from "../../../AnimationView";

export class Building1 extends GameObject {
    radius: number;
    lineSprite: Building1Sprite;
    lives: number;

    constructor(engine: GameEngine | AnimationView, pos: [number, number]) {
        super(engine);
        this.transform.pos = pos;
        this.radius = 15;
        this.lives = 1;
        this.exist();

        this.addLineSprite(new Building1Sprite(this.transform));
    }

    exist() {
        this.addCollider("General", this, this.radius);
        // this doesn't actually move... so I don't think I need a physics component...
        // I can just animate it instead... but I'll have to have the animations be reversible
    }

    hit(){
        this.lives -= 1;
        const pos = this.transform.absolutePosition();
        if (this.lives <= 0) {
            new ParticleExplosion(this.gameEngine, pos);
            this.remove();
        } 
        // if not dead, I can have a different type of explosion
    }

    update(deltaTime: number) {
        this.animate(deltaTime);
    }

    animate(timeDelta: number) {
        // I should stick to no animation for now
        // for my own sanity
    }
}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

export class Building1Sprite extends LineSprite {
    constructor(transform: Transform) {
        super(transform);
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        this.drawBuilding1(ctx);
        ctx.restore();
    }

    drawBuilding1(ctx: CanvasRenderingContext2D){
        ctx.strokeStyle = "#9de26fff";
        ctx.lineWidth = 1.5;
        const s = 1;
        const pos = this.transform.absolutePosition();
        ctx.translate(pos[0], pos[1]);
        
        // Piece 1: 
        ctx.beginPath();
        ctx.moveTo(0 * s, -12 * s);
        ctx.lineTo(-6 * s, -8 * s);
        ctx.lineTo(-6 * s, 0 * s);
        ctx.lineTo(6 * s, 0 * s);
        ctx.lineTo(6 * s, -8 * s);
        ctx.lineTo(12 * s, -11 * s);
        ctx.lineTo(12 * s, -3 * s);
        ctx.lineTo(6 * s, 0 * s);
        ctx.stroke();

        // Piece 2: 
        ctx.beginPath();
        ctx.moveTo(6 * s, -8 * s);
        ctx.lineTo(0 * s, -12 * s);
        ctx.lineTo(6 * s, -15 * s);
        ctx.lineTo(12 * s, -11 * s);
        ctx.stroke();

    }

}