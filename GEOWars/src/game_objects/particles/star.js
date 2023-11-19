import { GameObject } from "../../game_engine/game_object";
import { LineSprite } from "../../game_engine/line_sprite";

export class Star extends GameObject {
    constructor(engine, pos = [0,0,0], cameraTransform) {
        super(engine);
        this.transform.pos[0] = pos[0];
        this.transform.pos[1] = pos[1];
        this.transform.pos[2] = pos[2];
        this.transform.cameraTransform = cameraTransform;
        this.addLineSprite(new StarSprite(this.transform));
    }
}

export class StarSprite extends LineSprite {
    constructor(transform) {
        super(transform);
        this.radius = Math.random() * 2 + 0.25; // 1 - 3
    }
    draw(ctx) {
        const pos = this.transform.absolutePosition();
        const radius = this.transform.absoluteLength(this.radius);
        const r = 255;
        const g = 255;
        const b = 255;
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.strokeStyle = "rgb(255, 255, 255)";
        ctx.fillStyle = "rgb(255, 255, 255)";
        this.drawStar(ctx, radius, pos);
        ctx.restore();
    }
    drawStar(ctx, radius, pos) {
        const r = radius;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(pos[0], pos[1], r, 0, 2 * Math.PI, true);
        ctx.fill();
    }
}