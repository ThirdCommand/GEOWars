const LineSprite = require("../../game_engine/line_sprite")
const Color = require("../../game_engine/color")
class OverlaySprite extends LineSprite {
    constructor(transform, DIM_X, DIM_Y) {
        super(transform)
        this.width = DIM_X
        this.height = DIM_Y
        this.shadowColor = new Color({
            "hsla": [202, 100, 70, 1]
        });
        this.color = new Color({
            "hsla": [202, 100, 70, 0.2]
        });
    }

    draw(ctx) {
        let w = this.width
        let h = this.height
        let pos = this.transform.absolutePosition();

        ctx.save();
        ctx.beginPath();
        ctx.translate(pos[0], pos[1]);

        let blurFactor = 0.5
        ctx.shadowColor = this.shadowColor.evaluateColor();
        ctx.shadowBlur = 10;
        ctx.strokeStyle = this.color.evaluateColor();
        ctx.lineWidth = 7.5 * blurFactor * 2;
        this.drawWalls(ctx, w, h)
        ctx.lineWidth = 6 * 2 // * blurFactor;
        this.drawWalls(ctx, w, h)
        ctx.lineWidth = 4.5 * 2 // * blurFactor;
        this.drawWalls(ctx, w, h)
        ctx.lineWidth = 3 * 2 // * blurFactor;
        this.drawWalls(ctx, w, h)
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = 1.5 * 2 // * blurFactor;
        this.drawWalls(ctx, w, h)

        ctx.restore();
    }

    drawWalls(ctx, w, h) {
        let offset = 6
        ctx.beginPath
        ctx.moveTo(-offset, -offset)
        ctx.lineTo(w + offset, -offset);
        ctx.lineTo(w + offset, h + offset); //3
        ctx.lineTo(0 - offset, h + offset);
        ctx.closePath();
        ctx.stroke();
    }
}
module.exports = WallsSprite