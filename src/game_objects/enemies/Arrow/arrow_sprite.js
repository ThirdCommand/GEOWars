import { LineSprite } from "../../../game_engine/line_sprite";
export class ArrowSprite extends LineSprite {
    constructor(transform, spawningScale = 1) {
        super(transform);
        this.spawningScale = spawningScale;
        this.widthScaleForRotation = 1;
        this.zScaleForRotation = 0;
        this.yRotation = 0;
    }

    draw(ctx) {
        const pos = this.transform.absolutePosition();
        const spawningScale = this.spawningScale || 1;
        const shipLength = 10.5 * 2.2 * spawningScale;
        const shipWidth = 9 * 2.2 * spawningScale;
        const l = shipLength;
        const w = shipWidth * this.widthScaleForRotation;
        const z = shipWidth * this.zScaleForRotation;
        const movementDirection = Math.atan2(
            this.transform.vel[0],
            -this.transform.vel[1]
        );

        const r = 255;
        const g = 255;
        const b = 50;

        ctx.save();
        ctx.beginPath();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(movementDirection + 1 * Math.PI);

        // ctx.strokeStyle = "#f2ff00"; // look up rgb and put here
        // ctx.lineWidth = 2 / 2;

        ctx.shadowColor = "rgb(255,255,255)";
        ctx.shadowBlur = 1.5;
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
        const lineWidth = 2;

        const rightLineWidth =
      lineWidth + 2.5 * Math.sin(this.yRotation + Math.PI / 2);
        const leftLineWidth =
      lineWidth - 2.5 * Math.sin(this.yRotation + Math.PI / 2);
        const topLineWidth = lineWidth + 2.5 * Math.sin(this.yRotation);
        const bottomLineWidth = lineWidth - 2.5 * Math.sin(this.yRotation);

        // this.drawArrow(
        //   ctx,
        //   l,
        //   w,
        //   z,
        //   rightLineWidth,
        //   leftLineWidth,
        //   topLineWidth,
        //   bottomLineWidth
        // );

        this.drawArrow(
            ctx,
            l,
            w,
            z,
            rightLineWidth * 0.75,
            leftLineWidth * 0.75,
            topLineWidth * 0.75,
            bottomLineWidth * 0.75
        );

        this.drawArrow(
            ctx,
            l,
            w,
            z,
            rightLineWidth * 0.6,
            leftLineWidth * 0.6,
            topLineWidth * 0.6,
            bottomLineWidth * 0.6
        );

        this.drawArrow(
            ctx,
            l,
            w,
            z,
            rightLineWidth * 0.45,
            leftLineWidth * 0.45,
            topLineWidth * 0.45,
            bottomLineWidth * 0.45
        );

        this.drawArrow(
            ctx,
            l,
            w,
            z,
            rightLineWidth * 0.3,
            leftLineWidth * 0.3,
            topLineWidth * 0.3,
            bottomLineWidth * 0.3
        );

        ctx.strokeStyle = "rgb(255, 255, 255)";
        // this should be half the other line width for the effect, even after adding sin
        this.drawArrow(
            ctx,
            l,
            w,
            z,
            rightLineWidth * 0.15,
            leftLineWidth * 0.15,
            topLineWidth * 0.15,
            bottomLineWidth * 0.15
        );

        ctx.restore();
    }

    drawArrow(
        ctx,
        l,
        w,
        z,
        rightLineWidth,
        leftLineWidth,
        topLineWidth,
        bottomLineWidth
    ) {
        ctx.lineWidth = rightLineWidth;
        ctx.beginPath();
        ctx.moveTo(0, 0.4762 * l); //1
        ctx.lineTo(0.5 * w, -0.2381 * l); //2
        ctx.lineTo(0.25 * w, -0.5238 * l); //3
        ctx.lineTo(0.1666 * w, -0.2381 * l); //4
        ctx.lineTo(0, -0.2381 * l); //4.5
        ctx.stroke();

        ctx.lineWidth = leftLineWidth;
        ctx.beginPath();
        ctx.lineTo(0, -0.2381 * l); //4.5
        ctx.lineTo(-0.1666 * w, -0.2381 * l); //5
        ctx.lineTo(-0.25 * w, -0.5238 * l); //6
        ctx.lineTo(-0.5 * w, -0.2381 * l); //7
        ctx.lineTo(0, 0.4762 * l); //1
        ctx.stroke();

        ctx.lineWidth = topLineWidth;
        ctx.beginPath();
        ctx.moveTo(-0.1666 * z, -0.0952 * l); //1
        ctx.lineTo(-0.3333 * z, -0.2381 * l); //2
        ctx.lineTo(-0.25 * z, -0.381 * l); //3
        ctx.closePath();
        ctx.stroke();

        ctx.lineWidth = bottomLineWidth;
        ctx.beginPath();
        ctx.moveTo(0.1666 * z, -0.0952 * l); //1
        ctx.lineTo(0.3333 * z, -0.2381 * l); //2
        ctx.lineTo(0.25 * z, -0.381 * l); //3
        ctx.closePath();
        ctx.stroke();

    // ctx.lineWidth = lineWidth / 2;
    // ctx.beginPath();
    // ctx.moveTo(0.2083 * z, -0.2381 * l); //1
    // ctx.lineTo(-0.2083 * z, -0.2381 * l); //2
    // ctx.stroke();
    }
}
/*
// OG
let blurFactor = 0.5
    ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
    ctx.shadowBlur = 10 * blurFactor;
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";

    ctx.lineWidth = 7.5 * blurFactor;
    this.drawArrow(ctx, l, w);

    ctx.lineWidth = 6 * blurFactor;
    this.drawArrow(ctx, l, w);

    ctx.lineWidth = 4.5;
    this.drawArrow(ctx, l, w);

    ctx.lineWidth = 3;
    this.drawArrow(ctx, l, w);

    ctx.strokeStyle = 'rgb(255, 255, 255)';
    
    ctx.lineWidth = 1.5;
    this.drawArrow(ctx, l, w);
*/
