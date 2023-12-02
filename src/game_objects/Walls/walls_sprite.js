import { LineSprite } from "../../game_engine/line_sprite";
import { Color } from "../../game_engine/color";
export class WallsSprite extends LineSprite {
    constructor(transform, DIM_X, DIM_Y) {
        super(transform);
        this.width = DIM_X;
        this.height = DIM_Y;
        this.shadowColor = new Color({
            "hsla": [202, 100, 70, 1]
        });
        this.color = new Color({
            "hsla": [202, 100, 70, 0.2]
        });
    }

    draw(ctx) {
        const w = this.width;
        const h = this.height;
        const pos = this.transform.absolutePosition();

        ctx.save();
        ctx.beginPath();
        ctx.translate(pos[0], pos[1]);

        const blurFactor = 0.5;
        ctx.shadowColor = this.shadowColor.evaluateColor();
        ctx.shadowBlur = 10;
        ctx.strokeStyle = this.color.evaluateColor();
        ctx.lineWidth = 7.5 * blurFactor * 2;
        this.drawWalls(ctx, w, h);
        ctx.lineWidth = 6 * 2;// * blurFactor;
        this.drawWalls(ctx, w, h);
        ctx.lineWidth = 4.5 * 2; // * blurFactor;
        this.drawWalls(ctx, w, h);
        ctx.lineWidth = 3 * 2;// * blurFactor;
        this.drawWalls(ctx, w, h);
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = 1.5 * 2;// * blurFactor;
        this.drawWalls(ctx, w, h);

        ctx.restore();
    }

    drawWalls(ctx,w,h){
        const offset = 6;
        ctx.beginPath;
        ctx.moveTo(-offset, -offset);
        ctx.lineTo(w + offset, -offset);
        ctx.lineTo(w + offset, h + offset); //3
        ctx.lineTo(0 - offset, h + offset);
        ctx.closePath();
        ctx.stroke();
    }
}