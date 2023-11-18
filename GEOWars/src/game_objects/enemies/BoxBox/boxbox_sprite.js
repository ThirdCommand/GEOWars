import { LineSprite } from "../../../game_engine/line_sprite";

export class BoxBoxSprite extends LineSprite {
    constructor(transform, spawningScale = 1) {
        super(transform);
        this.spawningScale = spawningScale;
    }

    draw(ctx) {
        const spawningScale = this.spawningScale || 1;
        const pos = this.transform.absolutePosition();
        const boxSize = 10 * spawningScale;

        // ctx.strokeStyle = "#F173BA";

        const r = 210;
        const g = 75;
        const b = 75;
        ctx.save();
        ctx.beginPath();
        ctx.translate(pos[0], pos[1]);
        const blurFactor = 0.5;
        ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
        ctx.shadowBlur = 10 * blurFactor;
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
        ctx.lineWidth = 7.5 * blurFactor;
        this.drawBox1(ctx, boxSize);
        this.drawBox2(ctx, boxSize);
        ctx.lineWidth = 6 * blurFactor;
        this.drawBox1(ctx, boxSize);
        this.drawBox2(ctx, boxSize);
        ctx.lineWidth = 4.5;
        this.drawBox1(ctx, boxSize);
        this.drawBox2(ctx, boxSize);
        ctx.lineWidth = 3;
        this.drawBox1(ctx, boxSize);
        this.drawBox2(ctx, boxSize);
        ctx.strokeStyle = "rgb(255, 255, 255)";
        ctx.lineWidth = 1.5;
        this.drawBox1(ctx, boxSize);
        this.drawBox2(ctx, boxSize);
        ctx.restore();
    }

    drawBox1(ctx, boxSize) {
        const w = boxSize;
        const slideFactor = 1.125;
        ctx.beginPath();
        ctx.moveTo(w / 4, -w / 4);
        ctx.lineTo(w / 4, (3 * w) / 4);
        ctx.lineTo((-3 * w) / 4, (3 * w) / 4);
        ctx.lineTo((-3 * w) / 4, -w / 4);
        ctx.closePath();
        ctx.stroke();
    }

    drawBox2(ctx, boxSize) {
        const w = boxSize;
        const slideFactor = 1.5;
        ctx.beginPath();
        ctx.moveTo(-w / 4, w / 4);
        ctx.lineTo(-w / 4, (-3 * w) / 4);
        ctx.lineTo((3 * w) / 4, (-3 * w) / 4);
        ctx.lineTo((3 * w) / 4, w / 4);
        ctx.closePath();
        ctx.stroke();
    }
}
