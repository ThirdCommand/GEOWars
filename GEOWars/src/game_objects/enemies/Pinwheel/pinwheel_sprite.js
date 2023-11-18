import { LineSprite } from "../../../game_engine/line_sprite";
export class PinwheelSprite extends LineSprite {
    constructor(transform, spawningScale = 1) {
        super(transform);
        this.spawningScale = spawningScale;
    }

    draw(ctx) {
        const spawningScale = this.spawningScale || 1;
        const pos = this.transform.absolutePosition();
        const angle = this.transform.absoluteAngle();

        const shipWidth = 12 * spawningScale;
        const s = shipWidth / 2;

        const r = 59;
        const g = 10;
        const b = 87;

        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.rotate(angle);

        const blurFactor = 0.5;
        ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
        ctx.shadowBlur = 10 * blurFactor * blurFactor;
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
        ctx.lineWidth = 7.5 * blurFactor * blurFactor;
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
        this.drawPinwheel(ctx, s);
        ctx.lineWidth = 6 * blurFactor;
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.6)";
        this.drawPinwheel(ctx, s);
        ctx.lineWidth = 4.5;
        this.drawPinwheel(ctx, s);
        ctx.lineWidth = 3;
        this.drawPinwheel(ctx, s);
        ctx.strokeStyle = 'rgb(200, 100, 255)';
        ctx.lineWidth = 1.5;
        this.drawPinwheel(ctx, s);

        // ctx.strokeStyle = "#971adf";
        // ctx.lineWidth = 1.8;

        ctx.restore();
    }

    drawPinwheel(ctx, s) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 0); //1
        ctx.lineTo(-s, -s); //2
        ctx.lineTo(0, -s); //3
        ctx.lineTo(0, 0); //1
        ctx.lineTo(s, -s); //4
        ctx.lineTo(s, 0); //5
        ctx.lineTo(0, 0); //1
        ctx.lineTo(s, s); //6
        ctx.lineTo(0, s); //7
        ctx.lineTo(0, 0); //1
        ctx.lineTo(-s, s); //8
        ctx.lineTo(-s, 0); //9
        // ctx.lineTo(); //1

        ctx.closePath();
        ctx.stroke();
    }




}
