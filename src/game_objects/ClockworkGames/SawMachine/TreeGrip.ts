import { type AnimationView } from "../../../AnimationView";
import { type GameEngine } from "../../../game_engine/game_engine";
import { GameObject } from "../../../game_engine/game_object";
import { LineSprite } from "../../../game_engine/line_sprite";
import { Transform } from "../../../game_engine/transform";

export type TreeGripSpriteParameters = {
    w: 40;
    h: 30;
}

export class TreeGrip extends GameObject {
    lineSprite: TreeGripSprite;
    spriteParameters: TreeGripSpriteParameters;

    constructor(engine: GameEngine | AnimationView, pos: [number, number], angle: number = 0) {
        super(engine);
        this.transform.pos = [pos[0], pos[1]];
        this.transform.angle = angle;
        this.spriteParameters = {
            w: 40,
            h: 30
        }
        this.addLineSprite(new TreeGripSprite(this.transform, this.spriteParameters));
    }
    animate() {

    }
    update() {

    }
}

export class TreeGripSprite extends LineSprite {
    color: string;
    spriteParameters: TreeGripSpriteParameters;
    zoomScale: number;


    constructor(transform: Transform, spriteParameters: TreeGripSpriteParameters) {
        super(transform);
        this.spriteParameters = spriteParameters;
        this.color = "blue";
        this.zoomScale = 0.4;
    }
    draw(ctx: CanvasRenderingContext2D) {
        const pos = this.transform.absolutePosition();
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(this.transform.angle)
        
        this.drawNewFancyCurve(ctx);
        this.drawAxle(ctx);
        this.drawTeeth(ctx);
        
        ctx.restore();
    }
    drawAxle(ctx: CanvasRenderingContext2D) {
        const zoomScale = this.zoomScale
        ctx.save();
        ctx.beginPath();
        ctx.arc(0,0,1/5 * this.spriteParameters.h * zoomScale,0,Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = "#5D3FD3";
        ctx.fill();
        ctx.restore();
    }
    drawNewFancyCurve(ctx: CanvasRenderingContext2D) {
        ctx.save();
        const {h,w} = this.spriteParameters;
        const h_scaled = h * this.zoomScale;
        const w_scaled = w * this.zoomScale;
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#D22B2B";
        ctx.beginPath();
        ctx.moveTo(-w_scaled/2, -2/3 * h_scaled);
        ctx.bezierCurveTo(-w_scaled/2, 2/3 * h_scaled, w_scaled/2, 2/3 * h_scaled, w_scaled/2, -2/3 * h_scaled);
        ctx.closePath();
        ctx.fillStyle = "#D22B2B";
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    drawTeeth(ctx:CanvasRenderingContext2D) {
        const teethCount = 6;
        const zoomScale = this.zoomScale;
        const {h,w} = this.spriteParameters;
        const h_scaled = h * zoomScale;
        const w_scaled = w * zoomScale;
        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#D22B2B";
        ctx.beginPath();
        ctx.moveTo(-w_scaled / 2, 2/3 * -h_scaled);
        for(let i = 1; i <= teethCount * 2; i++) {
            const height = i % 2 === 0 ? -2/3 * h_scaled : -2/3 * h_scaled - h_scaled/6;
            ctx.lineTo(-w_scaled / 2 + i * w_scaled / (teethCount * 2), height);
        }
        ctx.stroke();
        ctx.restore();
    }
}
