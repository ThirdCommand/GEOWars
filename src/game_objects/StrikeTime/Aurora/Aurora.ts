import { GameObject } from "../../../game_engine/game_object";
import { LineSprite, Spawnable } from "../../../game_engine/line_sprite";
import { Transform } from "../../../game_engine/transform";
import { GameEngine } from "../../../game_engine/game_engine";

export class Aurora extends GameObject {
    constructor(
        engine: GameEngine,
        pos: [number, number],
        angle = Math.random() * Math.PI * 2
    ) {
        super(engine);
        this.transform.pos = pos;
        this.transform.angle = angle;
        this.transform.vel = [2.5, 0];
        this.addLineSprite(new AuroraSprite(this.transform));
    }
    animate(delta: number) {
        let movementDirection = 0;
        if(this.transform.vel[0] === 0 && this.transform.vel[1] === 0) {
            movementDirection = this.transform.angle;
        } else {
            movementDirection = Math.atan2(
                this.transform.vel[0],
                -this.transform.vel[1]
            );
        }
        this.transform.angle = movementDirection;
    }
    update(delta: number) {

    }
}

export class AuroraSprite extends LineSprite {
    color: string;
    length: number;

    constructor(transform: Transform) {
        super(transform);
        this.length = 60;
        this.color = "rgb(255, 255, 255)";
    }

    draw(ctx: CanvasRenderingContext2D) {
        if(!this.visible) return;
        const pos = this.transform.absolutePosition();

        const r = 255;
        const g = 255;
        const b = 50;

        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.transform.angle + 1 * Math.PI);
        this.drawAurora(ctx);
        ctx.restore();
    }

    drawAurora(ctx: CanvasRenderingContext2D) {
        ctx.moveTo(0,0);
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        const l = this.length;
        const w = this.length/2

        ctx.lineTo(w/2, -l);
        ctx.lineTo(-w/2, -l);
        ctx.lineTo(0, 0);
        ctx.stroke();
    }
}