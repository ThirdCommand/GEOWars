import { LineSprite } from "../../../game_engine/line_sprite";

export class BoxBoxSprite extends LineSprite {
    constructor(transform, rotationState) {
        super(transform);
        this.spawningScale = 1;
        this.rotationState = rotationState;
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
        ctx.translate(pos[0] - this.rotationState.coordinateShift[0], pos[1] - this.rotationState.coordinateShift[1]);
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

    drawBox1(ctx) {
        // need to rethink spawn scaling. 
        // I might have to bring back the original draw methods for spawn animation
        
        const projectedCoordinates = this.rotationState.projectedDrawCoordinates;
        
        const point1 = projectedCoordinates.BottomSquareBL;
        const point2 = projectedCoordinates.BottomSquareBR;
        const point3 = projectedCoordinates.BottomSquareTR;
        const point4 = projectedCoordinates.BottomSquareTL;

        ctx.beginPath();
        ctx.moveTo(point1[0], point1[1]);
        ctx.lineTo(point2[0], point2[1]);
        ctx.lineTo(point3[0], point3[1]);
        ctx.lineTo(point4[0], point4[1]);
        ctx.closePath();
        ctx.stroke();

        const _point1 = projectedCoordinates._BottomSquareBL;
        const _point2 = projectedCoordinates._BottomSquareBR;
        const _point3 = projectedCoordinates._BottomSquareTR;
        const _point4 = projectedCoordinates._BottomSquareTL;

        ctx.beginPath();
        ctx.moveTo(_point1[0], _point1[1]);
        ctx.lineTo(_point2[0], _point2[1]);
        ctx.lineTo(_point3[0], _point3[1]);
        ctx.lineTo(_point4[0], _point4[1]);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(point1[0], point1[1]);
        ctx.lineTo(_point1[0], _point1[1]);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(point2[0], point2[1]);
        ctx.lineTo(_point2[0], _point2[1]);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(point3[0], point3[1]);
        ctx.lineTo(_point3[0], _point3[1]);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(point4[0], point4[1]);
        ctx.lineTo(_point4[0], _point4[1]);
        ctx.stroke();

            
    }

    drawBox2(ctx) {
        
        const projectedCoordinates = this.rotationState.projectedDrawCoordinates;
        const point1 = projectedCoordinates.TopSquareBL;
        const point2 = projectedCoordinates.TopSquareBR;
        const point3 = projectedCoordinates.TopSquareTR;
        const point4 = projectedCoordinates.TopSquareTL;

        ctx.beginPath();
        ctx.moveTo(point1[0], point1[1]);
        ctx.lineTo(point2[0], point2[1]);
        ctx.lineTo(point3[0], point3[1]);
        ctx.lineTo(point4[0], point4[1]);
        ctx.closePath();
        ctx.stroke();

        const _point1 = projectedCoordinates._TopSquareBL;
        const _point2 = projectedCoordinates._TopSquareBR;
        const _point3 = projectedCoordinates._TopSquareTR;
        const _point4 = projectedCoordinates._TopSquareTL;

        ctx.beginPath();
        ctx.moveTo(_point1[0], _point1[1]);
        ctx.lineTo(_point2[0], _point2[1]);
        ctx.lineTo(_point3[0], _point3[1]);
        ctx.lineTo(_point4[0], _point4[1]);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(point1[0], point1[1]);
        ctx.lineTo(_point1[0], _point1[1]);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(point2[0], point2[1]);
        ctx.lineTo(_point2[0], _point2[1]);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(point3[0], point3[1]);
        ctx.lineTo(_point3[0], _point3[1]);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(point4[0], point4[1]);
        ctx.lineTo(_point4[0], _point4[1]);
        ctx.stroke();
    }

    // drawBox2(ctx, boxSize) {
    //     const w = boxSize;
    //     const slideFactor = 1.5;
    //     ctx.beginPath();
    //     ctx.moveTo(-w / 4, w / 4);
    //     ctx.lineTo(-w / 4, (-3 * w) / 4);
    //     ctx.lineTo((3 * w) / 4, (-3 * w) / 4);
    //     ctx.lineTo((3 * w) / 4, w / 4);
    //     ctx.closePath();
    //     ctx.stroke();
    // }
}
