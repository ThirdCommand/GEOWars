import {LineSprite} from "../../../game_engine/line_sprite";
export class GruntSprite extends LineSprite {
    constructor(transform, spawningScale = 1) {
        super(transform)
        this.spawningScale = spawningScale
        this.stretchScale_L = 1
        this.stretchScale_W = 0.7
    }

    draw(ctx) {
        if(!this.visible) return;
        const pos = this.transform.absolutePosition();
    
        const spawningScale = this.spawningScale;
        const shipLength = 10 * 2.2 * spawningScale * this.stretchScale_L;
        const shipWidth = 10 * 2.2 * spawningScale * this.stretchScale_W;
        const l = shipLength;
        const w = shipWidth;

        const r = 0;
        const g = 57;
        const b = 230;

        ctx.save();
        ctx.translate(pos[0], pos[1]);

        const blurFactor = 0.5

        ctx.shadowColor = "rgb(" + r + "," + g + "," + b + ")";
        ctx.shadowBlur = 10
        ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.2)";
        ctx.lineWidth = 7.5 * blurFactor;
        this.drawDiamond(ctx, l, w);
        ctx.lineWidth = 6 // * blurFactor;
        this.drawDiamond(ctx, l, w);
        ctx.lineWidth = 4.5 // * blurFactor;
        this.drawDiamond(ctx, l, w);
        ctx.lineWidth = 3 // * blurFactor;
        this.drawDiamond(ctx, l, w);
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = 1.5 // * blurFactor;
        this.drawDiamond(ctx, l, w);
    
        ctx.restore();
    }

    drawDiamond(ctx, l, w) {
        ctx.beginPath();
        ctx.moveTo(0, -l / 2); //1
        ctx.lineTo(w / 2, 0); //2
        ctx.lineTo(0, l / 2); //3
        ctx.lineTo(-w / 2, -0); //4
        ctx.closePath();
        ctx.stroke();
    }




}
